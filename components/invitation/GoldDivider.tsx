"use client";

import styled from "styled-components";

import { colors } from "@/lib/theme";

const Line = styled.div`
  width: clamp(160px, 22vw, 260px);
  height: 1px;
  margin-left: auto;
  margin-right: auto;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(214, 177, 94, 0.15) 12%,
    ${colors.goldMuted} 42%,
    ${colors.goldLight} 50%,
    ${colors.goldMuted} 58%,
    rgba(214, 177, 94, 0.15) 88%,
    transparent 100%
  );
  box-shadow: 0 0 12px rgba(214, 177, 94, 0.15);
  position: relative;
`;

const Gem = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 5px;
  height: 5px;
  transform: translate(-50%, -50%) rotate(45deg);
  border-radius: 1px;
  background: radial-gradient(
    circle,
    ${colors.goldLight} 0%,
    ${colors.gold} 70%,
    transparent 100%
  );
  box-shadow: 0 0 10px rgba(245, 217, 139, 0.35);
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
