"use client";

import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";

import { colors, motion as motionTheme } from "@/lib/theme";

const shimmer = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
`;

const Outer = styled(motion.div)`
  position: relative;
  width: min(94vw, 560px);
  margin: 0 auto;
  padding: 1px;
  border-radius: 24px;
  background: linear-gradient(
    135deg,
    rgba(214, 177, 94, 0.5) 0%,
    rgba(169, 130, 58, 0.2) 25%,
    rgba(214, 177, 94, 0.35) 50%,
    rgba(245, 217, 139, 0.25) 75%,
    rgba(214, 177, 94, 0.45) 100%
  );
  background-size: 200% 200%;
  animation: ${shimmer} 14s ease-in-out infinite;
  box-shadow:
    0 0 42px rgba(214, 177, 94, 0.14),
    0 0 1px rgba(245, 217, 139, 0.35),
    inset 0 0 24px rgba(214, 177, 94, 0.06);
`;

const Inner = styled.div`
  position: relative;
  border-radius: 23px;
  padding: clamp(1.5rem, 5vw, 2.25rem);
  background: ${colors.card};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid ${colors.cardBorder};
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    0 20px 50px rgba(0, 0, 0, 0.45);
`;

const CardBody = styled.div`
  position: relative;
  z-index: 1;
`;

const InnerGlow = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 23px;
  pointer-events: none;
  background: radial-gradient(
    ellipse at 50% 0%,
    rgba(214, 177, 94, 0.09) 0%,
    transparent 55%
  );
`;

type Props = {
  reducedMotion: boolean;
  children: React.ReactNode;
};

export function InvitationCard({ reducedMotion, children }: Props) {
  return (
    <Outer
      initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: reducedMotion ? 0 : 0.08,
        duration: reducedMotion ? 0.35 : motionTheme.duration.slow,
        ease: motionTheme.ease,
      }}
      style={
        reducedMotion
          ? { animation: "none", backgroundSize: "100% 100%" }
          : undefined
      }
    >
      <Inner>
        <InnerGlow />
        <CardBody>{children}</CardBody>
      </Inner>
    </Outer>
  );
}
