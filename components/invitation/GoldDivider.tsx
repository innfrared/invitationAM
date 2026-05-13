"use client";

import styled from "styled-components";

import { colors } from "@/lib/theme";

const Line = styled.div`
  width: clamp(120px, 30vw, 280px);
  height: 1px;
  margin: clamp(18px, 3vh, 24px) auto;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(245, 217, 139, 0.35) 15%,
    #f5d98b 50%,
    rgba(245, 217, 139, 0.35) 85%,
    transparent 100%
  );
  box-shadow:
    0 0 16px rgba(245, 217, 139, 0.35),
    0 0 28px rgba(214, 177, 94, 0.18);
  position: relative;
`;

const Gem = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 6px;
  height: 6px;
  transform: translate(-50%, -50%) rotate(45deg);
  border-radius: 1px;
  background: radial-gradient(
    circle,
    #fff1b8 0%,
    ${colors.goldLight} 45%,
    ${colors.gold} 100%
  );
  box-shadow:
    0 0 14px rgba(245, 217, 139, 0.65),
    0 0 22px rgba(214, 177, 94, 0.35);
`;

type Props = {
  className?: string;
  showGem?: boolean;
};

export function GoldDivider({ className, showGem = true }: Props) {
  return (
    <Line className={className} aria-hidden>
      {showGem ? <Gem /> : null}
    </Line>
  );
}
