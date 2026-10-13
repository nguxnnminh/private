import React from 'react';

interface ProgressBarProps {
  currentScreen: number;
  totalScreens: number;
}

const SCREEN_NAMES = [
  '',
  'First',
  'Place',
  'Add-on',
  'Time',
  'Notes',
  'Decision',
];

const ProgressBar: React.FC<ProgressBarProps> = ({ currentScreen, totalScreens }) => {
  if (currentScreen === 0) return null;

  const pct = (currentScreen / (totalScreens - 1)) * 100;
  const label = SCREEN_NAMES[currentScreen] ?? '';

  return (
    <>
      <div
        className="progress-container"
        role="progressbar"
        aria-valuenow={currentScreen}
        aria-valuemin={1}
        aria-valuemax={totalScreens - 1}
        aria-label={`Step ${currentScreen} of ${totalScreens - 1}`}
      >
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      {label && <div className="progress-label">{label}</div>}
    </>
  );
};

export default ProgressBar;
