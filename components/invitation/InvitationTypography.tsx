"use client";

import { motion } from "framer-motion";
import styled, { css } from "styled-components";

import { colors, contentMaxWidth, fonts } from "@/lib/theme";

const ceremonyGoldText = css`
  background: linear-gradient(
    180deg,
    #fff1b8 0%,
    #f5d98b 28%,
    #d6b15e 62%,
    #a9823a 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  padding-bottom: 0.14em;
  text-shadow:
    0 0 18px rgba(245, 217, 139, 0.22),
    0 0 42px rgba(214, 177, 94, 0.12);
  filter: drop-shadow(0 0 18px rgba(245, 217, 139, 0.22))
    drop-shadow(0 0 42px rgba(214, 177, 94, 0.12));
`;

const eyebrowTypography = css`
  margin: 0;
  font-family: ${fonts.sans};
  font-size: clamp(1.1rem, 3.5vw, 1.55rem);
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: 0.07em;
  text-transform: none;
  text-align: center;
  color: #f5d98b;
  opacity: 1;
  text-shadow:
    0 0 24px rgba(245, 217, 139, 0.45),
    0 0 48px rgba(214, 177, 94, 0.2);
`;

export const EyebrowLabel = styled.p`
  ${eyebrowTypography}
  margin-bottom: 0.45rem;
  max-width: ${contentMaxWidth};
  margin-left: auto;
  margin-right: auto;
`;

export const EyebrowText = styled(motion.p)`
  ${eyebrowTypography}
  max-width: ${contentMaxWidth};
  margin-left: auto;
  margin-right: auto;
`;

export const EyebrowDivider = styled.div`
  width: clamp(100px, 22vw, 200px);
  height: 1px;
  margin-bottom: clamp(18px, 2.5vw, 24px);
  align-self: center;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(245, 217, 139, 0.35) 18%,
    #f5d98b 50%,
    rgba(245, 217, 139, 0.35) 82%,
    transparent 100%
  );
  box-shadow: 0 0 14px rgba(245, 217, 139, 0.4);
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
  font-size: clamp(3.6rem, 15vw, 8rem);
  font-weight: 600;
  line-height: 1;
  ${ceremonyGoldText}
`;

export const SectionTitle = styled(motion.p)`
  margin: 0;
  font-family: ${fonts.serif};
  font-size: clamp(3rem, 11vw, 6.6rem);
  font-weight: 600;
  line-height: 1.06;
  ${ceremonyGoldText}
`;

export const BirthdayNameTitle = styled(motion.p)`
  margin: 0;
  font-family: ${fonts.serif};
  font-size: clamp(2.35rem, 8.6vw, 5.65rem);
  font-weight: 700;
  line-height: 1.06;
  ${ceremonyGoldText}
  filter: drop-shadow(0 0 22px rgba(245, 217, 139, 0.35))
    drop-shadow(0 0 56px rgba(214, 177, 94, 0.22));
`;

export const SectionTitleDate = styled(motion.p)`
  margin: 0;
  font-family: ${fonts.serif};
  font-size: clamp(3rem, 11vw, 6.8rem);
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1.06;
  ${ceremonyGoldText}
`;

export const CelebrationTitle = styled(motion.p)`
  margin: 0;
  font-family: ${fonts.serif};
  font-size: clamp(3rem, 11.5vw, 6.85rem);
  font-weight: 700;
  line-height: 1.06;
  ${ceremonyGoldText}
  filter: drop-shadow(0 0 26px rgba(245, 217, 139, 0.4))
    drop-shadow(0 0 64px rgba(214, 177, 94, 0.28));
`;

const sectionSubtitleCss = css`
  margin: 0 auto;
  max-width: ${contentMaxWidth};
  font-family: ${fonts.sans};
  font-size: clamp(1.3rem, 4.6vw, 1.9rem);
  font-weight: 450;
  line-height: 1.55;
  text-align: center;
  color: #f3e8d0;
  opacity: 0.96;
  text-shadow:
    0 0 20px rgba(245, 217, 139, 0.12),
    0 2px 24px rgba(0, 0, 0, 0.35);
`;

export const SectionSubtitle = styled(motion.p)`
  ${sectionSubtitleCss}
`;

export const SectionSubtitleStatic = styled.p`
  ${sectionSubtitleCss}
`;

export const HelperText = styled(motion.p)`
  margin: 0 auto;
  max-width: ${contentMaxWidth};
  font-family: ${fonts.sans};
  font-size: clamp(1.12rem, 3.4vw, 1.32rem);
  font-weight: 500;
  line-height: 1.55;
  text-align: center;
  color: ${colors.cream};
  opacity: 0.92;
  text-shadow:
    0 0 16px rgba(245, 217, 139, 0.14),
    0 2px 18px rgba(0, 0, 0, 0.4);
`;

export const RSVPQuestion = styled(motion.h2)`
  margin: 0 auto;
  max-width: ${contentMaxWidth};
  font-family: ${fonts.serif};
  font-size: clamp(3rem, 11vw, 6.2rem);
  font-weight: 700;
  line-height: 1.08;
  text-align: center;
  ${ceremonyGoldText}
`;
