import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(request: Request) {
  try {
    const stripe = getStripe();
    const { invoiceId } = await request.json();
    if (!invoiceId) {
      return NextResponse.json({ error: "Missing invoiceId" }, { status: 400 });
    }

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: customerRecord } = await supabase
      .from("customers")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!customerRecord) {
      return NextResponse.json({ error: "Customer not found" }, { status: 403 });
    }

    const { data: invoice } = await supabase
      .from("invoices")
      .select("*, customer:customers(email, full_name), invoice_items(*)")
      .eq("id", invoiceId)
      .eq("customer_id", customerRecord.id)
      .single();

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    if (invoice.status === "paid") {
      return NextResponse.json({ error: "Invoice already paid" }, { status: 400 });
    }

    const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = (invoice.invoice_items || []).map(
      (item: { description: string; quantity: number; unit_price_cents: number }) => ({
        price_data: {
          currency: invoice.currency.toLowerCase(),
          product_data: { name: item.description },
          unit_amount: item.unit_price_cents,
        },
        quantity: item.quantity,
      })
    );

    if (lineItems.length === 0) {
      lineItems.push({
        price_data: {
          currency: invoice.currency.toLowerCase(),
          product_data: { name: `Invoice ${invoice.invoice_number}` },
          unit_amount: invoice.amount_cents,
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: invoice.customer?.email,
      metadata: {
        invoice_id: invoiceId,
        invoice_number: invoice.invoice_number,
      },
      success_url: `${origin}/portal/invoices/${invoiceId}?paid=true`,
      cancel_url: `${origin}/portal/invoices/${invoiceId}`,
    });

    await supabase
      .from("invoices")
      .update({ stripe_checkout_session_id: session.id })
      .eq("id", invoiceId);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
