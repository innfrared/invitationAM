"use client";

import { Fragment } from "react";
import styled from "styled-components";

import type { InvitationSectionMeta } from "@/components/invitation/sections";
import { colors } from "@/lib/theme";

const Wrap = styled.nav`
  position: fixed;
  z-index: 10;
  pointer-events: none;

  @media (min-width: 400px) {
    right: clamp(0.75rem, 3vw, 1.75rem);
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }

  @media (max-width: 399px) {
    left: 50%;
    bottom: max(0.75rem, env(safe-area-inset-bottom, 0px));
    transform: translateX(-50%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0;
  }
`;

const Connector = styled.div`
  flex-shrink: 0;

  @media (min-width: 400px) {
    width: 1px;
    height: 12px;
    background: linear-gradient(
      180deg,
      transparent,
      rgba(214, 177, 94, 0.22),
      transparent
    );
    opacity: 0.75;
  }

  @media (max-width: 399px) {
    width: 12px;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(214, 177, 94, 0.22),
      transparent
    );
    opacity: 0.75;
  }
`;

const Dot = styled.button<{ $state: "past" | "current" | "upcoming" }>`
  pointer-events: auto;
  flex-shrink: 0;
  padding: 0;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  background: transparent;
  display: grid;
  place-items: center;
  width: ${(p) => (p.$state === "current" ? "12px" : "8px")};
  height: ${(p) => (p.$state === "current" ? "12px" : "8px")};

  &::after {
    content: "";
    width: ${(p) => (p.$state === "current" ? "10px" : "6px")};
    height: ${(p) => (p.$state === "current" ? "10px" : "6px")};
    border-radius: 50%;
    background: ${(p) =>
      p.$state === "current"
        ? `radial-gradient(circle, ${colors.goldLight} 0%, ${colors.gold} 55%, ${colors.goldMuted} 100%)`
        : p.$state === "past"
          ? `radial-gradient(circle, ${colors.goldMuted} 0%, rgba(169, 130, 58, 0.55) 100%)`
          : `radial-gradient(circle, rgba(245, 217, 139, 0.35) 0%, rgba(169, 130, 58, 0.22) 100%)`};
    box-shadow: ${(p) =>
      p.$state === "current"
        ? `0 0 14px rgba(245, 217, 139, 0.55), 0 0 28px rgba(214, 177, 94, 0.25)`
        : p.$state === "past"
          ? `0 0 6px rgba(214, 177, 94, 0.25)`
          : `none`};
    opacity: ${(p) => (p.$state === "upcoming" ? 0.55 : 1)};
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:focus-visible {
    outline: 2px solid ${colors.goldLight};
    outline-offset: 4px;
  }

  &:hover::after {
    transform: scale(1.08);
  }
`;

type Props = {
  sections: readonly InvitationSectionMeta[];
  activeStep: number;
  onStepClick: (index: number) => void;
};

export function StepIndicator({ sections, activeStep, onStepClick }: Props) {
  return (
    <Wrap aria-label="Տոնական տեսարանների ուղեցույց">
      {sections.map((section, index) => {
        const state =
          index === activeStep
            ? "current"
            : index < activeStep
              ? "past"
              : "upcoming";
        return (
          <Fragment key={section.id}>
            <Dot
              type="button"
              aria-label={section.label}
              aria-current={state === "current" ? "step" : undefined}
              $state={state}
              onClick={() => onStepClick(index)}
            />
            {index < sections.length - 1 ? (
              <Connector aria-hidden />
            ) : null}
          </Fragment>
        );
      })}
    </Wrap>
  );
}
