"use client";

import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";

import { GoldDivider } from "@/components/invitation/GoldDivider";
import {
  EyebrowDivider,
  EyebrowLabel,
  EyebrowStack,
  HelperText,
  HeroTitle,
} from "@/components/invitation/InvitationTypography";
import { InvitationSection } from "@/components/invitation/InvitationSection";
import {
  ceremonyChildVariants,
  staggerParentVariants,
} from "@/components/invitation/RevealText";
import { contentMaxWidth } from "@/lib/theme";
import { motion as motionCfg } from "@/lib/theme";

const Glow = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse 72% 46% at 50% 38%,
    rgba(214, 177, 94, 0.07) 0%,
    transparent 68%
  );
`;

const Content = styled(motion.div)`
  width: 100%;
  max-width: ${contentMaxWidth};
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const StyledHeroTitle = styled(HeroTitle)`
  margin-bottom: clamp(1.5rem, 4vw, 2.25rem);
`;

const DividerWrap = styled(motion.div)`
  margin-bottom: clamp(1.35rem, 4vw, 2rem);
`;

const hintPulse = keyframes`
  0%,
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 0.55;
  }
  50% {
    transform: translate3d(0, 8px, 0);
    opacity: 1;
  }
`;

const ScrollCue = styled(motion.div)`
  margin-top: clamp(2.5rem, 8vw, 4rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.45rem;
`;

const CueLine = styled.span<{ $paused: boolean }>`
  width: 1px;
  height: clamp(28px, 7vw, 44px);
  background: linear-gradient(
    180deg,
    rgba(245, 217, 139, 0.35),
    rgba(214, 177, 94, 0.85),
    rgba(245, 217, 139, 0.28)
  );
  border-radius: 1px;
  box-shadow: 0 0 12px rgba(214, 177, 94, 0.28);
  animation: ${hintPulse} 2.4s ease-in-out infinite;
  animation-play-state: ${(p) => (p.$paused ? "paused" : "running")};
`;

const CueDot = styled.span<{ $paused: boolean }>`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: radial-gradient(circle, #f5d98b, #d6b15e);
  opacity: 0.9;
  animation: ${hintPulse} 2.4s ease-in-out infinite;
  animation-delay: -0.4s;
  animation-play-state: ${(p) => (p.$paused ? "paused" : "running")};
`;

type Props = {
  reducedMotion: boolean;
};

export function HeroSection({ reducedMotion }: Props) {
  const item = ceremonyChildVariants(reducedMotion);
  const container = staggerParentVariants(reducedMotion);

  return (
    <InvitationSection id="hero" aria-label="Ողջույն">
      <Glow aria-hidden="true" />
      <Content
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: motionCfg.scroll.viewportAmount }}
      >
        <DividerWrap variants={item}>
          <GoldDivider />
        </DividerWrap>
        <EyebrowStack variants={item}>
          <EyebrowLabel>50-ամյակի հրավեր</EyebrowLabel>
          <EyebrowDivider aria-hidden />
        </EyebrowStack>
        <StyledHeroTitle variants={item}>Սիրելի՛ ընկեր,</StyledHeroTitle>
        <HelperText variants={item}>Ոլորեք՝ հրավերը բացելու համար</HelperText>
        <ScrollCue variants={item} aria-hidden="true">
          <CueLine $paused={reducedMotion} />
          <CueDot $paused={reducedMotion} />
        </ScrollCue>
      </Content>
    </InvitationSection>
  );
}
