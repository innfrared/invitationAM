"use client";

import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import { ConfirmationMessage } from "@/components/invitation/ConfirmationMessage";
import { InvitationSection } from "@/components/invitation/InvitationSection";
import { RSVPButtons } from "@/components/invitation/RSVPButtons";
import { colors, contentMaxWidth, fonts, motion as motionCfg } from "@/lib/theme";

const Inner = styled.div`
  width: 100%;
  max-width: ${contentMaxWidth};
  margin: 0 auto;
  text-align: center;
`;

const Heading = styled(motion.h2)`
  margin: 0 0 clamp(2rem, 5vw, 2.75rem);
  font-family: ${fonts.serif};
  font-size: clamp(1.6rem, 5.2vw, 2.45rem);
  font-weight: 600;
  line-height: 1.25;
  color: ${colors.cream};
  text-shadow: 0 0 28px rgba(214, 177, 94, 0.12);
`;

type Rsvp = "yes" | "no" | null;

type Props = {
  reducedMotion: boolean;
  rsvp: Rsvp;
  onSelectYes: () => void;
  onSelectNo: () => void;
  onChangeResponse: () => void;
};

export function RSVPSection({
  reducedMotion,
  rsvp,
  onSelectYes,
  onSelectNo,
  onChangeResponse,
}: Props) {
  const ease = motionCfg.ease;

  return (
    <InvitationSection aria-labelledby="rsvp-heading">
      <Inner>
        <Heading
          id="rsvp-heading"
          initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{
            duration: reducedMotion
              ? motionCfg.duration.fast
              : motionCfg.duration.medium,
            ease,
          }}
        >
          Կմիանա՞ք մեզ
        </Heading>
        <AnimatePresence mode="wait">
          {rsvp === null ? (
            <RSVPButtons
              key="rsvp"
              reducedMotion={reducedMotion}
              onSelectYes={onSelectYes}
              onSelectNo={onSelectNo}
            />
          ) : (
            <ConfirmationMessage
              key="confirm"
              reducedMotion={reducedMotion}
              answer={rsvp}
              onChangeResponse={onChangeResponse}
            />
          )}
        </AnimatePresence>
      </Inner>
    </InvitationSection>
  );
}
