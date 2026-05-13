"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

import { GoldDivider } from "@/components/invitation/GoldDivider";
import {
  CelebrationTitle,
  EyebrowDivider,
  EyebrowLabel,
  EyebrowStack,
  SectionTitle,
} from "@/components/invitation/InvitationTypography";
import { InvitationSection } from "@/components/invitation/InvitationSection";
import {
  ceremonyChildVariants,
  staggerParentVariants,
} from "@/components/invitation/RevealText";
import { colors, contentMaxWidth, fonts, motion as motionCfg } from "@/lib/theme";

const Stage = styled.div`
  position: relative;
  width: 100%;
  max-width: ${contentMaxWidth};
  margin: 0 auto;
  text-align: center;
`;

const Watermark = styled.div`
  position: absolute;
  left: 50%;
  top: 52%;
  transform: translate(-50%, -50%);
  font-family: ${fonts.serif};
  font-size: clamp(7rem, 38vw, 19rem);
  font-weight: 700;
  line-height: 1;
  color: ${colors.gold};
  opacity: 0.1;
  pointer-events: none;
  user-select: none;
  z-index: 0;
`;

const Inner = styled(motion.div)`
  position: relative;
  z-index: 1;
  width: 100%;
`;

const StyledName = styled(SectionTitle)`
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
