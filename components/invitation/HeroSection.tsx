"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";

import { GoldDivider } from "@/components/invitation/GoldDivider";
import { HeroTitle } from "@/components/invitation/InvitationTypography";
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

const HeroSectionRoot = styled(InvitationSection)`
  justify-content: center;
  padding-top: max(
    clamp(1.25rem, 4vw, 2.5rem),
    env(safe-area-inset-top, 0px)
  );
`;

const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: ${contentMaxWidth};
  margin: 0 auto;
  text-align: center;
  gap: clamp(1.15rem, 3.2vw, 1.85rem);
  position: relative;
  z-index: 1;
`;

const StyledHeroTitle = styled(HeroTitle).withConfig({
  shouldForwardProp: (prop) => prop !== "$playShimmer",
})<{ $playShimmer: boolean }>`
  max-width: ${contentMaxWidth};
  margin-left: auto;
  margin-right: auto;
  font-size: clamp(1.45rem, 4.2vw, 2rem);
  line-height: 1.48;
  margin-bottom: 0;
  animation-name: ${goldTitleShimmerOnce};
  animation-duration: 1.08s;
  animation-timing-function: ease-out;
  animation-fill-mode: both;
  animation-iteration-count: 1;
  animation-play-state: ${(p) => (p.$playShimmer ? "running" : "paused")};
`;

const DividerWrap = styled(motion.div)`
  margin: 0;
  width: 100%;
`;

type Props = {
  reducedMotion: boolean;
};

export function HeroSection({ reducedMotion }: Props) {
  const item = ceremonyChildVariants(reducedMotion);
  const container = staggerParentVariants(reducedMotion);
  const [heroShimmer, setHeroShimmer] = useState(false);

  return (
    <HeroSectionRoot id="hero" aria-label="Ողջույն">
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
        <StyledHeroTitle
          variants={item}
          $playShimmer={!reducedMotion && heroShimmer}
          onAnimationComplete={(definition) => {
            if (!reducedMotion && definition === "show") {
              setHeroShimmer(true);
            }
          }}
        >
          Հետևում թողնելով <br />50 տարվա կենսագրություն`<br />նոր էջ եմ բացում,<br />որտեղ ամենագեղեցիկ<br />հիշողությունները դեռ<br />գրվելու են...
        </StyledHeroTitle>
        <DividerWrap variants={item}>
          <GoldDivider />
        </DividerWrap>
      </Content>
    </HeroSectionRoot>
  );
}
