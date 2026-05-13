"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

import { colors, fonts, motion as motionCfg } from "@/lib/theme";

const Wrap = styled(motion.div)`
  width: 100%;
  max-width: min(94vw, 700px);
  margin: 0 auto;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 720px) {
    flex-direction: row;
    justify-content: center;
    gap: 1.25rem;
    align-items: stretch;
  }
`;

const Primary = styled(motion.button)`
  flex: 1;
  min-height: 54px;
  padding: 16px 24px;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  font-family: ${fonts.sans};
  font-size: clamp(1rem, 3.2vw, 1.12rem);
  font-weight: 600;
  letter-spacing: 0.04em;
  color: ${colors.ink};
  background: linear-gradient(
    165deg,
    ${colors.goldLight} 0%,
    ${colors.gold} 48%,
    ${colors.goldMuted} 100%
  );
  box-shadow:
    0 4px 28px rgba(214, 177, 94, 0.32),
    inset 0 1px 0 rgba(255, 255, 255, 0.35);

  &:focus-visible {
    outline: 2px solid ${colors.goldLight};
    outline-offset: 3px;
  }
`;

const Secondary = styled(motion.button)`
  flex: 1;
  min-height: 54px;
  padding: 16px 24px;
  border-radius: 999px;
  cursor: pointer;
  font-family: ${fonts.sans};
  font-size: clamp(1rem, 3.2vw, 1.12rem);
  font-weight: 600;
  letter-spacing: 0.04em;
  color: ${colors.cream};
  background: rgba(8, 13, 24, 0.55);
  border: 1px solid rgba(214, 177, 94, 0.52);
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.35);

  &:focus-visible {
    outline: 2px solid ${colors.gold};
    outline-offset: 3px;
  }
`;

type Props = {
  reducedMotion: boolean;
  onSelectYes: () => void;
  onSelectNo: () => void;
};

export function RSVPButtons({
  reducedMotion,
  onSelectYes,
  onSelectNo,
}: Props) {
  const ease = motionCfg.ease;

  return (
    <Wrap
      initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reducedMotion ? 0 : -12 }}
      transition={{
        duration: reducedMotion
          ? motionCfg.duration.fast
          : motionCfg.duration.medium,
        ease,
      }}
    >
      <ButtonRow
        role="group"
        aria-label="Ներկայության պատասխան՝ այո կամ ոչ"
      >
        <Primary
          type="button"
          aria-label="Այո, ներկա կլինեմ"
          onClick={onSelectYes}
          whileHover={reducedMotion ? undefined : { scale: 1.02 }}
          whileTap={reducedMotion ? undefined : { scale: 0.99 }}
        >
          Այո
        </Primary>
        <Secondary
          type="button"
          aria-label="Ոչ, չեմ ներկա լինի"
          onClick={onSelectNo}
          whileHover={reducedMotion ? undefined : { scale: 1.02 }}
          whileTap={reducedMotion ? undefined : { scale: 0.99 }}
        >
          Ոչ
        </Secondary>
      </ButtonRow>
    </Wrap>
  );
}
