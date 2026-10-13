import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LABEL_MAPS,
  SCREEN_ACTIVITY,
  SCREEN_BONUS,
  SCREEN_FINAL,
  SCREEN_LOCATION,
  SCREEN_ENDING,
} from '../config/gameConfig';
import type { GameState, FinalDecision } from '../types/game';
import SummaryCard from '../components/SummaryCard';
import { submitGameData } from '../services/formSubmission';

interface FinalScreenProps {
  state: GameState;
  onDecision: (d: FinalDecision) => void;
  onEdit: (targetScreen?: number) => void;
  onStateUpdate: (updates: Partial<GameState>) => void;
}

function getSubmittedAt(): string {
  return new Date().toISOString();
}

const FinalScreen: React.FC<FinalScreenProps> = ({ state, onDecision, onEdit, onStateUpdate }) => {
  const [chosenDecision, setChosenDecision] = useState<FinalDecision>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const isNotNow = state.initialAnswer === 'not_now';
  const decisions = isNotNow ? SCREEN_FINAL.decisionsNotNow : SCREEN_FINAL.decisions;
  const question = isNotNow ? SCREEN_FINAL.questionNotNow : SCREEN_FINAL.questionDefault;

  const handleDecision = async (d: FinalDecision) => {
    if (isSubmitting) return;

    if (d === 'change_plan') {
      onEdit(1);
      return;
    }

    setChosenDecision(d);
    onDecision(d);

    setIsSubmitting(true);
    const updatedState = { ...state, finalDecision: d, submittedAt: getSubmittedAt() };
    onStateUpdate({ finalDecision: d, submittedAt: updatedState.submittedAt, isSubmitting: true, submitError: '' });
    const result = await submitGameData(updatedState);
    setIsSubmitting(false);
    onStateUpdate({
      finalDecision: d,
      isSubmitting: false,
      isSubmitted: result.success,
      submitError: result.success ? '' : result.message,
    });
  };

  const handleCopySummary = () => {
    const text = buildSummaryText({ ...state, finalDecision: chosenDecision });
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  if (chosenDecision && chosenDecision !== 'change_plan') {
    const ending = SCREEN_ENDING[chosenDecision as keyof typeof SCREEN_ENDING];
    return (
      <div className="screen">
        <div className="screen-inner">
          <motion.div
            className={`ending-screen${chosenDecision === 'accept' ? ' ending-screen--accept' : ''}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="ending-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
            <h2 className="ending-title">{ending.title}</h2>
            <p className="ending-message">{ending.message}</p>
            {ending.subtext && <p className="ending-subtext">{ending.subtext}</p>}

            <button className="copy-btn" onClick={handleCopySummary} type="button">
              {copied ? 'Copied' : 'Copy summary'}
            </button>

            <p className="session-id">#{state.sessionId}</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen scrollable-screen">
      <div className="screen-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="screen-label">{SCREEN_FINAL.screenLabel}</div>
          <h2 className="screen-title">{SCREEN_FINAL.title}</h2>

          <SummaryCard state={state} onEdit={() => onEdit(1)} />

          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              <p className="final-question">{question}</p>

              <div className="decision-grid" role="group" aria-label="Final decision">
                {decisions.map((d, i) => (
                  <motion.button
                    key={d.id}
                    className={`decision-btn ${d.style}`}
                    onClick={() => handleDecision(d.id as FinalDecision)}
                    disabled={isSubmitting}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.07 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    id={`decision-${d.id}`}
                  >
                    <span className="btn-icon" aria-hidden="true">
                      {d.id === 'accept' ? 'OK' :
                       d.id === 'change_plan' ? '<' :
                       d.id === 'maybe_later' ? '~' : 'X'}
                    </span>
                    <div className="decision-btn-content">
                      <div className="decision-btn-label">{d.label}</div>
                      <div className="decision-btn-sub">{d.sublabel}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

function buildSummaryText(state: GameState): string {
  const initialAnswer =
    LABEL_MAPS.initialAnswer[state.initialAnswer as keyof typeof LABEL_MAPS.initialAnswer] ?? '-';
  const timeSlot =
    LABEL_MAPS.timeSlot[state.timeSlot as keyof typeof LABEL_MAPS.timeSlot] ?? 'Not decided yet';
  const finalDecision =
    LABEL_MAPS.finalDecision[
      (state.finalDecision ?? 'null') as keyof typeof LABEL_MAPS.finalDecision
    ] ?? '-';
  const locations = [
    ...state.locations.map((id) => SCREEN_LOCATION.options.find((o) => o.id === id)?.label ?? id),
    state.customLocation,
  ].filter(Boolean);
  const activities = [
    ...state.activities.map((id) => SCREEN_ACTIVITY.options.find((o) => o.id === id)?.label ?? id),
    state.customActivity,
  ].filter(Boolean);
  const funFactors = state.funFactors.map(
    (id) => SCREEN_BONUS.q2Options.find((o) => o.id === id)?.label ?? id,
  );

  return [
    `PROJECT: ONE MORE COFFEE - Summary`,
    `#${state.sessionId}`,
    `---`,
    `First answer: ${initialAnswer}`,
    `Place: ${locations.join(', ') || 'Nothing chosen yet'}`,
    `Add-on: ${activities.join(', ') || 'No extra activity'}`,
    `Time: ${timeSlot}`,
    `Extra wishes: ${state.specialRequest || '-'}`,
    `What would make it better: ${funFactors.join(', ') || '-'}`,
    `Things to avoid: ${state.restrictions || '-'}`,
    `What Minh can prepare: ${state.plannerRequests || '-'}`,
    `Decision: ${finalDecision}`,
  ].join('\n');
}

export default FinalScreen;
