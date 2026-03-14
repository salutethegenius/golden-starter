import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { formatDate } from "@/lib/types";
import type { Customer } from "@/lib/types";
import Link from "next/link";

export default async function CustomersPage() {
  const supabase = await createClient();
  const { data: customers } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });

  const list = (customers ?? []) as Customer[];

  return (
    <div>
      <PageHeader
        title="Customers"
        description="Manage your customer accounts."
        actionLabel="Add Customer"
        actionHref="/dashboard/customers/new"
      />

      {list.length === 0 ? (
        <EmptyState
          title="No customers yet"
          description="Create your first customer to start sending invoices."
          actionLabel="Add Customer"
          actionHref="/dashboard/customers/new"
        />
      ) : (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                  <th className="text-left px-6 py-3 font-medium text-zinc-500 dark:text-zinc-400">Name</th>
                  <th className="text-left px-6 py-3 font-medium text-zinc-500 dark:text-zinc-400">Email</th>
                  <th className="text-left px-6 py-3 font-medium text-zinc-500 dark:text-zinc-400 hidden sm:table-cell">Account</th>
                  <th className="text-left px-6 py-3 font-medium text-zinc-500 dark:text-zinc-400 hidden md:table-cell">Company</th>
                  <th className="text-left px-6 py-3 font-medium text-zinc-500 dark:text-zinc-400 hidden md:table-cell">Phone</th>
                  <th className="text-left px-6 py-3 font-medium text-zinc-500 dark:text-zinc-400 hidden lg:table-cell">Created</th>
                  <th className="px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {list.map((customer) => (
                  <tr key={customer.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">
                      {customer.full_name}
                    </td>
                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{customer.email}</td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      {customer.user_id ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                          Linked
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">Not linked</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400 hidden md:table-cell">
                      {customer.company_name || "—"}
                    </td>
                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400 hidden md:table-cell">
                      {customer.phone || "—"}
                    </td>
                    <td className="px-6 py-4 text-zinc-500 hidden lg:table-cell">
                      {formatDate(customer.created_at)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/dashboard/customers/${customer.id}/edit`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        Edit
                      </Link>
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
