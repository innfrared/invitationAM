export const colors = {
  gold: "#D6B15E",
  goldLight: "#F5D98B",
  goldMuted: "#A9823A",
  ink: "#0a0a10",
  navy: "#0c1220",
  burgundy: "#1a0a12",
  charcoal: "#12141c",
  card: "rgba(10, 10, 16, 0.72)",
  cardBorder: "rgba(214, 177, 94, 0.35)",
} as const;

export const fonts = {
  serif: 'var(--font-serif), "Cormorant Garamond", Georgia, serif',
  sans: 'var(--font-dm-sans), "DM Sans", system-ui, sans-serif',
} as const;

/** Base animation timings (full motion). */
export const motion = {
  duration: {
    fast: 0.5,
    medium: 0.65,
    slow: 0.85,
  },
  ease: [0.22, 1, 0.36, 1] as const,
  /** Stagger delays from page mount (seconds). */
  invite: {
    background: 0,
    divider: 0.35,
    label: 0.5,
    greeting: 0.68,
    bodyLine0: 0.88,
    bodyLine1: 1.04,
    date: 1.32,
    location: 1.52,
    footer: 1.68,
    rsvp: 1.92,
  },
} as const;
