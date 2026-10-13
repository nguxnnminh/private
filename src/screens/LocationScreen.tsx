import React from 'react';
import { motion } from 'motion/react';
import { SCREEN_LOCATION } from '../config/gameConfig';
import ChoiceCard from '../components/ChoiceCard';
import NavigationButtons from '../components/NavigationButtons';

interface LocationScreenProps {
  locations: string[];
  customLocation: string;
  onToggleLocation: (id: string) => void;
  onCustomLocationChange: (val: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const LocationScreen: React.FC<LocationScreenProps> = ({
  locations,
  customLocation,
  onToggleLocation,
  onCustomLocationChange,
  onBack,
  onNext,
}) => {
  const hasSelection = locations.length > 0 || customLocation.trim().length > 0;

  return (
    <div className="screen scrollable-screen">
      <div className="screen-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="screen-label">{SCREEN_LOCATION.screenLabel}</div>
          <h2 className="screen-title">Choose Your <em>Map</em></h2>
          <p className="screen-question">{SCREEN_LOCATION.question}</p>
          <p className="screen-hint">{SCREEN_LOCATION.hint}</p>

          <div className="choice-grid" role="group" aria-label="Place choices">
            {SCREEN_LOCATION.options.map((opt, i) => (
              <ChoiceCard
                key={opt.id}
                id={opt.id}
                label={opt.label}
                image={opt.image}
                selected={locations.includes(opt.id)}
                onToggle={onToggleLocation}
                delay={i * 40}
              />
            ))}
          </div>

          <div className="custom-input-wrapper">
            <label className="custom-input-label" htmlFor="custom-location-input">
              {SCREEN_LOCATION.customLabel}
            </label>
            <input
              id="custom-location-input"
              className="custom-input"
              type="text"
              placeholder={SCREEN_LOCATION.customPlaceholder}
              value={customLocation}
              onChange={(e) => onCustomLocationChange(e.target.value)}
              maxLength={200}
            />
          </div>

          <NavigationButtons
            onBack={onBack}
            onNext={onNext}
            nextLabel="NEXT: SIDE QUEST"
            nextDisabled={!hasSelection}
            showBack={true}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LocationScreen;
