"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

import { colors, fonts, motion as motionTheme } from "@/lib/theme";

const Wrap = styled(motion.div)`
  margin-top: clamp(1.5rem, 4vw, 1.85rem);
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: center;
    gap: 0.85rem;
  }
`;

const Primary = styled(motion.button)`
  flex: 1;
  min-height: 48px;
  padding: 0.75rem 1.1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-family: ${fonts.sans};
  font-size: clamp(0.86rem, 2.8vw, 0.92rem);
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
    0 2px 16px rgba(214, 177, 94, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.35);

  &:focus-visible {
    outline: 2px solid ${colors.goldLight};
    outline-offset: 3px;
  }
`;

const Secondary = styled(motion.button)`
  flex: 1;
  min-height: 48px;
  padding: 0.75rem 1.1rem;
  border-radius: 12px;
  cursor: pointer;
  font-family: ${fonts.sans};
  font-size: clamp(0.86rem, 2.8vw, 0.92rem);
  font-weight: 500;
  letter-spacing: 0.02em;
  color: rgba(245, 240, 230, 0.88);
  background: rgba(8, 8, 14, 0.55);
  border: 1px solid rgba(214, 177, 94, 0.45);
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
  const d = motionTheme.invite.rsvp;
  const ease = motionTheme.ease;

  const appear = {
    initial: { opacity: 0, y: reducedMotion ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay: reducedMotion ? 0.25 : d,
      duration: reducedMotion ? 0.3 : motionTheme.duration.medium,
      ease,
    },
  };

  return (
    <Wrap {...appear}>
      <ButtonRow role="group" aria-label="RSVP">
        <Primary
          type="button"
          onClick={onSelectYes}
          whileHover={reducedMotion ? undefined : { scale: 1.02 }}
          whileTap={reducedMotion ? undefined : { scale: 0.98 }}
        >
          Yes, I will attend
        </Primary>
        <Secondary
          type="button"
          onClick={onSelectNo}
          whileHover={reducedMotion ? undefined : { scale: 1.02 }}
          whileTap={reducedMotion ? undefined : { scale: 0.98 }}
        >
          Sorry, I can’t attend
        </Secondary>
      </ButtonRow>
    </Wrap>
  );
}
