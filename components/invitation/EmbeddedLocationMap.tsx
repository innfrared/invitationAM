"use client";

import styled from "styled-components";

import { colors, fonts, mapStageMaxWidth } from "@/lib/theme";

export type EmbeddedLocationMapProps = {
  embedUrl: string;
  externalUrl: string;
  title: string;
};

const Root = styled.div`
  width: ${mapStageMaxWidth};
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 639px) {
    width: 100%;
  }
`;

const MapCard = styled.div`
  position: relative;
  width: 100%;
  margin-top: clamp(18px, 3.5vh, 34px);
  height: clamp(220px, 28vh, 300px);
  border-radius: 22px;
  overflow: hidden;
  border: 2px solid rgba(245, 217, 139, 0.52);
  background: rgba(5, 6, 10, 0.72);
  box-shadow:
    0 0 0 1px rgba(214, 177, 94, 0.38),
    0 0 42px rgba(245, 217, 139, 0.26),
    0 0 88px rgba(214, 177, 94, 0.14),
    0 26px 88px rgba(0, 0, 0, 0.52);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    box-shadow:
      inset 0 0 0 1px rgba(255, 241, 184, 0.18),
      inset 0 0 48px rgba(245, 217, 139, 0.06);
    z-index: 1;
  }

  @media (max-width: 639px) {
    margin-top: clamp(12px, 2.5vh, 22px);
    height: clamp(175px, 26vh, 248px);
  }
`;

const IframeClip = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
  z-index: 0;
`;

const StyledIframe = styled.iframe`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 118%;
  height: 118%;
  margin: 0;
  border: 0;
  display: block;
  transform: translate(-50%, -50%);
  filter: grayscale(0.12) contrast(0.95) brightness(0.82) saturate(0.85);
`;

const FallbackInner = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: clamp(1rem, 4vw, 1.5rem);
  text-align: center;
`;

const FallbackText = styled.p`
  margin: 0;
  max-width: 28ch;
  font-family: ${fonts.sans};
  font-size: clamp(0.95rem, 3.2vw, 1.1rem);
  font-weight: 500;
  line-height: 1.55;
  color: ${colors.cream};
  opacity: 0.92;
  text-shadow: 0 0 18px rgba(245, 217, 139, 0.08);
`;

const ExternalMapLink = styled.a`
  margin-top: clamp(12px, 2vh, 20px);
  font-family: ${fonts.sans};
  font-size: clamp(0.82rem, 2.8vw, 0.95rem);
  font-weight: 600;
  letter-spacing: 0.04em;
  color: ${colors.goldLight};
  text-decoration: underline;
  text-underline-offset: 4px;
  text-shadow: 0 0 14px rgba(214, 177, 94, 0.2);

  &:hover {
    color: ${colors.gold};
  }

  &:focus-visible {
    outline: 2px solid ${colors.goldLight};
    outline-offset: 3px;
    border-radius: 4px;
  }
`;

export function EmbeddedLocationMap({
  embedUrl,
  externalUrl,
  title,
}: EmbeddedLocationMapProps) {
  return (
    <Root>
      <MapCard>
        {embedUrl ? (
          <IframeClip>
            <StyledIframe
              src={embedUrl}
              title={title}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </IframeClip>
        ) : (
          <FallbackInner>
            <FallbackText>Քարտեզը ժամանակավորապես հասանելի չէ</FallbackText>
          </FallbackInner>
        )}
      </MapCard>
      <ExternalMapLink
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Բացել Զանգակ ռեստորանի տեղադրությունը Google Maps-ում"
      >
        Բացել Google Maps-ում
      </ExternalMapLink>
    </Root>
  );
}
