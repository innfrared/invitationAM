"use client";

import { motion } from "framer-motion";
import styled, { css } from "styled-components";

import { colors, fonts } from "@/lib/theme";

const eyebrowTypography = css`
  margin: 0;
  font-family: ${fonts.sans};
  font-size: clamp(1rem, 3.2vw, 1.35rem);
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0.08em;
  text-transform: none;
  text-align: center;
  color: ${colors.gold};
  opacity: 0.95;
  text-shadow: 0 0 22px rgba(214, 177, 94, 0.28);
`;

export const EyebrowLabel = styled.p`
  ${eyebrowTypography}
  margin-bottom: 0.45rem;
`;

export const EyebrowText = styled(motion.p)`
  ${eyebrowTypography}
`;

export const EyebrowDivider = styled.div`
  width: clamp(96px, 12vw, 140px);
  height: 1px;
  margin-bottom: clamp(18px, 2.5vw, 24px);
  align-self: center;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(245, 217, 139, 0.22) 18%,
    ${colors.gold} 50%,
    rgba(245, 217, 139, 0.22) 82%,
    transparent 100%
  );
  box-shadow: 0 0 12px rgba(214, 177, 94, 0.2);
`;

export const EyebrowStack = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const HeroTitle = styled(motion.h1)`
  margin: 0;
  font-family: ${fonts.serif};
  font-size: clamp(3rem, 13vw, 7rem);
  font-weight: 600;
  line-height: 1.05;
  color: ${colors.goldLight};
  text-shadow:
    0 0 42px rgba(245, 217, 139, 0.2),
    0 2px 28px rgba(0, 0, 0, 0.5);
`;

export const SectionTitle = styled(motion.p)`
  margin: 0;
  font-family: ${fonts.serif};
  font-size: clamp(2.4rem, 9vw, 5.6rem);
  font-weight: 600;
  line-height: 1.08;
  color: ${colors.goldLight};
  text-shadow:
    0 0 36px rgba(214, 177, 94, 0.16),
    0 2px 24px rgba(0, 0, 0, 0.35);
`;

export const SectionTitleDate = styled(motion.p)`
  margin: 0;
  font-family: ${fonts.serif};
  font-size: clamp(2.4rem, 9vw, 5.6rem);
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1.08;
  background: linear-gradient(
    105deg,
    ${colors.goldMuted} 0%,
    ${colors.goldLight} 40%,
    ${colors.gold} 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 26px rgba(214, 177, 94, 0.42));
`;

export const CelebrationTitle = styled(motion.p)`
  margin: 0;
  font-family: ${fonts.serif};
  font-size: clamp(2.4rem, 9vw, 5.6rem);
  font-weight: 600;
  line-height: 1.08;
  color: ${colors.goldLight};
  text-shadow: 0 0 28px rgba(245, 217, 139, 0.18);
`;

const sectionSubtitleCss = css`
  margin: 0 auto;
  max-width: min(94vw, 700px);
  font-family: ${fonts.sans};
  font-size: clamp(1.15rem, 4vw, 1.65rem);
  font-weight: 400;
  line-height: 1.65;
  text-align: center;
  color: ${colors.cream};
  opacity: 0.9;
  text-shadow: 0 0 18px rgba(245, 217, 139, 0.08);
`;

export const SectionSubtitle = styled(motion.p)`
  ${sectionSubtitleCss}
`;

export const SectionSubtitleStatic = styled.p`
  ${sectionSubtitleCss}
`;

export const HelperText = styled(motion.p)`
  margin: 0 auto;
  max-width: min(94vw, 700px);
  font-family: ${fonts.sans};
  font-size: clamp(0.95rem, 3vw, 1.15rem);
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  color: ${colors.helperMuted};
  opacity: 0.85;
  text-shadow: 0 0 14px rgba(245, 217, 139, 0.06);
`;

export const RSVPQuestion = styled(motion.h2)`
  margin: 0 auto;
  max-width: min(94vw, 700px);
  font-family: ${fonts.serif};
  font-size: clamp(2.2rem, 8vw, 4.8rem);
  font-weight: 600;
  line-height: 1.1;
  text-align: center;
  color: ${colors.goldLight};
  text-shadow:
    0 0 32px rgba(214, 177, 94, 0.14),
    0 2px 20px rgba(0, 0, 0, 0.35);
`;
