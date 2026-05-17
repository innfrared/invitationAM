"use client";

import { useId } from "react";
import { useReducedMotion } from "framer-motion";
import styled, { keyframes } from "styled-components";

const hintPulse = keyframes`
  0%,
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 0.62;
  }
  50% {
    transform: translate3d(0, 10px, 0);
    opacity: 1;
  }
`;

const CueWrap = styled.div`
  position: absolute;
  left: 50%;
  z-index: 2;
  display: flex;
  justify-content: center;
  pointer-events: none;
  transform: translateX(-50%);
  bottom: max(
    clamp(2.75rem, 10vw, 3.5rem),
    calc(env(safe-area-inset-bottom, 0px) + 2.25rem)
  );

  @media (min-width: 400px) {
    bottom: max(
      clamp(1rem, 3.5vw, 1.75rem),
      env(safe-area-inset-bottom, 0px)
    );
  }
`;

const ScrollArrow = styled.svg<{ $paused: boolean }>`
  display: block;
  width: clamp(19px, 4.8vw, 24px);
  height: clamp(56px, 13vw, 74px);
  overflow: visible;
  filter: drop-shadow(0 0 10px rgba(245, 217, 139, 0.45))
    drop-shadow(0 0 20px rgba(214, 177, 94, 0.24));
  animation: ${hintPulse} 2.4s ease-in-out infinite;
  animation-play-state: ${(p) => (p.$paused ? "paused" : "running")};
`;

export function SectionScrollCue() {
  const reducedMotion = useReducedMotion();
  const gradientId = `scrollCueGold-${useId().replace(/:/g, "")}`;

  return (
    <CueWrap aria-hidden="true">
      <ScrollArrow
        $paused={!!reducedMotion}
        viewBox="0 0 24 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="12"
            y1="2"
            x2="12"
            y2="46"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="rgba(245, 217, 139, 0.45)" />
            <stop offset="55%" stopColor="rgba(255, 241, 184, 0.95)" />
            <stop offset="100%" stopColor="rgba(214, 177, 94, 0.88)" />
          </linearGradient>
        </defs>
        <path
          d="M12 2v30M5 32l7 10 7-10"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </ScrollArrow>
    </CueWrap>
  );
}
