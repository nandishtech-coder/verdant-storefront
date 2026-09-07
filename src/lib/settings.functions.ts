import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getSiteSettings = createServerFn({ method: "GET" })
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .single();

    if (error || !data) {
      // Default fallback if table missing or row missing
      return { maintenance_mode: false, maintenance_heading: "Website Under Maintenance", maintenance_message: "We are currently updating our website. Please check back later." };
    }

    return data;
  });

export const updateSiteSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { maintenance_mode: boolean; maintenance_heading: string; maintenance_message: string }) => data)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: isSuperAdmin } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "super_admin",
    });

    if (!isSuperAdmin) {
      throw new Error("Unauthorized: Only super_admins can update site settings");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("site_settings")
      .upsert({ id: 1, ...data });

    if (error) throw error;
    return { success: true };
  });
