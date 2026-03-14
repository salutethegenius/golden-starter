"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { OrderStatus } from "@/lib/types";
import { ORDER_STATUS_LABELS } from "@/lib/types";

const statuses: OrderStatus[] = [
  "processing",
  "ready_for_pickup",
  "out_for_delivery",
  "completed",
];

export function UpdateStatusForm({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: OrderStatus;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as OrderStatus;
    if (newStatus === currentStatus) return;

    setLoading(true);
    const supabase = createClient();
    await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);

    try {
      await fetch("/api/notify/order-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
    } catch {
      // notification is best-effort
    }

    setLoading(false);
    router.refresh();
  }

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      disabled={loading || currentStatus === "completed"}
      className="rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-2 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {ORDER_STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  );
}
