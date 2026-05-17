"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

import { GoldDivider } from "@/components/invitation/GoldDivider";
import {
  BirthdayNameTitle,
  SectionSubtitle,
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

const NameStage = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: clamp(0.65rem, 2.2vw, 0.95rem);
`;

const WatermarkGlow = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: min(100vw, 620px);
  height: min(82vw, 400px);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(245, 217, 139, 0.32) 0%,
    rgba(214, 177, 94, 0.14) 42%,
    transparent 68%
  );
  filter: blur(12px);
  pointer-events: none;
  z-index: 0;
`;

const Watermark = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -52%);
  font-family: ${fonts.serif};
  font-size: clamp(10.5rem, 52vw, 22rem);
  font-weight: 800;
  line-height: 1;
  color: rgba(245, 217, 139, 0.78);
  opacity: 0.52;
  pointer-events: none;
  user-select: none;
  z-index: 0;
  letter-spacing: -0.04em;
  text-shadow:
    0 0 56px rgba(245, 217, 139, 0.55),
    0 0 110px rgba(214, 177, 94, 0.35);
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
  position: relative;
  z-index: 1;
  margin: 0;
`;

const TopRule = styled(motion.div)`
  margin-bottom: clamp(3.5rem, 11vw, 5.5rem);
`;

const BottomRule = styled(motion.div)`
  margin-top: clamp(3.5rem, 11vw, 5.5rem);
`;

const EveningTagline = styled(SectionSubtitle)`
  font-size: clamp(1.2rem, 4.2vw, 1.75rem);
  margin-top: clamp(0.85rem, 2.6vw, 1.25rem);
  margin-bottom: 0;
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
        <Inner
          variants={parent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: motionCfg.scroll.viewportAmount }}
        >
          <TopRule variants={item}>
            <GoldDivider />
          </TopRule>
          <NameStage>
            <WatermarkGlow aria-hidden />
            <Watermark aria-hidden="true">50</Watermark>
            <StyledName id="birthday-heading" variants={item}>
              Արթուր Մնացականյան
            </StyledName>
          </NameStage>
          <BottomRule variants={item}>
            <GoldDivider />
          </BottomRule>
          <EveningTagline variants={item}>
            Ձեզ սպասվում է երեկո՝ լի ջերմությամբ,
            <br />
            հիշողություններով և ուրախությամբ:
          </EveningTagline>
        </Inner>
      </Stage>
    </InvitationSection>
  );
}
