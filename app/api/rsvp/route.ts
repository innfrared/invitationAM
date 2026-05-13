import { NextResponse } from "next/server";

import type { RSVPAnswer, RSVPGroup } from "@/lib/rsvp/types";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

function isGroup(v: unknown): v is RSVPGroup {
  return v === "general" || v === "colleagues";
}

function isResponse(v: unknown): v is RSVPAnswer {
  return v === "yes" || v === "no";
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  const { group, response } = body as Record<string, unknown>;

  if (!isGroup(group) || !isResponse(response)) {
    return NextResponse.json({ ok: false, error: "Invalid fields" }, { status: 400 });
  }

  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase.rpc("increment_rsvp_counter", {
      p_group_key: group,
      p_response: response,
    });

    if (error) {
      console.error("[rsvp] increment_rsvp_counter failed:", error);
      return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
    }

    const row = Array.isArray(data) ? data[0] : null;
    if (
      !row ||
      typeof row !== "object" ||
      !("group_key" in row) ||
      !("yes_count" in row) ||
      !("no_count" in row) ||
      !("updated_at" in row)
    ) {
      console.error("[rsvp] unexpected RPC shape:", data);
      return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
    }

    const counter = row as {
      group_key: RSVPGroup;
      yes_count: number;
      no_count: number;
      updated_at: string;
    };

    return NextResponse.json({
      ok: true,
      counter: {
        group_key: counter.group_key,
        yes_count: counter.yes_count,
        no_count: counter.no_count,
        updated_at: counter.updated_at,
      },
    });
  } catch (e) {
    console.error("[rsvp] POST exception:", e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
