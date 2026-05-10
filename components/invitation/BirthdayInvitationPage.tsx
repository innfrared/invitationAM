"use client";

import { AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

import { AnimatedBackground } from "@/components/invitation/AnimatedBackground";
import { ConfirmationMessage } from "@/components/invitation/ConfirmationMessage";
import { DecorativeDivider } from "@/components/invitation/DecorativeDivider";
import { FloatingParticles } from "@/components/invitation/FloatingParticles";
import { InvitationCard } from "@/components/invitation/InvitationCard";
import { InvitationText } from "@/components/invitation/InvitationText";
import { RSVPButtons } from "@/components/invitation/RSVPButtons";

const Shell = styled.div`
  position: relative;
  z-index: 2;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1.25rem, 4vw, 2rem);
  overflow-x: hidden;
`;

const Main = styled.main`
  width: 100%;
  max-width: 560px;
`;

type Rsvp = "yes" | "no" | null;

export function BirthdayInvitationPage() {
  const reducedMotion = useReducedMotion();
  const rm = !!reducedMotion;
  const [rsvp, setRsvp] = useState<Rsvp>(null);

  return (
    <>
      <AnimatedBackground reducedMotion={rm} />
      <FloatingParticles reducedMotion={rm} />
      <Shell>
        <Main>
          <InvitationCard reducedMotion={rm}>
            <DecorativeDivider reducedMotion={rm} />
            <InvitationText reducedMotion={rm} />
            <AnimatePresence mode="wait">
              {rsvp === null ? (
                <RSVPButtons
                  key="rsvp"
                  reducedMotion={rm}
                  onSelectYes={() => setRsvp("yes")}
                  onSelectNo={() => setRsvp("no")}
                />
              ) : (
                <ConfirmationMessage
                  key="confirm"
                  reducedMotion={rm}
                  answer={rsvp}
                  onChangeResponse={() => setRsvp(null)}
                />
              )}
            </AnimatePresence>
          </InvitationCard>
        </Main>
      </Shell>
    </>
  );
}
