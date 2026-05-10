"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

import { colors } from "@/lib/theme";
import { motion as motionTheme } from "@/lib/theme";

const Root = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  background: ${colors.ink};
`;

const GradientLayer = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
      165deg,
      ${colors.ink} 0%,
      ${colors.navy} 38%,
      ${colors.burgundy} 72%,
      ${colors.charcoal} 100%
    ),
    radial-gradient(
      ellipse 120% 80% at 50% 0%,
      rgba(214, 177, 94, 0.12) 0%,
      transparent 55%
    ),
    radial-gradient(
      circle at 15% 85%,
      rgba(80, 20, 40, 0.45) 0%,
      transparent 45%
    ),
    radial-gradient(
      circle at 90% 30%,
      rgba(20, 35, 70, 0.5) 0%,
      transparent 50%
    );
`;

const Vignette = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 35%,
    rgba(0, 0, 0, 0.55) 100%
  );
`;

type Props = {
  reducedMotion: boolean;
};

export function AnimatedBackground({ reducedMotion }: Props) {
  return (
    <Root
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reducedMotion ? 0.35 : motionTheme.duration.slow,
        ease: motionTheme.ease,
      }}
    >
      <GradientLayer />
      <Vignette />
    </Root>
  );
}
