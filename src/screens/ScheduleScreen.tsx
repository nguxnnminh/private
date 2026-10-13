import React from 'react';
import { motion } from 'motion/react';
import { SCREEN_TIME } from '../config/gameConfig';
import type { TimeSlot } from '../types/game';
import NavigationButtons from '../components/NavigationButtons';

interface ScheduleScreenProps {
  timeSlot: TimeSlot;
  onSetTimeSlot: (v: TimeSlot) => void;
  onBack: () => void;
  onNext: () => void;
}

const ScheduleScreen: React.FC<ScheduleScreenProps> = ({
  timeSlot,
  onSetTimeSlot,
  onBack,
  onNext,
}) => {
  return (
    <div className="screen">
      <div className="screen-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="screen-label">{SCREEN_TIME.screenLabel}</div>
          <h2 className="screen-title">{SCREEN_TIME.title}</h2>
          <p className="screen-question" style={{ marginBottom: '28px' }}>
            {SCREEN_TIME.timeQuestion}
          </p>

          <div
            className="option-row"
            role="radiogroup"
            aria-label="Available time"
          >
            {SCREEN_TIME.timeOptions.map((opt, i) => (
              <motion.button
                key={opt.id}
                className={`option-pill ${timeSlot === opt.id ? 'selected' : ''}`}
                onClick={() => onSetTimeSlot(opt.id as TimeSlot)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.08 + i * 0.07 }}
                type="button"
                role="radio"
                aria-checked={timeSlot === opt.id}
                id={`time-${opt.id}`}
              >
                <span className="pill-bullet" aria-hidden="true" />
                <span className="pill-label">{opt.label}</span>
                <span className="pill-dot" aria-hidden="true" />
              </motion.button>
            ))}
          </div>

          <NavigationButtons
            onBack={onBack}
            onNext={onNext}
            nextLabel="SEE THE PLAN"
            nextDisabled={!timeSlot}
            showBack={true}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ScheduleScreen;
