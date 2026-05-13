import type { RSVPGroup } from "@/lib/rsvp/types";

export function resolveRSVPGroup(
  rawGroup: string | null | undefined,
): RSVPGroup {
  return rawGroup === "colleagues" ? "colleagues" : "general";
}
