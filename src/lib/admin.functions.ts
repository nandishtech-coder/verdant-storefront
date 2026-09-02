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

    const [
      { data: enquiriesData, error: enquiriesError },
      { count: servicesCount },
      { count: categoriesCount },
      { count: productsCount },
      { count: reelsCount },
      { count: blogsCount },
      { count: totalEnquiriesCount },
      { count: resolvedEnquiriesCount },
    ] = await Promise.all([
      supabase.from("enquiries").select("id, name, email, phone, interested_in, message, status, created_at").order("created_at", { ascending: false }).limit(50),
      supabase.from("services").select("*", { count: "exact", head: true }),
      supabase.from("categories").select("*", { count: "exact", head: true }),
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("reels").select("*", { count: "exact", head: true }),
      supabase.from("blogs").select("*", { count: "exact", head: true }),
      supabase.from("enquiries").select("*", { count: "exact", head: true }),
      supabase.from("enquiries").select("*", { count: "exact", head: true }).eq("status", "resolved"),
    ]);

    if (enquiriesError) throw enquiriesError;

    return { 
      isAdmin: true as const, 
      enquiries: enquiriesData ?? [],
      analytics: {
        services: servicesCount ?? 0,
        categories: categoriesCount ?? 0,
        products: productsCount ?? 0,
        reels: reelsCount ?? 0,
        blogs: blogsCount ?? 0,
        enquiriesTotal: totalEnquiriesCount ?? 0,
        enquiriesResolved: resolvedEnquiriesCount ?? 0
      }
    };
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
