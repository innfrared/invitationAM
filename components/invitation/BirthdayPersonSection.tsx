"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

import { GoldDivider } from "@/components/invitation/GoldDivider";
import {
  BirthdayNameTitle,
  CelebrationTitle,
  EyebrowDivider,
  EyebrowLabel,
  EyebrowStack,
} from "@/components/invitation/InvitationTypography";
import { InvitationSection } from "@/components/invitation/InvitationSection";
import {
  ceremonyChildVariants,
  staggerParentVariants,
} from "@/components/invitation/RevealText";
import { contentMaxWidth, fonts, motion as motionCfg } from "@/lib/theme";

const Stage = styled.div`
  position: relative;
  width: 100%;
  max-width: ${contentMaxWidth};
  margin: 0 auto;
  text-align: center;
`;

const WatermarkGlow = styled.div`
  position: absolute;
  left: 50%;
  top: 52%;
  transform: translate(-50%, -50%);
  width: min(92vw, 440px);
  height: min(92vw, 440px);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(245, 217, 139, 0.26) 0%,
    rgba(214, 177, 94, 0.12) 42%,
    transparent 68%
  );
  filter: blur(14px);
  pointer-events: none;
  z-index: 0;
`;

const Watermark = styled.div`
  position: absolute;
  left: 50%;
  top: 52%;
  transform: translate(-50%, -50%);
  font-family: ${fonts.serif};
  font-size: clamp(7.5rem, 40vw, 20rem);
  font-weight: 700;
  line-height: 1;
  color: rgba(245, 217, 139, 0.42);
  opacity: 0.17;
  pointer-events: none;
  user-select: none;
  z-index: 0;
  filter: blur(0.8px);
  text-shadow:
    0 0 60px rgba(245, 217, 139, 0.35),
    0 0 120px rgba(214, 177, 94, 0.22);
`;

const Inner = styled(motion.div)`
  position: relative;
  z-index: 1;
  width: 100%;

  &::before {
    content: "";
    position: absolute;
    inset: -18% -8% -22%;
    background: radial-gradient(
      ellipse 68% 58% at 50% 46%,
      rgba(245, 217, 139, 0.16) 0%,
      rgba(214, 177, 94, 0.07) 46%,
      transparent 72%
    );
    pointer-events: none;
    z-index: -1;
  }
`;

const StyledName = styled(BirthdayNameTitle)`
  margin-bottom: clamp(0.65rem, 2.2vw, 0.95rem);
`;

const TopRule = styled(motion.div)`
  margin-bottom: clamp(1.25rem, 4vw, 2rem);
`;

const BottomRule = styled(motion.div)`
  margin-top: clamp(1.25rem, 4vw, 2rem);
`;

type Props = {
  reducedMotion: boolean;
};

export function BirthdayPersonSection({ reducedMotion }: Props) {
  const item = ceremonyChildVariants(reducedMotion);
  const parent = staggerParentVariants(reducedMotion);

  return (
    <InvitationSection id="birthday-person" aria-labelledby="birthday-heading">
      <Stage>
        <WatermarkGlow aria-hidden />
        <Watermark aria-hidden="true">50</Watermark>
        <Inner
          variants={parent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: motionCfg.scroll.viewportAmount }}
        >
          <TopRule variants={item}>
            <GoldDivider />
          </TopRule>
          <EyebrowStack variants={item}>
            <EyebrowLabel id="birthday-heading">Տոնում ենք</EyebrowLabel>
            <EyebrowDivider aria-hidden />
          </EyebrowStack>
          <StyledName variants={item}>Արթուր Մնացականյանի</StyledName>
          <CelebrationTitle variants={item}>50-ամյակը</CelebrationTitle>
          <BottomRule variants={item}>
            <GoldDivider />
          </BottomRule>
        </Inner>
      </Stage>
    </InvitationSection>
  );
}
