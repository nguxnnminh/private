import React from 'react';
import { motion } from 'motion/react';
import { SCREEN_BONUS } from '../config/gameConfig';
import NavigationButtons from '../components/NavigationButtons';

interface BonusScreenProps {
  specialRequest: string;
  funFactors: string[];
  restrictions: string;
  plannerRequests: string;
  onSpecialRequestChange: (v: string) => void;
  onToggleFunFactor: (id: string) => void;
  onRestrictionsChange: (v: string) => void;
  onPlannerRequestsChange: (v: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const BonusScreen: React.FC<BonusScreenProps> = ({
  specialRequest,
  funFactors,
  restrictions,
  plannerRequests,
  onSpecialRequestChange,
  onToggleFunFactor,
  onRestrictionsChange,
  onPlannerRequestsChange,
  onBack,
  onNext,
}) => {
  return (
    <div className="screen scrollable-screen">
      <div className="screen-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="screen-label">{SCREEN_BONUS.screenLabel}</div>
          <h2 className="screen-title">{SCREEN_BONUS.title}</h2>
          <p className="screen-question" style={{ marginBottom: '28px' }}>
            This helps me make the plan more comfortable. Nothing here is required.
          </p>

          {/* Q1 */}
          <div className="bonus-question">
            <div className="bonus-question-label">1. {SCREEN_BONUS.q1}</div>
            <textarea
              id="special-request-input"
              className="custom-input"
              rows={3}
              placeholder={SCREEN_BONUS.q1Placeholder}
              value={specialRequest}
              onChange={(e) => onSpecialRequestChange(e.target.value)}
              maxLength={500}
            />
          </div>

          {/* Q2 */}
          <div className="bonus-question">
            <div className="bonus-question-label">2. {SCREEN_BONUS.q2}</div>
            <div className="option-row" role="group" aria-label="Things that would make the time better">
              {SCREEN_BONUS.q2Options.map((opt) => (
                <button
                  key={opt.id}
                  className={`option-pill ${funFactors.includes(opt.id) ? 'selected' : ''}`}
                  onClick={() => onToggleFunFactor(opt.id)}
                  type="button"
                  aria-pressed={funFactors.includes(opt.id)}
                  id={`fun-factor-${opt.id}`}
                >
                  <span className="pill-emoji">{opt.emoji}</span>
                  <span className="pill-label">{opt.label}</span>
                  <span className="pill-dot" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          {/* Q3 */}
          <div className="bonus-question">
            <div className="bonus-question-label">3. {SCREEN_BONUS.q3}</div>
            <textarea
              id="restrictions-input"
              className="custom-input"
              rows={3}
              placeholder={SCREEN_BONUS.q3Placeholder}
              value={restrictions}
              onChange={(e) => onRestrictionsChange(e.target.value)}
              maxLength={500}
            />
          </div>

          {/* Q4 */}
          <div className="bonus-question">
            <div className="bonus-question-label">4. {SCREEN_BONUS.q4}</div>
            <textarea
              id="planner-requests-input"
              className="custom-input"
              rows={3}
              placeholder={SCREEN_BONUS.q4Placeholder}
              value={plannerRequests}
              onChange={(e) => onPlannerRequestsChange(e.target.value)}
              maxLength={500}
            />
          </div>

          {/* Flirt line */}
          <div className="flirt-line">{SCREEN_BONUS.flirtLine}</div>

          <NavigationButtons
            onBack={onBack}
            onNext={onNext}
            nextLabel="SEE THE PLAN"
            showBack={true}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default BonusScreen;
