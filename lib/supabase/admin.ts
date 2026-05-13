import { createClient } from "@supabase/supabase-js";

export function createSupabaseServerClient() {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim();
  const publishableKey = (process.env.SUPABASE_PUBLISHABLE_KEY ?? "").trim();

  if (!url || !publishableKey) {
    const missing: string[] = [];
    if (!url) missing.push("NEXT_PUBLIC_SUPABASE_URL");
    if (!publishableKey) missing.push("SUPABASE_PUBLISHABLE_KEY");
    throw new Error(
      `Missing Supabase env: ${missing.join(", ")}. Add them to .env.local and restart the dev server.`,
    );
  }

  return createClient(url, publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
