export type RSVPGroup = "general" | "colleagues";

export type RSVPAnswer = "yes" | "no";

export type StoredGroupRSVP = {
  response: RSVPAnswer;
  submittedAt: string;
};

export type StoredRSVPResponses = {
  general?: StoredGroupRSVP;
  colleagues?: StoredGroupRSVP;
};

export type RSVPRequestBody = {
  group: RSVPGroup;
  response: RSVPAnswer;
  /** When set, moves one vote from previous → response (aggregates stay consistent). */
  previousResponse?: RSVPAnswer;
};

export type RSVPCounterRow = {
  group_key: RSVPGroup;
  yes_count: number;
  no_count: number;
  updated_at: string;
};

export type RSVPPostSuccess = {
  ok: true;
  counter: RSVPCounterRow;
};

export type RSVPPostFailure = {
  ok: false;
  error: string;
};

export type RSVPStatsBody = {
  general: { yes: number; no: number };
  colleagues: { yes: number; no: number };
};
