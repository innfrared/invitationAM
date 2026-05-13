"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

import { SectionSubtitleStatic } from "@/components/invitation/InvitationTypography";
import {
  RSVP_CHANGE_RESPONSE,
  RSVP_PERSISTED_HINT,
} from "@/lib/rsvp/messages";
import { colors, fonts, motion as motionCfg } from "@/lib/theme";

const Glow = styled.div`
  box-sizing: border-box;
  margin-top: clamp(0.5rem, 2vw, 1rem);
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: min(76vw, 520px);
  padding: clamp(1.2rem, 3.8vw, 1.65rem) clamp(1.1rem, 3.8vw, 1.45rem);
  border-radius: 1.15rem;
  background:
    linear-gradient(
      168deg,
      rgba(6, 5, 10, 0.97) 0%,
      rgba(14, 8, 16, 0.94) 38%,
      rgba(10, 14, 24, 0.96) 100%
    ),
    radial-gradient(
      ellipse 85% 80% at 50% 0%,
      rgba(245, 217, 139, 0.07) 0%,
      transparent 62%
    );
  border: 1px solid rgba(245, 217, 139, 0.42);
  box-shadow:
    inset 0 1px 0 rgba(255, 241, 184, 0.06),
    0 0 28px rgba(245, 217, 139, 0.14),
    0 12px 40px rgba(0, 0, 0, 0.55);
  text-align: center;
`;

const Wrap = styled(motion.div)`
  text-align: center;
  width: 100%;
`;

const Message = styled(SectionSubtitleStatic)`
  margin: 0 auto;
`;

const PersistedHint = styled.p`
  margin: clamp(0.85rem, 2.5vw, 1.1rem) auto 0;
  font-family: ${fonts.sans};
  font-size: clamp(0.88rem, 2.8vw, 1rem);
  font-weight: 500;
  line-height: 1.45;
  color: ${colors.helperMuted};
  opacity: 0.88;
`;

const ChangeMindBtn = styled.button`
  margin-top: clamp(1.05rem, 3vw, 1.35rem);
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: ${fonts.sans};
  font-size: clamp(0.92rem, 3vw, 1.05rem);
  font-weight: 600;
  letter-spacing: 0.04em;
  color: ${colors.goldLight};
  text-decoration: underline;
  text-underline-offset: 5px;
  text-shadow: 0 0 14px rgba(245, 217, 139, 0.35);

  &:hover {
    color: #fff1b8;
  }

  &:focus-visible {
    outline: 2px solid ${colors.gold};
    outline-offset: 4px;
    border-radius: 4px;
  }
`;

type Answer = "yes" | "no";

type Props = {
  reducedMotion: boolean;
  answer: Answer;
  showPersistedHint?: boolean;
  onChangeMind?: () => void;
};

const copy: Record<Answer, string> = {
  yes: "Շնորհակալություն։ Ուրախ կլինենք Ձեզ տեսնել այս հատուկ երեկոյին։",
  no: "Շնորհակալություն պատասխանի համար:",
};

export function ConfirmationMessage({
  reducedMotion,
  answer,
  showPersistedHint = false,
  onChangeMind,
}: Props) {
  const ease = motionCfg.ease;

  return (
    <Wrap
      key={answer}
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
      transition={{
        duration: reducedMotion ? 0.28 : motionCfg.duration.medium,
        ease,
      }}
    >
      <Glow>
        <Message>{copy[answer]}</Message>
        {showPersistedHint ? (
          <PersistedHint>{RSVP_PERSISTED_HINT}</PersistedHint>
        ) : null}
        {onChangeMind ? (
          <ChangeMindBtn type="button" onClick={onChangeMind}>
            {RSVP_CHANGE_RESPONSE}
          </ChangeMindBtn>
        ) : null}
      </Glow>
    </Wrap>
  );
}
