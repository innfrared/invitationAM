"use client";

import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import { ConfirmationMessage } from "@/components/invitation/ConfirmationMessage";
import {
  RSVPQuestion,
  SectionSubtitle,
} from "@/components/invitation/InvitationTypography";
import { InvitationSection } from "@/components/invitation/InvitationSection";
import { RSVPButtons } from "@/components/invitation/RSVPButtons";
import {
  ceremonyChildVariants,
  staggerParentVariants,
} from "@/components/invitation/RevealText";
import { contentMaxWidth, motion as motionCfg } from "@/lib/theme";

const Inner = styled.div`
  width: 100%;
  max-width: ${contentMaxWidth};
  margin: 0 auto;
  text-align: center;
`;

const StyledRSVPQuestion = styled(RSVPQuestion)`
  margin-bottom: clamp(1rem, 3.5vw, 1.35rem);
`;

const RSVPHint = styled(SectionSubtitle)`
  margin-bottom: clamp(1.75rem, 5vw, 2.5rem);
`;

type SelectedResponse = "yes" | "no" | null;

type Props = {
  reducedMotion: boolean;
  selectedResponse: SelectedResponse;
  onSelectYes: () => void;
  onSelectNo: () => void;
  onChangeResponse: () => void;
};

export function RSVPSection({
  reducedMotion,
  selectedResponse,
  onSelectYes,
  onSelectNo,
  onChangeResponse,
}: Props) {
  const item = ceremonyChildVariants(reducedMotion);
  const parent = staggerParentVariants(reducedMotion);

  return (
    <InvitationSection id="rsvp" aria-labelledby="rsvp-heading">
      <Inner>
        <motion.div
          variants={parent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: motionCfg.scroll.viewportAmount }}
        >
          <StyledRSVPQuestion id="rsvp-heading" variants={item}>
            Կմիանա՞ք մեզ
          </StyledRSVPQuestion>
          {selectedResponse === null ? (
            <RSVPHint variants={item}>
              Խնդրում ենք ընտրել Ձեր պատասխանը
            </RSVPHint>
          ) : null}
          <motion.div variants={item}>
            <AnimatePresence mode="wait">
              {selectedResponse === null ? (
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
                  answer={selectedResponse}
                  onChangeResponse={onChangeResponse}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </Inner>
    </InvitationSection>
  );
}
