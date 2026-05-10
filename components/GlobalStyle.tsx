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
  }

  body {
    margin: 0;
    min-height: 100dvh;
    background: ${colors.ink};
    color: rgba(245, 240, 230, 0.92);
    font-family: var(--font-dm-sans), system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button {
    font: inherit;
  }
`;
