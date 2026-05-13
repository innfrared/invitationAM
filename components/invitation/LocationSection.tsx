"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

import { EmbeddedLocationMap } from "@/components/invitation/EmbeddedLocationMap";
import {
  EyebrowDivider,
  EyebrowLabel,
  EyebrowStack,
  SectionSubtitle,
  SectionTitle,
} from "@/components/invitation/InvitationTypography";
import { InvitationSection } from "@/components/invitation/InvitationSection";
import {
  ceremonyChildVariants,
  staggerParentVariants,
} from "@/components/invitation/RevealText";
import {
  ZANGAK_MAP_IFRAME_TITLE,
  ZANGAK_MAPS_EXTERNAL_URL,
  ZANGAK_RESTAURANT_EMBED_URL,
} from "@/lib/googleMapsEmbed";
import {
  contentMaxWidth,
  mapStageMaxWidth,
  motion as motionCfg,
} from "@/lib/theme";

const Anchor = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
      ellipse 92% 58% at 50% 92%,
      rgba(245, 217, 139, 0.12) 0%,
      rgba(214, 177, 94, 0.07) 38%,
      transparent 72%
    ),
    radial-gradient(
      ellipse 78% 46% at 50% 42%,
      rgba(214, 177, 94, 0.06) 0%,
      transparent 68%
    );
`;

const Inner = styled(motion.div)`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: ${contentMaxWidth};
  margin: 0 auto;
  text-align: center;
  padding-top: clamp(0.25rem, 1.5vh, 0.75rem);
  padding-bottom: clamp(0.25rem, 1.5vh, 0.75rem);

  @media (max-width: 639px) {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const LocationVenueTitle = styled(SectionTitle)`
  margin-bottom: clamp(0.45rem, 2vw, 0.75rem);
  font-size: clamp(3rem, 11vw, 6.65rem);

  @media (max-width: 639px) {
    margin-bottom: clamp(0.35rem, 1.5vw, 0.55rem);
  }
`;

const LocationSupporting = styled(SectionSubtitle)`
  margin-bottom: 0;
`;

const MapBlock = styled(motion.div)`
  width: 100%;
  max-width: ${mapStageMaxWidth};
  margin-left: auto;
  margin-right: auto;
`;

type Props = {
  reducedMotion: boolean;
};

export function LocationSection({ reducedMotion }: Props) {
  const item = ceremonyChildVariants(reducedMotion);
  const parent = staggerParentVariants(reducedMotion);

  return (
    <InvitationSection id="location" aria-labelledby="location-heading">
      <Anchor aria-hidden />
      <Inner
        variants={parent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: motionCfg.scroll.viewportAmount }}
      >
        <EyebrowStack variants={item}>
          <EyebrowLabel id="location-heading">Վայրը</EyebrowLabel>
          <EyebrowDivider aria-hidden />
        </EyebrowStack>
        <LocationVenueTitle variants={item}>Զանգակ ռեստորան</LocationVenueTitle>
        <LocationSupporting variants={item}>
          Երեկո՝ լի ջերմությամբ,
          <br />
          հիշողություններով և ուրախությամբ
        </LocationSupporting>
        <MapBlock variants={item}>
          <EmbeddedLocationMap
            embedUrl={ZANGAK_RESTAURANT_EMBED_URL}
            externalUrl={ZANGAK_MAPS_EXTERNAL_URL}
            title={ZANGAK_MAP_IFRAME_TITLE}
          />
        </MapBlock>
      </Inner>
    </InvitationSection>
  );
}
