"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

import { SectionSubtitleStatic } from "@/components/invitation/InvitationTypography";
import { RSVP_PERSISTED_HINT } from "@/lib/rsvp/messages";
import { colors, contentMaxWidth, fonts, motion as motionCfg } from "@/lib/theme";

const Glow = styled.div`
  margin-top: clamp(0.5rem, 2vw, 1rem);
  padding: clamp(1.25rem, 4vw, 1.75rem) clamp(1rem, 4vw, 1.5rem);
  border-radius: 1.25rem;
  max-width: ${contentMaxWidth};
  margin-left: auto;
  margin-right: auto;
  background: radial-gradient(
    ellipse at 50% 40%,
    rgba(245, 217, 139, 0.16) 0%,
    rgba(214, 177, 94, 0.08) 48%,
    rgba(22, 16, 40, 0.38) 72%,
    transparent 92%
  );
  border: 1px solid rgba(245, 217, 139, 0.22);
  box-shadow:
    0 0 36px rgba(245, 217, 139, 0.14),
    0 18px 56px rgba(0, 0, 0, 0.38);
  text-align: center;
`;

const Wrap = styled(motion.div)`
  text-align: center;
`;

const Message = styled(SectionSubtitleStatic)`
  margin: 0 auto;
`;

const PersistedHint = styled.p`
  margin: clamp(0.85rem, 2.5vw, 1.1rem) auto 0;
  max-width: ${contentMaxWidth};
  font-family: ${fonts.sans};
  font-size: clamp(0.88rem, 2.8vw, 1rem);
  font-weight: 500;
  line-height: 1.45;
  color: ${colors.helperMuted};
  opacity: 0.88;
`;

type Answer = "yes" | "no";

type Props = {
  reducedMotion: boolean;
  answer: Answer;
  showPersistedHint?: boolean;
};

const copy: Record<Answer, string> = {
  yes: "Շնորհակալություն։ Ուրախ կլինենք Ձեզ տեսնել այս հատուկ երեկոյին։",
  no: "Շնորհակալություն պատասխանի համար։ Դուք մեզ շատ կպակասեք։",
};

export function ConfirmationMessage({
  reducedMotion,
  answer,
  showPersistedHint = false,
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
      </Glow>
    </Wrap>
  );
}
