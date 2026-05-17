"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

import { GoldDivider } from "@/components/invitation/GoldDivider";
import {
  EyebrowDivider,
  EyebrowLabel,
  EyebrowStack,
  SectionSubtitle,
  SectionTitleDate,
} from "@/components/invitation/InvitationTypography";
import { InvitationSection } from "@/components/invitation/InvitationSection";
import {
  ceremonyChildVariants,
  staggerParentVariants,
} from "@/components/invitation/RevealText";
import {
  contentMaxWidth,
  motion as motionCfg,
} from "@/lib/theme";

const Inner = styled(motion.div)`
  width: 100%;
  max-width: ${contentMaxWidth};
  margin: 0 auto;
  text-align: center;
`;

const RuleAbove = styled(motion.div)`
  margin-bottom: clamp(0.85rem, 2.6vw, 1.15rem);
`;

const RuleBelow = styled(motion.div)`
  margin-top: clamp(0.85rem, 2.6vw, 1.15rem);
  margin-bottom: clamp(0.85rem, 3vw, 1.25rem);
`;

const DateGlow = styled.div`
  position: relative;
  width: 100%;
  padding: clamp(0.35rem, 1.8vw, 0.85rem) 0;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: min(82vw, 580px);
    height: 148%;
    background: radial-gradient(
      ellipse at center,
      rgba(245, 217, 139, 0.18) 0%,
      rgba(214, 177, 94, 0.09) 44%,
      transparent 72%
    );
    pointer-events: none;
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

type Props = {
  reducedMotion: boolean;
};

export function DateSection({ reducedMotion }: Props) {
  const item = ceremonyChildVariants(reducedMotion);
  const parent = staggerParentVariants(reducedMotion);

  return (
    <InvitationSection id="date" aria-labelledby="date-heading">
      <Inner
        variants={parent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: motionCfg.scroll.viewportAmount }}
      >
        <EyebrowStack variants={item}>
          <EyebrowLabel id="date-heading">
            Տոնակատարությունը
            <br />
            տեղի կունենա
          </EyebrowLabel>
        </EyebrowStack>
        <RuleAbove variants={item}>
          <GoldDivider />
        </RuleAbove>
        <DateGlow>
          <SectionTitleDate variants={item}>27 հունիսի 2026</SectionTitleDate>
        </DateGlow>
        <RuleBelow variants={item}>
          <GoldDivider />
        </RuleBelow>
        <SectionSubtitle variants={item}>Սպասում ենք Ձեզ սիրով:</SectionSubtitle>
      </Inner>
    </InvitationSection>
  );
}
