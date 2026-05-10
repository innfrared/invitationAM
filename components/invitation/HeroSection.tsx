"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

import { InvitationSection } from "@/components/invitation/InvitationSection";
import { colors, contentMaxWidth, fonts, motion as motionCfg } from "@/lib/theme";

const Glow = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse 70% 45% at 50% 42%,
    rgba(214, 177, 94, 0.08) 0%,
    transparent 65%
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

const Label = styled(motion.span)`
  display: block;
  margin-bottom: clamp(1.25rem, 4vw, 2rem);
  font-family: ${fonts.sans};
  font-size: clamp(0.78rem, 2.6vw, 0.92rem);
  font-weight: 500;
  letter-spacing: 0.04em;
  color: ${colors.goldLight};
  text-shadow: 0 0 24px rgba(214, 177, 94, 0.35);
`;

const Greeting = styled(motion.h1)`
  margin: 0 0 clamp(1.5rem, 4vw, 2.25rem);
  font-family: ${fonts.serif};
  font-size: clamp(2.25rem, 9vw, 4.75rem);
  font-weight: 600;
  line-height: 1.12;
  color: ${colors.cream};
  text-shadow:
    0 0 40px rgba(214, 177, 94, 0.18),
    0 2px 32px rgba(0, 0, 0, 0.45);
`;

const Hint = styled(motion.p)`
  margin: 0;
  font-family: ${fonts.sans};
  font-size: clamp(0.82rem, 2.6vw, 0.95rem);
  font-weight: 400;
  letter-spacing: 0.04em;
  color: rgba(214, 177, 94, 0.6);
`;

const OrnamentRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  margin-top: clamp(1.75rem, 5vw, 2.5rem);
`;

const OrnamentLine = styled.span`
  width: min(28vw, 140px);
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    ${colors.goldMuted},
    ${colors.gold},
    ${colors.goldMuted},
    transparent
  );
  box-shadow: 0 0 8px rgba(214, 177, 94, 0.22);
`;

const OrnamentGem = styled.span`
  width: 5px;
  height: 5px;
  background: radial-gradient(
    circle,
    ${colors.goldLight} 0%,
    ${colors.gold} 70%,
    transparent 100%
  );
  border-radius: 1px;
  transform: rotate(45deg);
  box-shadow: 0 0 10px rgba(245, 217, 139, 0.35);
`;

type Props = {
  reducedMotion: boolean;
};

export function HeroSection({ reducedMotion }: Props) {
  const ease = motionCfg.ease;
  const dur = reducedMotion ? motionCfg.duration.fast : motionCfg.duration.slow;

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.18,
        delayChildren: reducedMotion ? 0 : 0.08,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: dur, ease },
    },
  };

  return (
    <InvitationSection aria-label="50-ամյակի ճանապարհորդություն">
      <Glow aria-hidden="true" />
      <Content
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.55 }}
      >
        <Label variants={item}>50-ամյակի տոնական հրավեր</Label>
        <Greeting variants={item}>Սիրելի՛ ընկեր,</Greeting>
        <Hint variants={item}>Ոլորեք՝ հրավերը բացելու համար</Hint>
        <motion.div variants={item}>
          <OrnamentRow aria-hidden="true">
            <OrnamentLine />
            <OrnamentGem />
            <OrnamentLine />
          </OrnamentRow>
        </motion.div>
      </Content>
    </InvitationSection>
  );
}
