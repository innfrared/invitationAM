"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";

import { ConfirmationMessage } from "@/components/invitation/ConfirmationMessage";
import {
  RSVPQuestion,
  SectionSubtitle,
} from "@/components/invitation/InvitationTypography";
import { InvitationSection } from "@/components/invitation/InvitationSection";
import { RSVPButtons } from "@/components/invitation/RSVPButtons";
import {
  ceremonyChildVariants,
  staggerParentVariants,
} from "@/components/invitation/RevealText";
import { RSVP_SAVE_ERROR } from "@/lib/rsvp/messages";
import { resolveRSVPGroup } from "@/lib/rsvp/resolveGroup";
import {
  getStoredResponseForGroup,
  saveStoredResponseForGroup,
} from "@/lib/rsvp/storage";
import type { RSVPAnswer, RSVPGroup } from "@/lib/rsvp/types";
import { contentMaxWidth, fonts, motion as motionCfg } from "@/lib/theme";

const Inner = styled.div`
  width: 100%;
  max-width: ${contentMaxWidth};
  margin: 0 auto;
  text-align: center;
`;

const StyledRSVPQuestion = styled(RSVPQuestion)`
  margin-bottom: clamp(1.25rem, 4.2vw, 1.75rem);
  font-size: clamp(2.65rem, 9.2vw, 5.65rem);
`;

const RSVPHint = styled(SectionSubtitle)`
  margin-bottom: clamp(1.75rem, 5vw, 2.5rem);
`;

const ErrorBanner = styled(motion.p)`
  margin: 0 auto clamp(1.25rem, 4vw, 1.75rem);
  max-width: ${contentMaxWidth};
  font-family: ${fonts.sans};
  font-size: clamp(1rem, 3.2vw, 1.15rem);
  font-weight: 600;
  line-height: 1.5;
  color: #f5d98b;
  text-shadow:
    0 0 18px rgba(245, 217, 139, 0.22),
    0 2px 14px rgba(0, 0, 0, 0.35);
`;

type Props = {
  reducedMotion: boolean;
};

export function RSVPSectionFallback({ reducedMotion }: Props) {
  const item = ceremonyChildVariants(reducedMotion);
  const parent = staggerParentVariants(reducedMotion);

  return (
    <InvitationSection id="rsvp" aria-labelledby="rsvp-heading">
      <Inner>
        <motion.div
          variants={parent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: motionCfg.scroll.viewportAmount }}
        >
          <StyledRSVPQuestion id="rsvp-heading" variants={item}>
            Կլինե՞ք ներկա
          </StyledRSVPQuestion>
          <RSVPHint variants={item}>
            Խնդրում ենք ընտրել Ձեր պատասխանը
          </RSVPHint>
          <motion.div variants={item}>
            <RSVPButtons
              reducedMotion={reducedMotion}
              locked
              onSelectYes={() => {}}
              onSelectNo={() => {}}
            />
          </motion.div>
        </motion.div>
      </Inner>
    </InvitationSection>
  );
}

export function RSVPSection({ reducedMotion }: Props) {
  const searchParams = useSearchParams();
  const group = resolveRSVPGroup(searchParams.get("group"));
  return (
    <RSVPSectionContent key={group} reducedMotion={reducedMotion} group={group} />
  );
}

function RSVPSectionContent({
  reducedMotion,
  group,
}: Props & { group: RSVPGroup }) {
  type FormSlice = {
    selectedResponse: RSVPAnswer | null;
    hydratedFromStorage: boolean;
    error: string | null;
  };

  const [form, setForm] = useState<FormSlice>({
    selectedResponse: null,
    hydratedFromStorage: false,
    error: null,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [savingChoice, setSavingChoice] = useState<RSVPAnswer | null>(null);

  useEffect(() => {
    const existing = getStoredResponseForGroup(group);
    /* eslint-disable react-hooks/set-state-in-effect -- hydrate client-only localStorage (avoid SSR mismatch) */
    setForm({
      selectedResponse: existing,
      hydratedFromStorage: Boolean(existing),
      error: null,
    });
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [group]);

  const submit = useCallback(
    async (response: RSVPAnswer) => {
      setForm((s) => ({ ...s, error: null }));

      const existingNow = getStoredResponseForGroup(group);
      if (existingNow) {
        setForm({
          selectedResponse: existingNow,
          hydratedFromStorage: true,
          error: null,
        });
        return;
      }

      setIsSaving(true);
      setSavingChoice(response);

      try {
        const res = await fetch("/api/rsvp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ group, response }),
        });

        let data: { ok?: boolean } = {};
        try {
          data = await res.json();
        } catch {
          setForm((s) => ({ ...s, error: RSVP_SAVE_ERROR }));
          return;
        }

        if (!res.ok || data.ok !== true) {
          setForm((s) => ({ ...s, error: RSVP_SAVE_ERROR }));
          return;
        }

        saveStoredResponseForGroup(group, response);
        setForm({
          selectedResponse: response,
          hydratedFromStorage: false,
          error: null,
        });
      } catch {
        setForm((s) => ({ ...s, error: RSVP_SAVE_ERROR }));
      } finally {
        setIsSaving(false);
        setSavingChoice(null);
      }
    },
    [group],
  );

  const item = ceremonyChildVariants(reducedMotion);
  const parent = staggerParentVariants(reducedMotion);

  const onYes = useCallback(() => void submit("yes"), [submit]);
  const onNo = useCallback(() => void submit("no"), [submit]);

  const { selectedResponse, hydratedFromStorage, error } = form;

  return (
    <InvitationSection id="rsvp" aria-labelledby="rsvp-heading">
      <Inner>
        <motion.div
          variants={parent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: motionCfg.scroll.viewportAmount }}
        >
          <StyledRSVPQuestion id="rsvp-heading" variants={item}>
            Կլինե՞ք ներկա
          </StyledRSVPQuestion>
          {selectedResponse === null ? (
            <RSVPHint variants={item}>
              Խնդրում ենք ընտրել Ձեր պատասխանը
            </RSVPHint>
          ) : null}
          <AnimatePresence>
            {selectedResponse === null && error ? (
              <ErrorBanner
                key="rsvp-error"
                role="alert"
                initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
                transition={{
                  duration: reducedMotion ? 0.2 : motionCfg.duration.fast,
                  ease: motionCfg.ease,
                }}
              >
                {error}
              </ErrorBanner>
            ) : null}
          </AnimatePresence>
          <motion.div variants={item}>
            <AnimatePresence mode="wait">
              {selectedResponse === null ? (
                <RSVPButtons
                  key="rsvp"
                  reducedMotion={reducedMotion}
                  onSelectYes={onYes}
                  onSelectNo={onNo}
                  isSaving={isSaving}
                  savingChoice={savingChoice}
                />
              ) : (
                <ConfirmationMessage
                  key="confirm"
                  reducedMotion={reducedMotion}
                  answer={selectedResponse}
                  showPersistedHint={hydratedFromStorage}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </Inner>
    </InvitationSection>
  );
}
