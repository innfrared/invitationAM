"use client";

import styled from "styled-components";

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
  margin-bottom: clamp(0.85rem, 3vw, 1.35rem);
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
          <SectionSubtitle variants={v}>
            մասնակցելու գեղեցիկ և հիշարժան երեկոյի
          </SectionSubtitle>
        </RevealGroup>
      </Inner>
    </InvitationSection>
  );
}
