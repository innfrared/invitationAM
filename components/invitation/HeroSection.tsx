"use client";

import { useState } from "react";
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
      ellipse 82% 52% at 50% 28%,
      rgba(245, 217, 139, 0.14) 0%,
      rgba(214, 177, 94, 0.07) 38%,
      transparent 66%
    ),
    radial-gradient(
      ellipse 68% 48% at 50% 62%,
      rgba(214, 177, 94, 0.06) 0%,
      transparent 62%
    );
`;

const hintPulse = keyframes`
  0%,
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 0.62;
  }
  50% {
    transform: translate3d(0, 10px, 0);
    opacity: 1;
  }
`;

const goldTitleShimmerOnce = keyframes`
  0% {
    text-shadow:
      0 0 18px rgba(245, 217, 139, 0.22),
      0 0 42px rgba(214, 177, 94, 0.12);
  }
  42% {
    text-shadow:
      0 0 34px rgba(255, 241, 184, 0.42),
      0 0 76px rgba(245, 217, 139, 0.28);
  }
  100% {
    text-shadow:
      0 0 20px rgba(245, 217, 139, 0.26),
      0 0 48px rgba(214, 177, 94, 0.14);
  }
`;

const Content = styled(motion.div)`
  width: 100%;
  max-width: ${contentMaxWidth};
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const StyledHeroTitle = styled(HeroTitle).withConfig({
  shouldForwardProp: (prop) => prop !== "$playShimmer",
})<{ $playShimmer: boolean }>`
  margin-bottom: clamp(1.5rem, 4vw, 2.25rem);
  animation-name: ${goldTitleShimmerOnce};
  animation-duration: 1.08s;
  animation-timing-function: ease-out;
  animation-fill-mode: both;
  animation-iteration-count: 1;
  animation-play-state: ${(p) => (p.$playShimmer ? "running" : "paused")};
`;

const DividerWrap = styled(motion.div)`
  margin-bottom: clamp(1.35rem, 4vw, 2rem);
`;

const ScrollCue = styled(motion.div)`
  margin-top: clamp(2.5rem, 8vw, 4rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.45rem;
`;

const CueLine = styled.span<{ $paused: boolean }>`
  width: 2px;
  height: clamp(32px, 8vw, 52px);
  background: linear-gradient(
    180deg,
    rgba(245, 217, 139, 0.45),
    rgba(255, 241, 184, 0.92),
    rgba(214, 177, 94, 0.85),
    rgba(245, 217, 139, 0.35)
  );
  border-radius: 1px;
  box-shadow:
    0 0 16px rgba(245, 217, 139, 0.42),
    0 0 32px rgba(214, 177, 94, 0.22);
  animation: ${hintPulse} 2.4s ease-in-out infinite;
  animation-play-state: ${(p) => (p.$paused ? "paused" : "running")};
`;

const CueDot = styled.span<{ $paused: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: radial-gradient(circle, #fff1b8, #f5d98b 42%, #d6b15e);
  opacity: 0.96;
  box-shadow:
    0 0 14px rgba(245, 217, 139, 0.55),
    0 0 26px rgba(214, 177, 94, 0.28);
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
  const [heroShimmer, setHeroShimmer] = useState(false);

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
        <StyledHeroTitle
          variants={item}
          $playShimmer={!reducedMotion && heroShimmer}
          onAnimationComplete={(definition) => {
            if (!reducedMotion && definition === "show") {
              setHeroShimmer(true);
            }
          }}
        >
          Սիրելի՛ ընկեր,
        </StyledHeroTitle>
        <HelperText variants={item}>Ոլորեք՝ հրավերը բացելու համար</HelperText>
        <ScrollCue variants={item} aria-hidden="true">
          <CueLine $paused={reducedMotion} />
          <CueDot $paused={reducedMotion} />
        </ScrollCue>
      </Content>
    </InvitationSection>
  );
}
