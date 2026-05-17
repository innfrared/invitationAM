"use client";

import { useReducedMotion } from "framer-motion";
import { Suspense, useCallback, useMemo, useState } from "react";

import { BirthdayPersonSection } from "@/components/invitation/BirthdayPersonSection";
import { DateSection } from "@/components/invitation/DateSection";
import { InvitationBackgroundMusic } from "@/components/invitation/InvitationBackgroundMusic";
import { InvitationEntryOverlay } from "@/components/invitation/InvitationEntryOverlay";
import { GoldParticlesBackground } from "@/components/invitation/GoldParticlesBackground";
import { HeroSection } from "@/components/invitation/HeroSection";
import { InvitationRevealSection } from "@/components/invitation/InvitationRevealSection";
import { LocationSection } from "@/components/invitation/LocationSection";
import {
  RSVPSection,
  RSVPSectionFallback,
} from "@/components/invitation/RSVPSection";
import { invitationSections } from "@/components/invitation/sections";
import { SnapScrollContainer } from "@/components/invitation/SnapScrollContainer";
import { StepIndicator } from "@/components/invitation/StepIndicator";
import { useActiveSection } from "@/components/invitation/useActiveSection";

function InvitationExperience({ reducedMotion }: { reducedMotion: boolean }) {
  const [snapRoot, setSnapRoot] = useState<HTMLElement | null>(null);
  const captureSnapRoot = useCallback((node: HTMLElement | null) => {
    setSnapRoot(node);
  }, []);
  const sectionIds = useMemo(
    () => invitationSections.map((s) => s.id),
    [],
  );
  const activeStep = useActiveSection(snapRoot, sectionIds);

  const handleStepClick = useCallback((index: number) => {
    const id = invitationSections[index]?.id;
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  return (
    <>
      <InvitationBackgroundMusic inviteOpened />
      <GoldParticlesBackground reducedMotion={reducedMotion} />
      <SnapScrollContainer ref={captureSnapRoot}>
        <HeroSection reducedMotion={reducedMotion} />
        <InvitationRevealSection reducedMotion={reducedMotion} />
        <BirthdayPersonSection reducedMotion={reducedMotion} />
        <DateSection reducedMotion={reducedMotion} />
        <LocationSection reducedMotion={reducedMotion} />
        <Suspense fallback={<RSVPSectionFallback reducedMotion={reducedMotion} />}>
          <RSVPSection reducedMotion={reducedMotion} />
        </Suspense>
      </SnapScrollContainer>
      <StepIndicator
        sections={invitationSections}
        activeStep={activeStep}
        onStepClick={handleStepClick}
      />
    </>
  );
}

export function BirthdayInvitationPage() {
  const reducedMotion = useReducedMotion();
  const rm = !!reducedMotion;
  const [inviteOpened, setInviteOpened] = useState(false);

  const handleOpenInvite = useCallback(() => {
    setInviteOpened(true);
  }, []);

  if (!inviteOpened) {
    return (
      <>
        <InvitationEntryOverlay reducedMotion={rm} onOpen={handleOpenInvite} />
        <audio src="/invitesong.mp3" preload="auto" hidden aria-hidden />
      </>
    );
  }

  return <InvitationExperience reducedMotion={rm} />;
}
