import { NextResponse } from "next/server";

import type { RSVPStatsBody } from "@/lib/rsvp/types";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("rsvp_counters")
      .select("group_key, yes_count, no_count");

    if (error) {
      console.error("[rsvp/stats] select failed:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    const body: RSVPStatsBody = {
      general: { yes: 0, no: 0 },
      colleagues: { yes: 0, no: 0 },
    };

    for (const row of data ?? []) {
      if (row.group_key === "general") {
        body.general = { yes: row.yes_count, no: row.no_count };
      } else if (row.group_key === "colleagues") {
        body.colleagues = { yes: row.yes_count, no: row.no_count };
      }
    }

    return NextResponse.json(body);
  } catch (e) {
    console.error("[rsvp/stats] GET exception:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
