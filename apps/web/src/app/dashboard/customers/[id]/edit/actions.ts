"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

async function findUserByEmail(email: string) {
  const admin = createAdminClient();

  const { data, error } = await admin.auth.admin.listUsers({ perPage: 1000 });
  if (error || !data?.users) return null;

  return data.users.find(
    (u) => u.email?.toLowerCase() === email.toLowerCase()
  ) ?? null;
}

export async function linkByEmail(
  customerId: string,
  email: string
): Promise<{ success: boolean; error?: string; linkedEmail?: string }> {
  const supabase = await createClient();

  const user = await findUserByEmail(email);
  if (!user) {
    return {
      success: false,
      error: `No portal user found with email "${email}". The user must sign up first.`,
    };
  }

  const { error: updateError } = await supabase
    .from("customers")
    .update({ user_id: user.id })
    .eq("id", customerId);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  return { success: true, linkedEmail: user.email ?? email };
}

export async function linkToUser(
  customerId: string,
  email: string
): Promise<{ success: boolean; error?: string; linkedEmail?: string }> {
  return linkByEmail(customerId, email);
}

export async function unlinkAccount(
  customerId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("customers")
    .update({ user_id: null })
    .eq("id", customerId);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
