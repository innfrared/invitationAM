"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

import { colors } from "@/lib/theme";
import { motion as motionTheme } from "@/lib/theme";

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  margin-bottom: clamp(1rem, 3.5vw, 1.35rem);
`;

const Line = styled(motion.div)`
  flex: 1;
  height: 1px;
  max-width: 120px;
  background: linear-gradient(
    90deg,
    transparent,
    ${colors.goldMuted},
    ${colors.gold},
    ${colors.goldMuted},
    transparent
  );
  transform-origin: center;
  box-shadow: 0 0 8px rgba(214, 177, 94, 0.25);
`;

const Gem = styled.span`
  width: 6px;
  height: 6px;
  background: radial-gradient(
    circle,
    ${colors.goldLight} 0%,
    ${colors.gold} 70%,
    transparent 100%
  );
  border-radius: 1px;
  transform: rotate(45deg);
  opacity: 0.9;
  box-shadow: 0 0 10px rgba(245, 217, 139, 0.35);
`;

type Props = {
  reducedMotion: boolean;
};

export function DecorativeDivider({ reducedMotion }: Props) {
  const d = motionTheme.duration.medium;
  const ease = motionTheme.ease;
  const delay = reducedMotion ? 0.12 : motionTheme.invite.divider;

  return (
    <Wrap aria-hidden="true">
      <Line
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{
          delay,
          duration: reducedMotion ? 0.3 : d,
          ease,
        }}
      />
      <Gem />
      <Line
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{
          delay,
          duration: reducedMotion ? 0.3 : d,
          ease,
        }}
        style={{ transformOrigin: "right" }}
      />
    </Wrap>
  );
}
