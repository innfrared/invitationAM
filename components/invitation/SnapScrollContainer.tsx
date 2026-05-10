"use client";

import styled from "styled-components";

export const SnapScrollContainer = styled.main`
  position: relative;
  z-index: 2;
  height: 100vh;
  height: 100dvh;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
`;
