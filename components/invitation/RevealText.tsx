"use client";

import { motion, type Variants } from "framer-motion";
import styled from "styled-components";

import { motion as motionCfg } from "@/lib/theme";

const defaultViewport = {
  once: true,
  amount: motionCfg.scroll.viewportAmount,
} as const;

export function staggerParentVariants(reducedMotion: boolean): Variants {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reducedMotion ? 0 : motionCfg.scroll.stagger,
        delayChildren: reducedMotion ? 0 : 0.12,
      },
    },
  };
}

export function ceremonyChildVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          duration: motionCfg.duration.fast,
          ease: motionCfg.ease,
        },
      },
    };
  }
  return {
    hidden: {
      opacity: 0,
      y: 42,
      scale: 0.94,
      filter: "blur(10px)",
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: motionCfg.scroll.sectionDuration,
        ease: motionCfg.ease,
      },
    },
  };
}

export function staggerChildVariants(reducedMotion: boolean): Variants {
  return ceremonyChildVariants(reducedMotion);
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
