"use client";

import { useEffect, useState } from "react";

const THRESHOLD_STEPS = [
  0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95,
  1,
];

export function useActiveSection(
  scrollRoot: HTMLElement | null,
  sectionIds: readonly string[],
): number {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const root = scrollRoot;
    if (!root || sectionIds.length === 0) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const ratios = new Map<Element, number>();
    for (const el of elements) {
      ratios.set(el, 0);
    }

    const pickActive = () => {
      const qualified: { idx: number; ratio: number }[] = [];
      elements.forEach((el, idx) => {
        const r = ratios.get(el) ?? 0;
        if (r >= 0.6) qualified.push({ idx, ratio: r });
      });
      if (qualified.length > 0) {
        qualified.sort((a, b) => b.ratio - a.ratio);
        setActiveStep(qualified[0].idx);
        return;
      }
      let bestIdx = 0;
      let bestRatio = 0;
      elements.forEach((el, idx) => {
        const r = ratios.get(el) ?? 0;
        if (r > bestRatio) {
          bestRatio = r;
          bestIdx = idx;
        }
      });
      setActiveStep(bestIdx);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target, entry.intersectionRatio);
        }
        pickActive();
      },
      { root, threshold: THRESHOLD_STEPS },
    );

    for (const el of elements) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, [scrollRoot, sectionIds.join(",")]);

  return activeStep;
}
