"use client";

import { forwardRef } from "react";
import styled from "styled-components";

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
  padding: clamp(1.5rem, 5vw, 3.5rem) clamp(1.25rem, 5vw, 3rem);
  position: relative;
`;

export const InvitationSection = forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"section">
>(function InvitationSection(props, ref) {
  return <StyledSection ref={ref} {...props} />;
});
