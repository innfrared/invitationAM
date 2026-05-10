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
  margin: 0 0 clamp(0.85rem, 2.6vw, 1.15rem);
  font-family: ${fonts.sans};
  font-size: clamp(0.76rem, 2.4vw, 0.88rem);
  font-weight: 500;
  letter-spacing: 0.05em;
  color: ${colors.goldMuted};
`;

const Name = styled(motion.p)`
  margin: 0 0 clamp(0.65rem, 2.2vw, 0.95rem);
  font-family: ${fonts.serif};
  font-size: clamp(1.95rem, 6.5vw, 3.35rem);
  font-weight: 600;
  line-height: 1.15;
  color: ${colors.cream};
  text-shadow: 0 0 36px rgba(214, 177, 94, 0.14);
`;

const Milestone = styled(motion.p)`
  margin: 0;
  font-family: ${fonts.serif};
  font-size: clamp(1.65rem, 5.5vw, 2.85rem);
  font-weight: 500;
  line-height: 1.2;
  color: ${colors.goldLight};
`;

type Props = {
  reducedMotion: boolean;
};

export function BirthdayPersonSection({ reducedMotion }: Props) {
  const ease = motionCfg.ease;
  const dur = reducedMotion ? motionCfg.duration.fast : motionCfg.duration.slow;

  const parent = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.16,
        delayChildren: reducedMotion ? 0 : 0.04,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: dur, ease },
    },
  };

  return (
    <InvitationSection aria-labelledby="birthday-heading">
      <Inner
        variants={parent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: motionCfg.scroll.viewportAmount }}
      >
        <Label id="birthday-heading" variants={item}>
          Տոնում ենք
        </Label>
        <Name variants={item}>Արթուր Մնացականյանի</Name>
        <Milestone variants={item}>50-ամյակը</Milestone>
      </Inner>
    </InvitationSection>
  );
}
