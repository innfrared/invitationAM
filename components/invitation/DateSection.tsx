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
import { contentMaxWidth, motion as motionCfg } from "@/lib/theme";

const Inner = styled(motion.div)`
  width: 100%;
  max-width: ${contentMaxWidth};
  margin: 0 auto;
  text-align: center;
`;

const RuleAbove = styled(motion.div)`
  margin-bottom: clamp(1rem, 3vw, 1.35rem);
`;

const RuleBelow = styled(motion.div)`
  margin-top: clamp(1rem, 3vw, 1.35rem);
  margin-bottom: clamp(0.85rem, 3vw, 1.25rem);
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
            Տոնակատարությունը տեղի կունենա
          </EyebrowLabel>
          <EyebrowDivider aria-hidden />
        </EyebrowStack>
        <RuleAbove variants={item}>
          <GoldDivider />
        </RuleAbove>
        <SectionTitleDate variants={item}>27 հունիսի, 2026</SectionTitleDate>
        <RuleBelow variants={item}>
          <GoldDivider />
        </RuleBelow>
        <SectionSubtitle variants={item}>Սպասում ենք Ձեզ սիրով</SectionSubtitle>
      </Inner>
    </InvitationSection>
  );
}
