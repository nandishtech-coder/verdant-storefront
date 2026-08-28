import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getAdminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });

    if (!isAdmin) {
      return { isAdmin: false as const, enquiries: [] };
    }

    const { data, error } = await supabase
      .from("enquiries")
      .select("id, name, email, message, status, created_at")
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw error;

    return { isAdmin: true as const, enquiries: data ?? [] };
  });

/** Bootstrap: the first signed-in account may claim the admin role while no admin exists. */
export const claimAdminRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count, error: countError } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if (countError) throw countError;
    if ((count ?? 0) > 0) return { granted: false as const };

    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (error) throw error;
    return { granted: true as const };
  });

export const setEnquiryStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { id: string; status: string }) => data)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("enquiries")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw error;
    return { ok: true as const };
  });
