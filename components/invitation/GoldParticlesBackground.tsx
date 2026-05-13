"use client";

import { useMemo } from "react";
import { keyframes } from "styled-components";
import styled from "styled-components";

import { colors } from "@/lib/theme";

function mulberry32(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type ParticleConfig = {
  id: number;
  leftPct: number;
  topPct: number;
  sizePx: number;
  durationSec: number;
  delaySec: number;
  driftY: number;
  driftX: number;
  opacityMin: number;
  opacityMax: number;
};

function buildParticles(rand: () => number): ParticleConfig[] {
  const count = 45 + Math.floor(rand() * 26);
  const out: ParticleConfig[] = [];
  for (let i = 0; i < count; i += 1) {
    const leftPct = 50 + (rand() - 0.5) * 36;
    const bottomBand = i > count * 0.82;
    const topPct = bottomBand ? 80 + rand() * 18 : rand() * 78 + 4;
    const sizePx = 1 + Math.floor(rand() * 4);
    const durationSec = 7 + rand() * 11;
    const delaySec = -(rand() * durationSec);
    const driftY = 20 + rand() * 60;
    const driftX = -10 + rand() * 20;
    const opacityMin = 0.25 + rand() * 0.15;
    const opacityMax = 0.75 + rand() * 0.15;
    out.push({
      id: i,
      leftPct,
      topPct,
      sizePx,
      durationSec,
      delaySec,
      driftY,
      driftX,
      opacityMin,
      opacityMax,
    });
  }
  return out;
}

const dustDrift = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
    opacity: var(--o0);
  }
  40% {
    transform: translate3d(calc(var(--dx) * 0.45), calc(var(--dy) * 0.38), 0);
    opacity: var(--o1);
  }
  72% {
    transform: translate3d(calc(var(--dx) * 0.82), calc(var(--dy) * 0.68), 0);
    opacity: calc(var(--o0) + (var(--o1) - var(--o0)) * 0.55);
  }
  100% {
    transform: translate3d(var(--dx), var(--dy), 0);
    opacity: var(--o0);
  }
`;

const Root = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
`;

const Base = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    165deg,
    ${colors.stageBlack} 0%,
    ${colors.navyDeep} 42%,
    ${colors.burgundyDeep} 100%
  );
`;

const Spotlight = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 55% 48% at 50% 0%,
    rgba(245, 217, 139, 0.14) 0%,
    rgba(214, 177, 94, 0.06) 28%,
    transparent 62%
  );
`;

const Vignette = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 32%,
    rgba(0, 0, 0, 0.52) 100%
  );
`;

const BottomPool = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 85% 42% at 50% 100%,
    rgba(214, 177, 94, 0.09) 0%,
    rgba(169, 130, 58, 0.04) 35%,
    transparent 70%
  );
`;

const ShimmerSide = styled.div<{ $side: "left" | "right" }>`
  position: absolute;
  top: 12%;
  bottom: 18%;
  width: 1px;
  ${(p) => (p.$side === "left" ? "left: 11%;" : "right: 11%;")}
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(245, 217, 139, 0.07) 22%,
    rgba(214, 177, 94, 0.05) 50%,
    rgba(245, 217, 139, 0.06) 78%,
    transparent 100%
  );
  opacity: 0.85;
  filter: blur(0.5px);
`;

const ParticleDot = styled.span<{ $size: number; $paused: boolean }>`
  position: absolute;
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  margin-left: ${(p) => -p.$size / 2}px;
  margin-top: ${(p) => -p.$size / 2}px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(245, 217, 139, 0.65) 0%,
    rgba(214, 177, 94, 0.28) 60%,
    transparent 100%
  );
  box-shadow: 0 0 ${(p) => Math.max(4, p.$size * 2)}px rgba(214, 177, 94, 0.18);
  animation-name: ${dustDrift};
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: var(--dur);
  animation-delay: var(--delay);
  animation-play-state: ${(p) => (p.$paused ? "paused" : "running")};
`;

type Props = {
  reducedMotion: boolean;
};

export function GoldParticlesBackground({ reducedMotion }: Props) {
  const particles = useMemo(() => buildParticles(mulberry32(0x50d501)), []);

  return (
    <Root aria-hidden="true">
      <Base />
      <Spotlight />
      <Vignette />
      <BottomPool />
      <ShimmerSide $side="left" aria-hidden />
      <ShimmerSide $side="right" aria-hidden />
      {particles.map((p) => (
        <ParticleDot
          key={p.id}
          aria-hidden
          $size={p.sizePx}
          $paused={reducedMotion}
          style={
            {
              left: `${p.leftPct}%`,
              top: `${p.topPct}%`,
              "--dx": `${p.driftX}px`,
              "--dy": `${p.driftY}px`,
              "--o0": p.opacityMin,
              "--o1": p.opacityMax,
              "--dur": `${p.durationSec}s`,
              "--delay": `${p.delaySec}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </Root>
  );
}
