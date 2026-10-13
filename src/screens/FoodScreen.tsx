import React from 'react';
import { motion } from 'motion/react';
import { SCREEN_FOOD } from '../config/gameConfig';
import ChoiceCard from '../components/ChoiceCard';
import NavigationButtons from '../components/NavigationButtons';

interface FoodScreenProps {
  foods: string[];
  customFood: string;
  anyFoodOk: boolean;
  onToggleFood: (id: string) => void;
  onToggleAnyFood: () => void;
  onCustomFoodChange: (val: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const FoodScreen: React.FC<FoodScreenProps> = ({
  foods,
  customFood,
  anyFoodOk,
  onToggleFood,
  onToggleAnyFood,
  onCustomFoodChange,
  onBack,
  onNext,
}) => {
  const hasSelection = anyFoodOk || foods.length > 0 || customFood.trim().length > 0;

  return (
    <div className="screen scrollable-screen">
      <div className="screen-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="screen-label">{SCREEN_FOOD.screenLabel}</div>
          <h2 className="screen-title"><em>Food</em> Draft</h2>
          <p className="screen-question">{SCREEN_FOOD.question}</p>
          <p className="screen-hint">{SCREEN_FOOD.hint}</p>

          {/* Any food toggle */}
          <button
            className={`any-food-toggle ${anyFoodOk ? 'active' : ''}`}
            onClick={onToggleAnyFood}
            type="button"
            aria-pressed={anyFoodOk}
            id="any-food-btn"
          >
            <span className="toggle-emoji">🤷</span>
            <span className="toggle-label">{SCREEN_FOOD.anyFoodLabel}</span>
            {anyFoodOk && <span style={{ marginLeft: 'auto', fontSize: '12px', opacity: 0.7 }}>✓</span>}
          </button>

          {/* Cards grid */}
          <div
            className="choice-grid"
            role="group"
            aria-label="Food choices"
            style={{ opacity: anyFoodOk ? 0.4 : 1, transition: 'opacity 0.3s', pointerEvents: anyFoodOk ? 'none' : 'auto' }}
          >
            {SCREEN_FOOD.options.map((opt, i) => (
              <ChoiceCard
                key={opt.id}
                id={opt.id}
                label={opt.label}
                image={opt.image}
                selected={foods.includes(opt.id)}
                onToggle={onToggleFood}
                delay={i * 40}
              />
            ))}
          </div>

          {/* Custom input */}
          <div className="custom-input-wrapper">
            <label className="custom-input-label" htmlFor="custom-food-input">
              {SCREEN_FOOD.customLabel}
            </label>
            <input
              id="custom-food-input"
              className="custom-input"
              type="text"
              placeholder={SCREEN_FOOD.customPlaceholder}
              value={customFood}
              onChange={(e) => onCustomFoodChange(e.target.value)}
              disabled={anyFoodOk}
              maxLength={200}
            />
          </div>

          <NavigationButtons
            onBack={onBack}
            onNext={onNext}
            nextLabel="NEXT: MAP"
            nextDisabled={!hasSelection}
            showBack={true}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default FoodScreen;
