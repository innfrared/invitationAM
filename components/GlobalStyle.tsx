"use client";

import { createGlobalStyle } from "styled-components";

import { colors } from "@/lib/theme";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    -webkit-text-size-adjust: 100%;
    height: 100%;
  }

  body {
    margin: 0;
    height: 100%;
    max-height: 100%;
    overflow: hidden;
    background: ${colors.ink};
    color: ${colors.cream};
    font-family: var(--font-arm-sans), "Noto Sans Armenian", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button {
    font: inherit;
  }
`;
