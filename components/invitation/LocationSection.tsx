"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

import { InvitationSection } from "@/components/invitation/InvitationSection";
import { colors, contentMaxWidth, fonts, motion as motionCfg } from "@/lib/theme";

const Frame = styled(motion.div)`
  width: 100%;
  max-width: ${contentMaxWidth};
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 3rem) clamp(1.25rem, 4vw, 2.5rem);
  text-align: center;
  border-top: 1px solid rgba(214, 177, 94, 0.28);
  border-bottom: 1px solid rgba(214, 177, 94, 0.28);
  background: linear-gradient(
    180deg,
    rgba(214, 177, 94, 0.04) 0%,
    transparent 35%,
    transparent 65%,
    rgba(214, 177, 94, 0.03) 100%
  );
  box-shadow:
    0 0 60px rgba(214, 177, 94, 0.05),
    inset 0 0 40px rgba(0, 0, 0, 0.15);
`;

const LocationLabel = styled(motion.p)`
  margin: 0 0 clamp(0.65rem, 2vw, 0.9rem);
  font-family: ${fonts.sans};
  font-size: clamp(0.76rem, 2.3vw, 0.86rem);
  font-weight: 500;
  letter-spacing: 0.08em;
  color: ${colors.goldMuted};
`;

const Venue = styled(motion.p)`
  margin: 0 0 clamp(1rem, 3vw, 1.35rem);
  font-family: ${fonts.serif};
  font-size: clamp(1.85rem, 6.5vw, 3.1rem);
  font-weight: 600;
  line-height: 1.15;
  color: ${colors.cream};
  text-shadow: 0 0 32px rgba(214, 177, 94, 0.12);
`;

const Tagline = styled(motion.p)`
  margin: 0;
  font-family: ${fonts.serif};
  font-size: clamp(0.96rem, 3.1vw, 1.1rem);
  line-height: 1.55;
  color: rgba(245, 240, 230, 0.62);
`;

type Props = {
  reducedMotion: boolean;
};

export function LocationSection({ reducedMotion }: Props) {
  const ease = motionCfg.ease;
  const dur = reducedMotion ? motionCfg.duration.fast : motionCfg.duration.medium;

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
    hidden: { opacity: 0, y: reducedMotion ? 0 : 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: dur, ease },
    },
  };

  return (
    <InvitationSection aria-labelledby="location-heading">
      <Frame
        variants={parent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: motionCfg.scroll.viewportAmount }}
      >
        <LocationLabel id="location-heading" variants={item}>
          Վայրը
        </LocationLabel>
        <Venue variants={item}>Արարատ ռեստորան</Venue>
        <Tagline variants={item}>
          Երեկո՝ լի ջերմությամբ, հիշողություններով և ուրախությամբ
        </Tagline>
      </Frame>
    </InvitationSection>
  );
}
