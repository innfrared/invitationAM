"use client";

import { useReducedMotion } from "framer-motion";
import { useState } from "react";
import { AnimatedBackground } from "@/components/invitation/AnimatedBackground";
import { BirthdayPersonSection } from "@/components/invitation/BirthdayPersonSection";
import { DateSection } from "@/components/invitation/DateSection";
import { FloatingParticles } from "@/components/invitation/FloatingParticles";
import { HeroSection } from "@/components/invitation/HeroSection";
import { InvitationRevealSection } from "@/components/invitation/InvitationRevealSection";
import { LocationSection } from "@/components/invitation/LocationSection";
import { RSVPSection } from "@/components/invitation/RSVPSection";
import { SnapScrollContainer } from "@/components/invitation/SnapScrollContainer";

type Rsvp = "yes" | "no" | null;

export function BirthdayInvitationPage() {
  const reducedMotion = useReducedMotion();
  const rm = !!reducedMotion;
  const [rsvp, setRsvp] = useState<Rsvp>(null);

  return (
    <>
      <AnimatedBackground reducedMotion={rm} />
      <FloatingParticles reducedMotion={rm} />
      <SnapScrollContainer>
        <HeroSection reducedMotion={rm} />
        <InvitationRevealSection reducedMotion={rm} />
        <BirthdayPersonSection reducedMotion={rm} />
        <DateSection reducedMotion={rm} />
        <LocationSection reducedMotion={rm} />
        <RSVPSection
          reducedMotion={rm}
          rsvp={rsvp}
          onSelectYes={() => setRsvp("yes")}
          onSelectNo={() => setRsvp("no")}
          onChangeResponse={() => setRsvp(null)}
        />
      </SnapScrollContainer>
    </>
  );
}
