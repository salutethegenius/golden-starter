import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { InvoiceStatusBadge } from "@/components/ui/badge";
import { formatCents, formatDate } from "@/lib/types";
import type { Invoice, Customer, InvoiceItem } from "@/lib/types";
import Link from "next/link";
import { InvoiceActions } from "./invoice-actions";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: invoice } = await supabase
    .from("invoices")
    .select("*, customer:customers(*), invoice_items(*)")
    .eq("id", id)
    .single();

  if (!invoice) notFound();

  const inv = invoice as Invoice & { customer: Customer; invoice_items: InvoiceItem[] };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <Link href="/dashboard/invoices" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          &larr; Back to Invoices
        </Link>
      </div>

      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold text-zinc-900 dark:text-white">{inv.invoice_number}</h1>
              <InvoiceStatusBadge status={inv.status} />
            </div>
            <p className="text-sm text-zinc-500">
              Created {formatDate(inv.created_at)}
              {inv.due_date && <> &middot; Due {formatDate(inv.due_date)}</>}
            </p>
          </div>
          <InvoiceActions invoiceId={inv.id} status={inv.status} customerEmail={inv.customer?.email} amountCents={inv.amount_cents} />
        </div>

        {/* Customer info */}
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Bill To</p>
          <p className="text-sm font-medium text-zinc-900 dark:text-white">{inv.customer?.full_name}</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{inv.customer?.email}</p>
          {inv.customer?.company_name && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{inv.customer.company_name}</p>
          )}
        </div>

        {/* Line items */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="text-left px-6 py-3 font-medium text-zinc-500">Description</th>
                <th className="text-right px-6 py-3 font-medium text-zinc-500">Qty</th>
                <th className="text-right px-6 py-3 font-medium text-zinc-500">Unit Price</th>
                <th className="text-right px-6 py-3 font-medium text-zinc-500">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {(inv.invoice_items ?? []).map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-3 text-zinc-900 dark:text-white">{item.description}</td>
                  <td className="px-6 py-3 text-right text-zinc-600 dark:text-zinc-400">{item.quantity}</td>
                  <td className="px-6 py-3 text-right text-zinc-600 dark:text-zinc-400">
                    {formatCents(item.unit_price_cents)}
                  </td>
                  <td className="px-6 py-3 text-right font-medium text-zinc-900 dark:text-white">
                    {formatCents(item.quantity * item.unit_price_cents)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-zinc-200 dark:border-zinc-700">
                <td colSpan={3} className="px-6 py-4 text-right text-sm font-semibold text-zinc-900 dark:text-white">
                  Total
                </td>
                <td className="px-6 py-4 text-right text-lg font-bold text-zinc-900 dark:text-white">
                  {formatCents(inv.amount_cents, inv.currency)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {inv.paid_at && (
          <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-green-50 dark:bg-green-900/20">
            <p className="text-sm font-medium text-green-800 dark:text-green-400">
              Paid on {formatDate(inv.paid_at)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
