"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { colors } from "@/lib/theme";

const INVITE_SONG_SRC = "/invitesong.mp3";

const ToggleBtn = styled.button`
  position: fixed;
  z-index: 11;
  right: max(clamp(1.35rem, 5vw, 2rem), env(safe-area-inset-right, 0px));
  bottom: max(
    clamp(0.85rem, 3.2vw, 1.15rem),
    calc(env(safe-area-inset-bottom, 0px) + 0.35rem)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(40px, 10vw, 44px);
  height: clamp(40px, 10vw, 44px);
  padding: 0;
  border: 1px solid rgba(245, 217, 139, 0.48);
  border-radius: 50%;
  cursor: pointer;
  color: ${colors.goldLight};
  background: rgba(6, 5, 10, 0.72);
  box-shadow:
    0 0 18px rgba(245, 217, 139, 0.18),
    0 6px 20px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  &:hover {
    border-color: rgba(255, 241, 184, 0.72);
    color: #fff1b8;
    box-shadow:
      0 0 24px rgba(245, 217, 139, 0.28),
      0 8px 24px rgba(0, 0, 0, 0.5);
  }

  &:focus-visible {
    outline: 2px solid ${colors.gold};
    outline-offset: 3px;
  }

  @media (max-width: 399px) {
    bottom: max(
      clamp(0.85rem, 3.2vw, 1.15rem),
      calc(env(safe-area-inset-bottom, 0px) + 0.35rem)
    );
  }
`;

const Icon = styled.svg`
  width: clamp(18px, 4.5vw, 20px);
  height: clamp(18px, 4.5vw, 20px);
  display: block;
`;

function SpeakerOnIcon() {
  return (
    <Icon viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M11 5 6 9H3v6h3l5 4V5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 8.5a5 5 0 0 1 0 7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M18 6a8.5 8.5 0 0 1 0 12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </Icon>
  );
}

function SpeakerMutedIcon() {
  return (
    <Icon viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M11 5 6 9H3v6h3l5 4V5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="m16 9 5 6M21 9l-5 6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </Icon>
  );
}

type Props = {
  inviteOpened: boolean;
};

export function InvitationBackgroundMusic({ inviteOpened }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);

  const startPlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || audio.muted) return;
    try {
      await audio.play();
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.82;
  }, []);

  useEffect(() => {
    if (!inviteOpened) return;
    void startPlayback();
  }, [inviteOpened, startPlayback]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextMuted = !audio.muted;
    audio.muted = nextMuted;
    setMuted(nextMuted);

    if (!nextMuted) {
      void audio.play().catch(() => {
        /* ignore */
      });
    }
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src={INVITE_SONG_SRC}
        loop
        preload="auto"
        playsInline
      />
      {inviteOpened ? (
        <ToggleBtn
          type="button"
          onClick={toggleMute}
          aria-pressed={muted}
          aria-label={muted ? "Միացնել երաժշտությունը" : "Անջատել երաժշտությունը"}
          title={muted ? "Միացնել երաժշտությունը" : "Անջատել երաժշտությունը"}
        >
          {muted ? <SpeakerMutedIcon /> : <SpeakerOnIcon />}
        </ToggleBtn>
      ) : null}
    </>
  );
}
