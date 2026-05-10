"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import styled from "styled-components";

const Layer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
`;

const Spark = styled(motion.span)`
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(245, 217, 139, 0.95) 0%,
    rgba(214, 177, 94, 0.45) 55%,
    transparent 70%
  );
  box-shadow: 0 0 6px rgba(245, 217, 139, 0.4);
`;

const Dust = styled(motion.span)`
  position: absolute;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: rgba(214, 177, 94, 0.25);
  filter: blur(0.5px);
`;

type Particle = {
  id: number;
  left: string;
  top: string;
  size: "spark" | "dust";
  delay: number;
  duration: number;
  y: number;
};

function buildParticles(): Particle[] {
  const out: Particle[] = [];
  let id = 0;
  for (let i = 0; i < 14; i += 1) {
    out.push({
      id: id++,
      left: `${8 + ((i * 17) % 84)}%`,
      top: `${10 + ((i * 23) % 75)}%`,
      size: i % 3 === 0 ? "spark" : "dust",
      delay: i * 0.12,
      duration: 8 + (i % 5) * 1.4,
      y: 12 + (i % 7) * 6,
    });
  }
  return out;
}

type Props = {
  reducedMotion: boolean;
};

export function FloatingParticles({ reducedMotion }: Props) {
  const particles = useMemo(() => buildParticles(), []);

  if (reducedMotion) {
    return null;
  }

  return (
    <Layer aria-hidden="true">
      {particles.map((p) => {
        const Cmp = p.size === "spark" ? Spark : Dust;
        return (
          <Cmp
            key={p.id}
            style={{ left: p.left, top: p.top }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.15, 0.75, 0.2, 0.55, 0.15],
              y: [0, -p.y, -p.y * 0.4, -p.y * 1.1],
            }}
            transition={{
              opacity: {
                duration: p.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              },
              y: {
                duration: p.duration * 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              },
            }}
          />
        );
      })}
    </Layer>
  );
}
