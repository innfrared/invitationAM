export type InvitationSectionMeta = {
  id:
    | "hero"
    | "invitation"
    | "birthday-person"
    | "date"
    | "location"
    | "rsvp";
  label: string;
};

export const invitationSections: InvitationSectionMeta[] = [
  { id: "hero", label: "Ողջույն" },
  { id: "invitation", label: "Հրավեր" },
  { id: "birthday-person", label: "Հոբելյար" },
  { id: "date", label: "Ամսաթիվ" },
  { id: "location", label: "Վայր" },
  { id: "rsvp", label: "Պատասխան" },
];
