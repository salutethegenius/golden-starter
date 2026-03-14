import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendPaymentConfirmation, sendPaymentReceived } from "@/lib/email/send";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(request: Request) {
  const stripe = getStripe();
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const invoiceId = session.metadata?.invoice_id;

    if (!invoiceId) {
      return NextResponse.json({ received: true });
    }

    const supabase = createAdminClient();

    const { data: invoice } = await supabase
      .from("invoices")
      .select("*, customer:customers(email, full_name)")
      .eq("id", invoiceId)
      .single();

    if (!invoice || invoice.status === "paid") {
      return NextResponse.json({ received: true });
    }

    await supabase
      .from("invoices")
      .update({
        status: "paid",
        paid_at: new Date().toISOString(),
      })
      .eq("id", invoiceId);

    await supabase.from("invoice_payments").insert({
      invoice_id: invoiceId,
      amount_cents: session.amount_total ?? invoice.amount_cents,
      stripe_payment_intent_id: session.payment_intent as string,
      status: "completed",
      paid_at: new Date().toISOString(),
    });

    try {
      if (invoice.customer?.email) {
        await sendPaymentConfirmation({
          to: invoice.customer.email,
          customerName: invoice.customer.full_name,
          invoiceNumber: invoice.invoice_number,
          amount: invoice.amount_cents,
          currency: invoice.currency,
        });
      }
      await sendPaymentReceived({
        invoiceNumber: invoice.invoice_number,
        customerName: invoice.customer?.full_name ?? "Unknown",
        amount: invoice.amount_cents,
        currency: invoice.currency,
      });
    } catch (emailErr) {
      console.error("Failed to send payment emails:", emailErr);
    }
  }

  return NextResponse.json({ received: true });
}
