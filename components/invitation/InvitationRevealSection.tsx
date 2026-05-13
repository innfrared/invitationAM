"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

import { GoldDivider } from "@/components/invitation/GoldDivider";
import { InvitationSection } from "@/components/invitation/InvitationSection";
import {
  SectionSubtitle,
  SectionTitle,
} from "@/components/invitation/InvitationTypography";
import {
  RevealGroup,
  staggerChildVariants,
} from "@/components/invitation/RevealText";
import { contentMaxWidth } from "@/lib/theme";

const Inner = styled.div`
  width: 100%;
  max-width: ${contentMaxWidth};
  margin: 0 auto;
  text-align: center;
`;

const StyledSectionTitle = styled(SectionTitle)`
  margin-bottom: clamp(0.35rem, 1.6vw, 0.65rem);
`;

const DividerWrap = styled(motion.div)`
  margin-top: 0;
  margin-bottom: clamp(0.15rem, 1vw, 0.35rem);
`;

const StyledSubtitle = styled(SectionSubtitle)`
  margin-top: clamp(0.25rem, 1.2vw, 0.55rem);
`;

type Props = {
  reducedMotion: boolean;
};

export function InvitationRevealSection({ reducedMotion }: Props) {
  const v = staggerChildVariants(reducedMotion);

  return (
    <InvitationSection id="invitation" aria-label="Հրավեր">
      <Inner>
        <RevealGroup reducedMotion={reducedMotion}>
          <StyledSectionTitle variants={v}>
            Սիրով հրավիրում ենք Ձեզ
          </StyledSectionTitle>
          <DividerWrap variants={v}>
            <GoldDivider />
          </DividerWrap>
          <StyledSubtitle variants={v}>
            մասնակցելու գեղեցիկ և հիշարժան երեկոյի
          </StyledSubtitle>
        </RevealGroup>
      </Inner>
    </InvitationSection>
  );
}
