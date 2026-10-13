import React from 'react';
import { motion } from 'motion/react';

interface NavigationButtonsProps {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  showBack?: boolean;
  nextDisabled?: boolean;
  nextIcon?: React.ReactNode;
}

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="2" y1="7" x2="12" y2="7" />
    <polyline points="8,3 12,7 8,11" />
  </svg>
);

const ArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="12" y1="7" x2="2" y2="7" />
    <polyline points="6,3 2,7 6,11" />
  </svg>
);

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onBack,
  onNext,
  nextLabel = 'NEXT',
  showBack = true,
  nextDisabled = false,
  nextIcon,
}) => {
  return (
    <div className={`nav-buttons${!showBack ? ' nav-buttons--no-back' : ''}`}>
      {showBack && onBack ? (
        <motion.button
          className="btn-back"
          onClick={onBack}
          type="button"
          aria-label="Go back to the previous screen"
          whileTap={{ scale: 0.96 }}
        >
          <ArrowLeft />
          BACK
        </motion.button>
      ) : null}
      <motion.button
        className={`btn-next${!showBack ? ' btn-next--full' : ''}`}
        onClick={onNext}
        disabled={nextDisabled}
        type="button"
        aria-label={nextLabel}
        whileTap={nextDisabled ? {} : { scale: 0.97 }}
      >
        {nextIcon ?? null}
        {nextLabel}
        <ArrowRight />
      </motion.button>
    </div>
  );
};

export default NavigationButtons;
