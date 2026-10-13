import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SCREEN_QUEST } from '../config/gameConfig';
import type { InitialAnswer } from '../types/game';
import NavigationButtons from '../components/NavigationButtons';

interface InviteScreenProps {
  selected: InitialAnswer | '';
  onSelect: (id: InitialAnswer) => void;
  onNext: () => void;
}

const InviteScreen: React.FC<InviteScreenProps> = ({ selected, onSelect, onNext }) => {
  const response = selected
    ? SCREEN_QUEST.options.find((o) => o.id === selected)?.response
    : null;

  return (
    <div className="screen">
      <div className="screen-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="screen-label">{SCREEN_QUEST.screenLabel}</div>
          <h2 className="screen-title">{SCREEN_QUEST.title}</h2>
          <p className="screen-question">{SCREEN_QUEST.question}</p>

          <div className="option-row" style={{ marginTop: '24px' }} role="radiogroup" aria-label="Answer choices">
            {SCREEN_QUEST.options.map((opt, i) => (
              <motion.button
                key={opt.id}
                className={`option-pill ${selected === opt.id ? 'selected' : ''}`}
                onClick={() => onSelect(opt.id as InitialAnswer)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}
                type="button"
                role="radio"
                aria-checked={selected === opt.id}
                id={`quest-option-${opt.id}`}
              >
                <span className="pill-bullet" aria-hidden="true" />
                <span className="pill-label">{opt.label}</span>
                <span className="pill-dot" aria-hidden="true" />
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {response && (
              <motion.div
                className="response-callout"
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                key={selected}
              >
                <p>{response}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {selected === 'not_now' && (
            <motion.div
              className="not-now-note"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              You can still look through the plan. I will ask again at the end, and there is no pressure.
            </motion.div>
          )}

          <NavigationButtons
            onNext={onNext}
            nextDisabled={!selected}
            nextLabel="Continue"
            showBack={false}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default InviteScreen;
