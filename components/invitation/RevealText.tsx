"use client";

import { motion, type Variants } from "framer-motion";
import styled from "styled-components";

import { motion as motionCfg } from "@/lib/theme";

const defaultViewport = {
  once: true,
  amount: motionCfg.scroll.viewportAmount,
} as const;

export function staggerParentVariants(
  reducedMotion: boolean,
): Variants {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reducedMotion ? 0 : motionCfg.scroll.stagger,
        delayChildren: reducedMotion ? 0 : 0.06,
      },
    },
  };
}

export function staggerChildVariants(reducedMotion: boolean): Variants {
  return {
    hidden: {
      opacity: 0,
      y: reducedMotion ? 0 : 28,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion
          ? motionCfg.duration.fast
          : motionCfg.scroll.sectionDuration,
        ease: motionCfg.ease,
      },
    },
  };
}

type RevealGroupProps = {
  reducedMotion: boolean;
  children: React.ReactNode;
  className?: string;
  viewport?: typeof defaultViewport;
};

const Group = styled(motion.div)``;

export function RevealGroup({
  reducedMotion,
  children,
  className,
  viewport = defaultViewport,
}: RevealGroupProps) {
  return (
    <Group
      className={className}
      variants={staggerParentVariants(reducedMotion)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {children}
    </Group>
  );
}
