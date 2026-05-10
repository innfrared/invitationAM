"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

import { colors, fonts, motion as motionTheme } from "@/lib/theme";

const Wrap = styled(motion.div)`
  margin-top: clamp(1.5rem, 4vw, 1.85rem);
  text-align: center;
`;

const Message = styled(motion.p)`
  margin: 0 0 1rem;
  font-family: ${fonts.serif};
  font-size: clamp(1rem, 3.1vw, 1.12rem);
  line-height: 1.55;
  color: rgba(245, 240, 230, 0.9);
`;

const ChangeBtn = styled.button`
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  font-family: ${fonts.sans};
  font-size: clamp(0.75rem, 2.5vw, 0.8rem);
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
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
  yes: "Thank you! We’ll be happy to celebrate this special evening with you.",
  no: "Thank you for letting us know. You’ll be missed.",
};

export function ConfirmationMessage({
  reducedMotion,
  answer,
  onChangeResponse,
}: Props) {
  const ease = motionTheme.ease;

  return (
    <Wrap
      key={answer}
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
      transition={{
        duration: reducedMotion ? 0.25 : motionTheme.duration.medium,
        ease,
      }}
    >
      <Message>{copy[answer]}</Message>
      <ChangeBtn type="button" onClick={onChangeResponse}>
        Change response
      </ChangeBtn>
    </Wrap>
  );
}
