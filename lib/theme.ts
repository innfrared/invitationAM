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
  cream: "rgba(245, 240, 230, 0.92)",
} as const;

export const fonts = {
  serif:
    'var(--font-arm-serif), "Noto Serif Armenian", "Times New Roman", serif',
  sans: 'var(--font-arm-sans), "Noto Sans Armenian", system-ui, sans-serif',
} as const;

export const contentMaxWidth = "min(94vw, 880px)";

export const motion = {
  duration: {
    fast: 0.45,
    medium: 0.7,
    slow: 0.95,
  },
  ease: [0.22, 1, 0.36, 1] as const,
  scroll: {
    stagger: 0.14,
    sectionDuration: 0.8,
    viewportAmount: 0.45,
  },
} as const;
