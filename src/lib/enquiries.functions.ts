import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

type EnquiryInput = {
  name: string;
  phone: string;
  email?: string;
  interested_in: string;
  message: string;
};

export const submitEnquiry = createServerFn({ method: "POST" })
  .validator((data: EnquiryInput) => data)
  .handler(async ({ data }) => {
    // Note: TypeScript might complain if `phone` or `interested_in` aren't in the Database type yet.
    // They will be added via the SQL migration. For now we use "any" to bypass strict checks 
    // if the types haven't been regenerated.
    const { error } = await publicClient()
      .from("enquiries")
      .insert({
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        interested_in: data.interested_in,
        message: data.message,
        status: "new",
      } as any);

    if (error) {
      console.error("Supabase insert error (enquiries):", error.message);
      throw new Error("Failed to submit enquiry");
    }

    return { ok: true as const };
  });
