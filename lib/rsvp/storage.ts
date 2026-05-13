import type { RSVPAnswer, RSVPGroup, StoredRSVPResponses } from "@/lib/rsvp/types";

export const RSVP_STORAGE_KEY = "arthur_50_rsvp_response_v1";

export function readStoredRSVPResponses(): StoredRSVPResponses {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(RSVP_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as StoredRSVPResponses;
  } catch {
    return {};
  }
}

export function getStoredResponseForGroup(group: RSVPGroup): RSVPAnswer | null {
  const stored = readStoredRSVPResponses()[group]?.response;
  return stored === "yes" || stored === "no" ? stored : null;
}

export function saveStoredResponseForGroup(
  group: RSVPGroup,
  response: RSVPAnswer,
): void {
  if (typeof window === "undefined") return;
  const prev = readStoredRSVPResponses();
  const next: StoredRSVPResponses = {
    ...prev,
    [group]: { response, submittedAt: new Date().toISOString() },
  };
  window.localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(next));
}
