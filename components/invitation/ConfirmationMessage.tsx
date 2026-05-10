"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

import { colors, fonts, motion as motionCfg } from "@/lib/theme";

const Wrap = styled(motion.div)`
  margin-top: clamp(0.5rem, 2vw, 1rem);
  text-align: center;
`;

const Message = styled.p`
  margin: 0 0 1rem;
  font-family: ${fonts.serif};
  font-size: clamp(1.05rem, 3.2vw, 1.2rem);
  line-height: 1.65;
  color: rgba(245, 240, 230, 0.9);
`;

const ChangeBtn = styled.button`
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  font-family: ${fonts.sans};
  font-size: clamp(0.8rem, 2.6vw, 0.88rem);
  font-weight: 500;
  letter-spacing: 0.03em;
  color: ${colors.goldMuted};
  text-decoration: underline;
  text-underline-offset: 4px;

  &:hover {
    color: ${colors.gold};
  }

  &:focus-visible {
    outline: 2px solid ${colors.gold};
    outline-offset: 3px;
    border-radius: 2px;
  }
`;

type Rsvp = "yes" | "no";

type Props = {
  reducedMotion: boolean;
  answer: Rsvp;
  onChangeResponse: () => void;
};

const copy: Record<Rsvp, string> = {
  yes: "Շնորհակալություն։ Ուրախ կլինենք Ձեզ տեսնել այս հատուկ երեկոյին։",
  no: "Շնորհակալություն պատասխանի համար։ Դուք մեզ շատ կպակասեք։",
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
      initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
      transition={{
        duration: reducedMotion ? 0.25 : motionCfg.duration.medium,
        ease,
      }}
    >
      <Message>{copy[answer]}</Message>
      <ChangeBtn type="button" onClick={onChangeResponse}>
        Փոխել պատասխանը
      </ChangeBtn>
    </Wrap>
  );
}
