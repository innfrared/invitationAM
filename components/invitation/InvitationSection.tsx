"use client";

import { forwardRef } from "react";
import styled from "styled-components";

import { SectionScrollCue } from "@/components/invitation/SectionScrollCue";

const StyledSection = styled.section`
  box-sizing: border-box;
  min-height: 100vh;
  min-height: 100dvh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: clamp(1.5rem, 5vw, 3.5rem);
  padding-inline: clamp(1.25rem, 5vw, 3rem);
  padding-bottom: max(
    clamp(3.5rem, 14vmin, 9rem),
    calc(env(safe-area-inset-bottom, 0px) + clamp(2.75rem, 10vmin, 6rem))
  );
  position: relative;
`;

type InvitationSectionProps = React.ComponentPropsWithoutRef<"section"> & {
  hideScrollCue?: boolean;
};

export const InvitationSection = forwardRef<HTMLElement, InvitationSectionProps>(
  function InvitationSection({ children, hideScrollCue = false, ...props }, ref) {
    return (
      <StyledSection ref={ref} {...props}>
        {children}
        {!hideScrollCue ? <SectionScrollCue /> : null}
      </StyledSection>
    );
  },
);
