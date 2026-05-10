"use client";

import { motion } from "framer-motion";
import styled from "styled-components";

import { colors, fonts, motion as motionTheme } from "@/lib/theme";

const Section = styled.section`
  text-align: center;
`;

const Label = styled(motion.h1)`
  margin: 0 0 0.75rem;
  font-family: ${fonts.serif};
  font-size: clamp(0.72rem, 2.6vw, 0.82rem);
  font-weight: 500;
  letter-spacing: 0.42em;
  text-transform: uppercase;
  color: ${colors.goldLight};
  text-shadow: 0 0 20px rgba(214, 177, 94, 0.25);
`;

const Greeting = styled(motion.p)`
  margin: 0 0 1.1rem;
  font-family: ${fonts.serif};
  font-size: clamp(1.35rem, 4.2vw, 1.65rem);
  font-weight: 500;
  font-style: italic;
  color: ${colors.gold};
`;

const Body = styled(motion.p)`
  margin: 0 auto 0.45rem;
  max-width: 32rem;
  font-family: ${fonts.sans};
  font-size: clamp(0.95rem, 3.2vw, 1.05rem);
  font-weight: 400;
  line-height: 1.65;
  color: rgba(245, 240, 230, 0.88);
`;

const DateBlock = styled(motion.div)`
  margin: clamp(1.1rem, 3vw, 1.4rem) 0 0.65rem;
  font-family: ${fonts.serif};
  font-size: clamp(1.1rem, 3.4vw, 1.35rem);
  font-weight: 600;
  letter-spacing: 0.04em;
  background: linear-gradient(
    105deg,
    ${colors.goldMuted} 0%,
    ${colors.goldLight} 40%,
    ${colors.gold} 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 14px rgba(214, 177, 94, 0.35));
`;

const LocationName = styled(motion.p)`
  margin: 0 0 1.15rem;
  font-family: ${fonts.serif};
  font-size: clamp(1.05rem, 3.2vw, 1.2rem);
  font-weight: 500;
  color: rgba(245, 240, 230, 0.92);
`;

const LocationLabel = styled.span`
  display: block;
  margin-bottom: 0.35rem;
  font-family: ${fonts.sans};
  font-size: clamp(0.68rem, 2.4vw, 0.74rem);
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${colors.goldMuted};
`;

const Footer = styled(motion.p)`
  margin: 0;
  font-family: ${fonts.serif};
  font-size: clamp(0.88rem, 2.8vw, 0.98rem);
  font-style: italic;
  color: rgba(214, 177, 94, 0.55);
`;

type Props = {
  reducedMotion: boolean;
};

function transitionFor(
  reducedMotion: boolean,
  delaySec: number,
  duration: number = motionTheme.duration.medium,
) {
  return {
    delay: reducedMotion ? Math.min(delaySec * 0.15, 0.4) : delaySec,
    duration: reducedMotion ? motionTheme.duration.fast * 0.65 : duration,
    ease: motionTheme.ease as [number, number, number, number],
  };
}

export function InvitationText({ reducedMotion }: Props) {
  const rm = reducedMotion;
  const t = motionTheme.invite;

  return (
    <Section aria-labelledby="invitation-title">
      <Label
        id="invitation-title"
        initial={{ opacity: 0, y: rm ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitionFor(rm, t.label)}
      >
        50th Birthday Celebration
      </Label>
      <Greeting
        initial={{ opacity: 0, y: rm ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitionFor(rm, t.greeting)}
      >
        Dear friend,
      </Greeting>
      <Body
        initial={{ opacity: 0, y: rm ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitionFor(rm, t.bodyLine0, motionTheme.duration.slow)}
      >
        You are warmly invited on June 27, 2026
      </Body>
      <Body
        initial={{ opacity: 0, y: rm ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitionFor(rm, t.bodyLine1, motionTheme.duration.slow)}
      >
        to celebrate the 50th birthday of Arthur.
      </Body>
      <DateBlock
        initial={{ opacity: 0, scale: rm ? 1 : 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={transitionFor(rm, t.date, motionTheme.duration.medium)}
      >
        June 27, 2026
      </DateBlock>
      <LocationName
        initial={{ opacity: 0, y: rm ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitionFor(rm, t.location)}
      >
        <LocationLabel>Venue</LocationLabel>
        Ararat Restaurant
      </LocationName>
      <Footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={transitionFor(rm, t.footer, motionTheme.duration.fast)}
      >
        With love and warm wishes
      </Footer>
    </Section>
  );
}
