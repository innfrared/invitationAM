"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

import { colors, fonts, motion as motionCfg } from "@/lib/theme";

const Wrap = styled(motion.div)`
  width: 100%;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: center;
    gap: 1.1rem;
  }
`;

const Primary = styled(motion.button)`
  flex: 1;
  min-height: 56px;
  padding: 0.95rem 1.35rem;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  font-family: ${fonts.sans};
  font-size: clamp(0.92rem, 2.9vw, 1.02rem);
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #121016;
  background: linear-gradient(
    165deg,
    ${colors.goldLight} 0%,
    ${colors.gold} 45%,
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
  min-height: 56px;
  padding: 0.95rem 1.35rem;
  border-radius: 14px;
  cursor: pointer;
  font-family: ${fonts.sans};
  font-size: clamp(0.92rem, 2.9vw, 1.02rem);
  font-weight: 500;
  letter-spacing: 0.02em;
  color: rgba(245, 240, 230, 0.9);
  background: rgba(8, 8, 14, 0.6);
  border: 1px solid rgba(214, 177, 94, 0.48);
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
      initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: reducedMotion
          ? motionCfg.duration.fast
          : motionCfg.duration.medium,
        ease,
      }}
    >
      <ButtonRow role="group" aria-label="Հրավերի պատասխան">
        <Primary
          type="button"
          onClick={onSelectYes}
          whileHover={reducedMotion ? undefined : { scale: 1.015 }}
          whileTap={reducedMotion ? undefined : { scale: 0.99 }}
        >
          Այո, ներկա կլինեմ
        </Primary>
        <Secondary
          type="button"
          onClick={onSelectNo}
          whileHover={reducedMotion ? undefined : { scale: 1.015 }}
          whileTap={reducedMotion ? undefined : { scale: 0.99 }}
        >
          Ցավոք, չեմ կարողանա ներկա լինել
        </Secondary>
      </ButtonRow>
    </Wrap>
  );
}
