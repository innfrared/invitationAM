"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

import { InvitationSection } from "@/components/invitation/InvitationSection";
import { colors, contentMaxWidth, fonts, motion as motionCfg } from "@/lib/theme";

const Inner = styled(motion.div)`
  width: 100%;
  max-width: ${contentMaxWidth};
  margin: 0 auto;
  text-align: center;
`;

const Label = styled(motion.p)`
  margin: 0 0 clamp(0.85rem, 2.5vw, 1.1rem);
  font-family: ${fonts.sans};
  font-size: clamp(0.76rem, 2.3vw, 0.86rem);
  font-weight: 500;
  letter-spacing: 0.05em;
  color: ${colors.goldMuted};
`;

const DateDisplay = styled(motion.p)`
  margin: 0 0 clamp(1rem, 3vw, 1.35rem);
  font-family: ${fonts.serif};
  font-size: clamp(2.25rem, 8.5vw, 4rem);
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1.12;
  background: linear-gradient(
    105deg,
    ${colors.goldMuted} 0%,
    ${colors.goldLight} 38%,
    ${colors.gold} 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 28px rgba(214, 177, 94, 0.45));
`;

const Subline = styled(motion.p)`
  margin: 0;
  font-family: ${fonts.serif};
  font-size: clamp(0.95rem, 3vw, 1.08rem);
  font-style: italic;
  line-height: 1.5;
  color: rgba(245, 240, 230, 0.58);
`;

type Props = {
  reducedMotion: boolean;
};

export function DateSection({ reducedMotion }: Props) {
  const ease = motionCfg.ease;
  const dur = reducedMotion ? motionCfg.duration.fast : motionCfg.duration.slow;

  const parent = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.18,
        delayChildren: 0,
      },
    },
  };

  const labelChild = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: dur * 0.85, ease },
    },
  };

  const dateChild = {
    hidden: {
      opacity: 0,
      scale: reducedMotion ? 1 : 0.94,
      y: reducedMotion ? 0 : 12,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: dur, ease },
    },
  };

  const subChild = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: dur * 0.9, ease },
    },
  };

  return (
    <InvitationSection aria-labelledby="date-heading">
      <Inner
        variants={parent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: motionCfg.scroll.viewportAmount }}
      >
        <Label id="date-heading" variants={labelChild}>
          Տոնակատարությունը տեղի կունենա
        </Label>
        <DateDisplay variants={dateChild}>27 հունիսի, 2026</DateDisplay>
        <Subline variants={subChild}>Սպասում ենք Ձեզ սիրով</Subline>
      </Inner>
    </InvitationSection>
  );
}
