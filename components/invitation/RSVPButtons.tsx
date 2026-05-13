"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

import { RSVP_LOADING_LABEL } from "@/lib/rsvp/messages";
import { colors, fonts, motion as motionCfg } from "@/lib/theme";

const Wrap = styled(motion.div)`
  width: 100%;
  max-width: min(82vw, 340px);
  margin: 0 auto;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 2.6vw, 20px);
  width: 100%;
  align-items: stretch;

  @media (min-width: 720px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: clamp(14px, 2vw, 18px);
    flex-wrap: nowrap;
  }
`;

const Primary = styled(motion.button)`
  box-sizing: border-box;
  width: 100%;
  flex: 0 0 auto;
  min-height: 60px;
  padding: 18px 28px;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  font-family: ${fonts.sans};
  font-size: clamp(1rem, 3.4vw, 1.25rem);
  font-weight: 700;
  letter-spacing: 0.05em;
  color: ${colors.ink};
  background: linear-gradient(
    165deg,
    #fff1b8 0%,
    ${colors.goldLight} 22%,
    ${colors.gold} 52%,
    ${colors.goldMuted} 100%
  );
  box-shadow:
    0 6px 36px rgba(245, 217, 139, 0.42),
    0 2px 22px rgba(214, 177, 94, 0.32),
    inset 0 1px 0 rgba(255, 255, 255, 0.42);

  &:disabled {
    cursor: not-allowed;
    opacity: 0.72;
  }

  &:focus-visible {
    outline: 2px solid ${colors.goldLight};
    outline-offset: 3px;
  }

  &:hover:not(:disabled) {
    box-shadow:
      0 10px 46px rgba(245, 217, 139, 0.48),
      0 4px 28px rgba(214, 177, 94, 0.38),
      inset 0 1px 0 rgba(255, 255, 255, 0.48);
  }

  @media (min-width: 720px) {
    width: auto;
    min-width: 132px;
    max-width: 158px;
    padding-inline: 22px;
  }
`;

const Secondary = styled(motion.button)`
  box-sizing: border-box;
  width: 100%;
  flex: 0 0 auto;
  min-height: 60px;
  padding: 18px 28px;
  border-radius: 999px;
  cursor: pointer;
  font-family: ${fonts.sans};
  font-size: clamp(1rem, 3.4vw, 1.25rem);
  font-weight: 700;
  letter-spacing: 0.05em;
  color: ${colors.cream};
  background: rgba(6, 10, 18, 0.42);
  border: 2px solid rgba(245, 217, 139, 0.58);
  box-shadow:
    inset 0 0 0 1px rgba(0, 0, 0, 0.42),
    0 0 22px rgba(245, 217, 139, 0.08);

  &:disabled {
    cursor: not-allowed;
    opacity: 0.72;
  }

  &:focus-visible {
    outline: 2px solid ${colors.gold};
    outline-offset: 3px;
  }

  &:hover:not(:disabled) {
    box-shadow:
      0 0 28px rgba(245, 217, 139, 0.22),
      0 0 52px rgba(214, 177, 94, 0.14),
      inset 0 0 0 1px rgba(0, 0, 0, 0.42);
    border-color: rgba(255, 241, 184, 0.72);
  }

  @media (min-width: 720px) {
    width: auto;
    min-width: 132px;
    max-width: 158px;
    padding-inline: 22px;
  }
`;

type Props = {
  reducedMotion: boolean;
  onSelectYes: () => void;
  onSelectNo: () => void;
  isSaving?: boolean;
  savingChoice?: "yes" | "no" | null;
  locked?: boolean;
};

export function RSVPButtons({
  reducedMotion,
  onSelectYes,
  onSelectNo,
  isSaving = false,
  savingChoice = null,
  locked = false,
}: Props) {
  const ease = motionCfg.ease;
  const disabled = locked || isSaving;

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
          aria-busy={isSaving && savingChoice === "yes"}
          disabled={disabled}
          onClick={onSelectYes}
          whileHover={
            reducedMotion || disabled ? undefined : { y: -2, scale: 1.02 }
          }
          whileTap={
            reducedMotion || disabled ? undefined : { y: 0, scale: 0.99 }
          }
        >
          {isSaving && savingChoice === "yes" ? RSVP_LOADING_LABEL : "Այո"}
        </Primary>
        <Secondary
          type="button"
          aria-label="Ոչ, չեմ ներկա լինի"
          aria-busy={isSaving && savingChoice === "no"}
          disabled={disabled}
          onClick={onSelectNo}
          whileHover={
            reducedMotion || disabled ? undefined : { y: -2, scale: 1.02 }
          }
          whileTap={
            reducedMotion || disabled ? undefined : { y: 0, scale: 0.99 }
          }
        >
          {isSaving && savingChoice === "no" ? RSVP_LOADING_LABEL : "Ոչ"}
        </Secondary>
      </ButtonRow>
    </Wrap>
  );
}
