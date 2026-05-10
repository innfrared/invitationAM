"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

import { InvitationSection } from "@/components/invitation/InvitationSection";
import {
  RevealGroup,
  staggerChildVariants,
} from "@/components/invitation/RevealText";
import { colors, contentMaxWidth, fonts } from "@/lib/theme";

const Inner = styled.div`
  width: 100%;
  max-width: ${contentMaxWidth};
  margin: 0 auto;
  text-align: center;
`;

const LineA = styled(motion.p)`
  margin: 0 0 clamp(0.75rem, 2.5vw, 1.25rem);
  font-family: ${fonts.serif};
  font-size: clamp(1.85rem, 6.5vw, 3.15rem);
  font-weight: 600;
  line-height: 1.22;
  color: ${colors.cream};
`;

const LineB = styled(motion.p)`
  margin: 0;
  font-family: ${fonts.serif};
  font-size: clamp(1.4rem, 5vw, 2.55rem);
  font-weight: 400;
  line-height: 1.38;
  color: rgba(245, 240, 230, 0.78);
`;

type Props = {
  reducedMotion: boolean;
};

export function InvitationRevealSection({ reducedMotion }: Props) {
  const v = staggerChildVariants(reducedMotion);

  return (
    <InvitationSection aria-label="Հրավեր">
      <Inner>
        <RevealGroup reducedMotion={reducedMotion}>
          <LineA variants={v}>Սիրով հրավիրում ենք Ձեզ</LineA>
          <LineB variants={v}>
            մասնակցելու անմոռանալի երեկոյի
          </LineB>
        </RevealGroup>
      </Inner>
    </InvitationSection>
  );
}
