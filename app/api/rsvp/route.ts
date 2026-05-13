import { NextResponse } from "next/server";

import type { RSVPAnswer, RSVPGroup } from "@/lib/rsvp/types";
import { createSupabaseServerClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

function isGroup(v: unknown): v is RSVPGroup {
  return v === "general" || v === "colleagues";
}

function isResponse(v: unknown): v is RSVPAnswer {
  return v === "yes" || v === "no";
}

function parseCounterFromRpc(data: unknown): {
  group_key: RSVPGroup;
  yes_count: number;
  no_count: number;
  updated_at: string;
} | null {
  const row = Array.isArray(data) ? data[0] : null;
  if (
    !row ||
    typeof row !== "object" ||
    !("group_key" in row) ||
    !("yes_count" in row) ||
    !("no_count" in row) ||
    !("updated_at" in row)
  ) {
    return null;
  }
  return row as {
    group_key: RSVPGroup;
    yes_count: number;
    no_count: number;
    updated_at: string;
  };
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

  const record = body as Record<string, unknown>;
  const { group, response } = record;

  if (!isGroup(group) || !isResponse(response)) {
    return NextResponse.json({ ok: false, error: "Invalid fields" }, { status: 400 });
  }

  const rawPrev = record.previousResponse;
  let previousResponse: RSVPAnswer | undefined;
  if (rawPrev !== undefined) {
    if (!isResponse(rawPrev)) {
      return NextResponse.json({ ok: false, error: "Invalid fields" }, { status: 400 });
    }
    previousResponse = rawPrev;
  }

  try {
    const supabase = createSupabaseServerClient();

    if (previousResponse !== undefined && previousResponse === response) {
      const { data: fetched, error: fetchErr } = await supabase
        .from("rsvp_counters")
        .select("group_key, yes_count, no_count, updated_at")
        .eq("group_key", group)
        .maybeSingle();

      if (
        fetchErr ||
        !fetched ||
        typeof fetched.yes_count !== "number" ||
        typeof fetched.no_count !== "number"
      ) {
        console.error("[rsvp] idempotent fetch failed:", fetchErr);
        return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
      }

      return NextResponse.json({
        ok: true,
        counter: {
          group_key: group,
          yes_count: fetched.yes_count,
          no_count: fetched.no_count,
          updated_at:
            typeof fetched.updated_at === "string"
              ? fetched.updated_at
              : String(fetched.updated_at),
        },
      });
    }

    let data: unknown;
    let error: { message?: string } | null;

    if (previousResponse !== undefined && previousResponse !== response) {
      const out = await supabase.rpc("change_rsvp_counter", {
        p_group_key: group,
        p_from: previousResponse,
        p_to: response,
      });
      data = out.data;
      error = out.error;
      if (error) {
        console.error("[rsvp] change_rsvp_counter failed:", error);
        return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
      }
    } else {
      const out = await supabase.rpc("increment_rsvp_counter", {
        p_group_key: group,
        p_response: response,
      });
      data = out.data;
      error = out.error;
      if (error) {
        console.error("[rsvp] increment_rsvp_counter failed:", error);
        return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
      }
    }

    const counter = parseCounterFromRpc(data);
    if (!counter) {
      console.error(
        "[rsvp] RPC returned no row. Re-run supabase-rsvp.sql. Data:",
        data,
      );
      return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
    }

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
