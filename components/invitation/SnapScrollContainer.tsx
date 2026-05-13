"use client";

import { forwardRef } from "react";
import styled from "styled-components";

const StyledMain = styled.main`
  position: relative;
  z-index: 2;
  height: 100vh;
  height: 100dvh;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overscroll-behavior-y: contain;
  -webkit-overflow-scrolling: touch;
`;

export const SnapScrollContainer = forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"main">
>(function SnapScrollContainer(props, ref) {
  return <StyledMain ref={ref} {...props} />;
});
