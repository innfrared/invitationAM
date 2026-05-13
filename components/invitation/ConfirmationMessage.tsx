"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

import { SectionSubtitleStatic } from "@/components/invitation/InvitationTypography";
import { colors, fonts, motion as motionCfg } from "@/lib/theme";

const Glow = styled.div`
  margin-top: clamp(0.5rem, 2vw, 1rem);
  padding: clamp(1.25rem, 4vw, 1.75rem) clamp(1rem, 4vw, 1.5rem);
  border-radius: 1.25rem;
  background: radial-gradient(
    ellipse at 50% 40%,
    rgba(214, 177, 94, 0.14) 0%,
    rgba(22, 16, 40, 0.35) 52%,
    transparent 85%
  );
  text-align: center;
`;

const Wrap = styled(motion.div)`
  text-align: center;
`;

const Message = styled(SectionSubtitleStatic)`
  margin: 0 auto 1rem;
`;

const ChangeBtn = styled.button`
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  font-family: ${fonts.sans};
  font-size: clamp(0.85rem, 2.6vw, 0.95rem);
  font-weight: 600;
  letter-spacing: 0.06em;
  color: ${colors.gold};
  text-decoration: underline;
  text-underline-offset: 4px;

  &:hover {
    color: ${colors.goldLight};
  }

  &:focus-visible {
    outline: 2px solid ${colors.gold};
    outline-offset: 3px;
    border-radius: 2px;
  }
`;

type Answer = "yes" | "no";

type Props = {
  reducedMotion: boolean;
  answer: Answer;
  onChangeResponse: () => void;
};

const copy: Record<Answer, string> = {
  yes: "Շնորհակալություն։ Ուրախ կլինենք Ձեզ տեսնել այս հատուկ երեկոյին։",
  no: "Շնորհակալություն պատասխանի համար։",
};

export function ConfirmationMessage({
  reducedMotion,
  answer,
  onChangeResponse,
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
        <ChangeBtn type="button" onClick={onChangeResponse}>
          Փոխել պատասխանը
        </ChangeBtn>
      </Glow>
    </Wrap>
  );
}
