"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";

import { BirthdayPersonSection } from "@/components/invitation/BirthdayPersonSection";
import { DateSection } from "@/components/invitation/DateSection";
import { GoldParticlesBackground } from "@/components/invitation/GoldParticlesBackground";
import { HeroSection } from "@/components/invitation/HeroSection";
import { InvitationRevealSection } from "@/components/invitation/InvitationRevealSection";
import { LocationSection } from "@/components/invitation/LocationSection";
import { RSVPSection } from "@/components/invitation/RSVPSection";
import { invitationSections } from "@/components/invitation/sections";
import { SnapScrollContainer } from "@/components/invitation/SnapScrollContainer";
import { StepIndicator } from "@/components/invitation/StepIndicator";
import { useActiveSection } from "@/components/invitation/useActiveSection";

type SelectedResponse = "yes" | "no" | null;

export function BirthdayInvitationPage() {
  const reducedMotion = useReducedMotion();
  const rm = !!reducedMotion;
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

  const [selectedResponse, setSelectedResponse] =
    useState<SelectedResponse>(null);

  return (
    <>
      <GoldParticlesBackground reducedMotion={rm} />
      <SnapScrollContainer ref={captureSnapRoot}>
        <HeroSection reducedMotion={rm} />
        <InvitationRevealSection reducedMotion={rm} />
        <BirthdayPersonSection reducedMotion={rm} />
        <DateSection reducedMotion={rm} />
        <LocationSection reducedMotion={rm} />
        <RSVPSection
          reducedMotion={rm}
          selectedResponse={selectedResponse}
          onSelectYes={() => setSelectedResponse("yes")}
          onSelectNo={() => setSelectedResponse("no")}
          onChangeResponse={() => setSelectedResponse(null)}
        />
      </SnapScrollContainer>
      <StepIndicator
        sections={invitationSections}
        activeStep={activeStep}
        onStepClick={handleStepClick}
      />
    </>
  );
}
