export const colors = {
  stageBlack: "#030305",
  navyDeep: "#080D18",
  burgundyDeep: "#16050B",
  gold: "#D6B15E",
  goldLight: "#F5D98B",
  goldMuted: "#A9823A",
  cream: "#F3E8D0",
  helperMuted: "#CDBF9F",
  mutedText: "#CDBF9F",
  ink: "#030305",
  navy: "#080D18",
  burgundy: "#16050B",
  charcoal: "#080D18",
  card: "rgba(3, 3, 5, 0.72)",
  cardBorder: "rgba(214, 177, 94, 0.35)",
} as const;

export const fonts = {
  serif: 'var(--font-arm-serif), "Noto Serif Armenian", serif',
  sans: 'var(--font-arm-sans), "Noto Sans Armenian", sans-serif',
} as const;

export const contentMaxWidth = "min(82vw, 860px)";

export const mapStageMaxWidth = "min(74vw, 500px)";

export const motion = {
  duration: {
    fast: 0.5,
    medium: 0.82,
    slow: 1.08,
  },
  ease: [0.22, 1, 0.36, 1] as const,
  scroll: {
    stagger: 0.18,
    sectionDuration: 1.02,
    viewportAmount: 0.6,
  },
} as const;
