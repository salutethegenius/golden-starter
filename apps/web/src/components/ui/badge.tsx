import type { InvoiceStatus, OrderStatus } from "@/lib/types";
import { INVOICE_STATUS_LABELS, ORDER_STATUS_LABELS } from "@/lib/types";

const orderStatusColors: Record<OrderStatus, string> = {
  processing: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  ready_for_pickup: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  out_for_delivery: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
};

const invoiceStatusColors: Record<InvoiceStatus, string> = {
  draft: "bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300",
  sent: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  paid: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  overdue: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  cancelled: "bg-zinc-100 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${orderStatusColors[status]}`}>
      {ORDER_STATUS_LABELS[status]}
    </span>
  );
}

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${invoiceStatusColors[status]}`}>
      {INVOICE_STATUS_LABELS[status]}
    </span>
  );
}
