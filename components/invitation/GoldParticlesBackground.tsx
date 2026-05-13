"use client";

import type { CSSProperties } from "react";
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

type DustParticle = {
  id: string;
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

type BokehParticle = {
  id: string;
  leftPct: number;
  topPct: number;
  sizePx: number;
  durationSec: number;
  delaySec: number;
};

function buildDust(rand: () => number): DustParticle[] {
  const count = 56 + Math.floor(rand() * 24);
  const out: DustParticle[] = [];
  for (let i = 0; i < count; i += 1) {
    const roll = rand();
    const sizePx =
      roll < 0.55 ? 1 + Math.floor(rand() * 2) : 3 + Math.floor(rand() * 3);
    const leftPct = 50 + (rand() - 0.5) * 26;
    const bottomHeavy = i > count * 0.76;
    const topPct = bottomHeavy ? 74 + rand() * 24 : rand() * 72 + 3;
    const durationSec = 7 + rand() * 11;
    const delaySec = -(rand() * durationSec);
    const driftY = 22 + rand() * 58;
    const driftX = -12 + rand() * 24;
    const opacityMin = 0.35 + rand() * 0.12;
    const opacityMax = 0.82 + rand() * 0.12;
    out.push({
      id: `d-${i}`,
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

function buildBokeh(rand: () => number): BokehParticle[] {
  const count = 11 + Math.floor(rand() * 5);
  const out: BokehParticle[] = [];
  for (let i = 0; i < count; i += 1) {
    out.push({
      id: `b-${i}`,
      leftPct: 48 + (rand() - 0.5) * 28,
      topPct: 18 + rand() * 62,
      sizePx: 8 + Math.floor(rand() * 11),
      durationSec: 12 + rand() * 10,
      delaySec: -(rand() * 14),
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

const bokehPulse = keyframes`
  0%,
  100% {
    opacity: 0.32;
    transform: translate3d(-50%, -50%, 0) scale(1);
  }
  50% {
    opacity: 0.55;
    transform: translate3d(-50%, -50%, 0) scale(1.06);
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
  background:
    radial-gradient(ellipse 140% 100% at 50% -8%, #050508 0%, transparent 42%),
    linear-gradient(
      165deg,
      ${colors.stageBlack} 0%,
      #060914 38%,
      ${colors.navyDeep} 48%,
      ${colors.burgundyDeep} 100%
    );
`;

const Spotlight = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 58% 52% at 50% 0%,
    rgba(245, 217, 139, 0.28) 0%,
    rgba(214, 177, 94, 0.14) 26%,
    rgba(169, 130, 58, 0.05) 48%,
    transparent 64%
  );
`;

const CenterWash = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 56% 58% at 50% 46%,
    rgba(245, 217, 139, 0.11) 0%,
    rgba(214, 177, 94, 0.05) 42%,
    transparent 68%
  );
`;

const BottomPool = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 92% 48% at 50% 100%,
    rgba(214, 177, 94, 0.15) 0%,
    rgba(169, 130, 58, 0.08) 38%,
    rgba(22, 8, 14, 0.35) 62%,
    transparent 78%
  );
`;

const Vignette = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 22%,
    rgba(0, 0, 0, 0.38) 55%,
    rgba(0, 0, 0, 0.68) 100%
  );
`;

const ShimmerSide = styled.div<{ $side: "left" | "right" }>`
  position: absolute;
  top: 10%;
  bottom: 14%;
  width: 2px;
  ${(p) => (p.$side === "left" ? "left: 9%;" : "right: 9%;")}
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(245, 217, 139, 0.14) 18%,
    rgba(255, 241, 184, 0.18) 48%,
    rgba(214, 177, 94, 0.12) 82%,
    transparent 100%
  );
  opacity: 0.95;
  filter: blur(1px);
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
    rgba(255, 241, 184, 0.85) 0%,
    rgba(245, 217, 139, 0.55) 38%,
    rgba(214, 177, 94, 0.28) 72%,
    transparent 100%
  );
  box-shadow: 0 0 ${(p) => Math.max(10, p.$size * 2.5)}px
    rgba(245, 217, 139, 0.45);
  animation-name: ${dustDrift};
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: var(--dur);
  animation-delay: var(--delay);
  animation-play-state: ${(p) => (p.$paused ? "paused" : "running")};
`;

const BokehOrb = styled.span<{ $size: number; $paused: boolean }>`
  position: absolute;
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  margin: 0;
  border-radius: 50%;
  transform: translate3d(-50%, -50%, 0);
  background: radial-gradient(
    circle,
    rgba(255, 241, 184, 0.42) 0%,
    rgba(245, 217, 139, 0.22) 38%,
    rgba(214, 177, 94, 0.08) 62%,
    transparent 78%
  );
  filter: blur(2px);
  box-shadow:
    0 0 28px rgba(245, 217, 139, 0.35),
    0 0 52px rgba(214, 177, 94, 0.18);
  animation-name: ${bokehPulse};
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: var(--bdur);
  animation-delay: var(--bdelay);
  animation-play-state: ${(p) => (p.$paused ? "paused" : "running")};
`;

type Props = {
  reducedMotion: boolean;
};

export function GoldParticlesBackground({ reducedMotion }: Props) {
  const dust = useMemo(() => buildDust(mulberry32(0x50d501)), []);
  const bokeh = useMemo(() => buildBokeh(mulberry32(0x71bb)), []);

  return (
    <Root aria-hidden="true">
      <Base />
      <Spotlight />
      <CenterWash />
      <BottomPool />
      <Vignette />
      <ShimmerSide $side="left" aria-hidden />
      <ShimmerSide $side="right" aria-hidden />
      {dust.map((p) => (
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
            } as CSSProperties
          }
        />
      ))}
      {bokeh.map((p) => (
        <BokehOrb
          key={p.id}
          aria-hidden
          $size={p.sizePx}
          $paused={reducedMotion}
          style={
            {
              left: `${p.leftPct}%`,
              top: `${p.topPct}%`,
              "--bdur": `${p.durationSec}s`,
              "--bdelay": `${p.delaySec}s`,
            } as CSSProperties
          }
        />
      ))}
    </Root>
  );
}
