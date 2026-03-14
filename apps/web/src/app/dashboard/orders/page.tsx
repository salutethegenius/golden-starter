import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { OrderStatusBadge } from "@/components/ui/badge";
import { formatDate } from "@/lib/types";
import type { Order, Customer } from "@/lib/types";
import { UpdateStatusForm } from "./update-status-form";

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("*, customer:customers(*)")
    .order("created_at", { ascending: false });

  const list = (orders ?? []) as (Order & { customer: Customer })[];

  return (
    <div>
      <PageHeader
        title="Orders"
        description="Track and manage delivery orders."
        actionLabel="New Order"
        actionHref="/dashboard/orders/new"
      />

      {list.length === 0 ? (
        <EmptyState
          title="No orders yet"
          description="Create an order to start tracking deliveries."
          actionLabel="New Order"
          actionHref="/dashboard/orders/new"
        />
      ) : (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                  <th className="text-left px-6 py-3 font-medium text-zinc-500 dark:text-zinc-400">Customer</th>
                  <th className="text-left px-6 py-3 font-medium text-zinc-500 dark:text-zinc-400 hidden md:table-cell">Description</th>
                  <th className="text-left px-6 py-3 font-medium text-zinc-500 dark:text-zinc-400">Status</th>
                  <th className="text-left px-6 py-3 font-medium text-zinc-500 dark:text-zinc-400 hidden lg:table-cell">Created</th>
                  <th className="px-6 py-3 text-left font-medium text-zinc-500 dark:text-zinc-400">Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {list.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">
                      {order.customer?.full_name}
                    </td>
                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400 hidden md:table-cell max-w-xs truncate">
                      {order.description || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 text-zinc-500 hidden lg:table-cell">
                      {formatDate(order.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <UpdateStatusForm orderId={order.id} currentStatus={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
