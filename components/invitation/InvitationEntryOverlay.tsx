"use client";

import { useEffect, useId, useRef } from "react";
import styled, { keyframes } from "styled-components";

import { colors, fonts } from "@/lib/theme";

const hintPulse = keyframes`
  0%,
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 0.7;
  }
  50% {
    transform: translate3d(0, 8px, 0);
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(0.75rem, 2.5vw, 1rem);
  padding: clamp(1.5rem, 6vw, 2.5rem);
  cursor: pointer;
  touch-action: manipulation;
  background: ${colors.ink};
  contain: strict;
  -webkit-tap-highlight-color: transparent;
`;

const Title = styled.span`
  font-family: ${fonts.serif};
  font-size: clamp(1.65rem, 5.2vw, 2.35rem);
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: 0.02em;
  color: #f5d98b;
  text-shadow: 0 0 22px rgba(245, 217, 139, 0.35);
  pointer-events: none;
`;

const EntryArrow = styled.svg<{ $paused: boolean }>`
  display: block;
  width: clamp(19px, 4.8vw, 24px);
  height: clamp(56px, 13vw, 74px);
  pointer-events: none;
  animation: ${hintPulse} 2.4s ease-in-out infinite;
  animation-play-state: ${(p) => (p.$paused ? "paused" : "running")};
`;

type Props = {
  reducedMotion: boolean;
  onOpen: () => void;
};

export function InvitationEntryOverlay({ reducedMotion, onOpen }: Props) {
  const gradientId = `entryCueGold-${useId().replace(/:/g, "")}`;
  const openedRef = useRef(false);

  useEffect(() => {
    const open = () => {
      if (openedRef.current) return;
      openedRef.current = true;
      onOpen();
    };

    const opts: AddEventListenerOptions = { capture: true, passive: true };
    window.addEventListener("pointerdown", open, opts);
    window.addEventListener("touchstart", open, opts);
    window.addEventListener("wheel", open, opts);
    window.addEventListener("touchmove", open, opts);
    window.addEventListener("scroll", open, opts);
    window.addEventListener("keydown", open, opts);

    return () => {
      window.removeEventListener("pointerdown", open, opts);
      window.removeEventListener("touchstart", open, opts);
      window.removeEventListener("wheel", open, opts);
      window.removeEventListener("touchmove", open, opts);
      window.removeEventListener("scroll", open, opts);
      window.removeEventListener("keydown", open, opts);
    };
  }, [onOpen]);

  return (
    <Overlay role="button" tabIndex={-1} aria-label="Բացել հրավերը">
      <Title>Բացե՞լ հրավերը</Title>
      <EntryArrow
        $paused={reducedMotion}
        viewBox="0 0 24 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
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
      </EntryArrow>
    </Overlay>
  );
}
