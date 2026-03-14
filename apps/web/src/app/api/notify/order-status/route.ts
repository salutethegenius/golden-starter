import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { sendOrderStatusUpdate } from "@/lib/email/send";
import type { OrderStatus } from "@/lib/types";

const VALID_STATUSES: OrderStatus[] = [
  "processing",
  "ready_for_pickup",
  "out_for_delivery",
  "completed",
];

export async function POST(request: Request) {
  try {
    const { orderId, status } = (await request.json()) as {
      orderId: string;
      status: OrderStatus;
    };
    if (!orderId || !status) {
      return NextResponse.json({ error: "Missing orderId or status" }, { status: 400 });
    }

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { data: order } = await supabase
      .from("orders")
      .select("*, customer:customers(email, full_name)")
      .eq("id", orderId)
      .single();

    if (!order || !order.customer?.email) {
      return NextResponse.json({ error: "Order or customer not found" }, { status: 404 });
    }

    await sendOrderStatusUpdate({
      to: order.customer.email,
      customerName: order.customer.full_name,
      orderDescription: order.description || "Delivery Order",
      status,
    });

    return NextResponse.json({ sent: true });
  } catch (error) {
    console.error("Failed to send order status email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
