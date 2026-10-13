import React from 'react';
import { motion } from 'motion/react';
import { SCREEN_ACTIVITY } from '../config/gameConfig';
import NavigationButtons from '../components/NavigationButtons';

interface ActivityScreenProps {
  activities: string[];
  customActivity: string;
  onToggleActivity: (id: string) => void;
  onCustomActivityChange: (val: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const ActivityScreen: React.FC<ActivityScreenProps> = ({
  activities,
  customActivity,
  onToggleActivity,
  onCustomActivityChange,
  onBack,
  onNext,
}) => {
  const hasSelection = activities.length > 0 || customActivity.trim().length > 0;

  return (
    <div className="screen scrollable-screen">
      <div className="screen-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="screen-label">{SCREEN_ACTIVITY.screenLabel}</div>
          <h2 className="screen-title">{SCREEN_ACTIVITY.title}</h2>
          <p className="screen-question">{SCREEN_ACTIVITY.question}</p>
          <p className="screen-hint">{SCREEN_ACTIVITY.hint}</p>

          <div className="option-row" style={{ marginTop: '20px' }} role="group" aria-label="Add-on activities">
            {SCREEN_ACTIVITY.options.map((opt, i) => (
              <motion.button
                key={opt.id}
                className={`option-pill ${activities.includes(opt.id) ? 'selected' : ''}`}
                onClick={() => onToggleActivity(opt.id)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.05 + i * 0.06 }}
                type="button"
                aria-pressed={activities.includes(opt.id)}
                id={`activity-${opt.id}`}
              >
                <span className="pill-bullet" aria-hidden="true" />
                <span className="pill-label">{opt.label}</span>
                <span className="pill-dot" aria-hidden="true" />
              </motion.button>
            ))}
          </div>

          <div className="custom-input-wrapper">
            <label className="custom-input-label" htmlFor="custom-activity-input">
              {SCREEN_ACTIVITY.customLabel}
            </label>
            <input
              id="custom-activity-input"
              className="custom-input"
              type="text"
              placeholder={SCREEN_ACTIVITY.customPlaceholder}
              value={customActivity}
              onChange={(e) => onCustomActivityChange(e.target.value)}
              maxLength={200}
            />
          </div>

          <NavigationButtons
            onBack={onBack}
            onNext={onNext}
            nextLabel="Next: Time"
            nextDisabled={!hasSelection}
            showBack={true}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ActivityScreen;
