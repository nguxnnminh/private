import React, { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { GameState, InitialAnswer, FinalDecision } from './types/game';
import { initialGameState } from './types/game';
import ProgressBar from './components/ProgressBar';
import StartScreen from './screens/StartScreen';
import InviteScreen from './screens/InviteScreen';
import LocationScreen from './screens/LocationScreen';
import ActivityScreen from './screens/ActivityScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import BonusScreen from './screens/BonusScreen';
import FinalScreen from './screens/FinalScreen';

const TOTAL_SCREENS = 7; // 0 = Start, 1..6 = content screens
const STORAGE_KEY = 'hen_cau_state';

function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 9).toUpperCase();
}

function loadState(): GameState | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return normalizeState(JSON.parse(raw) as Partial<GameState>);
  } catch {
    return null;
  }
}

function normalizeState(saved: Partial<GameState>): GameState {
  const oldScreen = saved.currentScreen ?? 0;
  const currentScreen = oldScreen >= 3
    ? Math.min(oldScreen - 1, TOTAL_SCREENS - 1)
    : oldScreen;

  return {
    ...initialGameState,
    ...saved,
    currentScreen,
    foods: Array.isArray(saved.foods) ? saved.foods : [],
    locations: Array.isArray(saved.locations) ? saved.locations : [],
    activities: Array.isArray(saved.activities) ? saved.activities : [],
    funFactors: Array.isArray(saved.funFactors) ? saved.funFactors : [],
  };
}

function saveState(state: GameState) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* silent */ }
}

function toggleArray(arr: string[], id: string): string[] {
  return arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];
}

const slideVariants = {
  enterForward:  { x: '56px', opacity: 0 },
  enterBackward: { x: '-56px', opacity: 0 },
  center:        { x: 0, opacity: 1 },
  exitForward:   { x: '-56px', opacity: 0 },
  exitBackward:  { x: '56px', opacity: 0 },
};

const App: React.FC = () => {
  const [state, setState] = useState<GameState>(() => {
    const saved = loadState();
    if (saved && saved.sessionId) return saved;
    return { ...initialGameState, sessionId: generateSessionId() };
  });
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  useEffect(() => { saveState(state); }, [state]);

  const update = useCallback((updates: Partial<GameState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const goTo = useCallback((screen: number, dir: 'forward' | 'backward' = 'forward') => {
    setDirection(dir);
    setState((prev) => ({ ...prev, currentScreen: screen }));
  }, []);

  const goNext = useCallback(() => goTo(state.currentScreen + 1, 'forward'), [state.currentScreen, goTo]);
  const goBack = useCallback(() => goTo(state.currentScreen - 1, 'backward'), [state.currentScreen, goTo]);

  const toggleLocation = useCallback((id: string) => setState(p => ({ ...p, locations:  toggleArray(p.locations,  id) })), []);
  const toggleActivity = useCallback((id: string) => setState(p => ({ ...p, activities: toggleArray(p.activities, id) })), []);
  const toggleFunFactor = useCallback((id: string) => setState(p => ({ ...p, funFactors: toggleArray(p.funFactors, id) })), []);

  const handleStart = useCallback(() => {
    setState({ ...initialGameState, sessionId: generateSessionId(), currentScreen: 1 });
    setDirection('forward');
  }, []);

  const handleDecision = useCallback((d: FinalDecision) => update({ finalDecision: d }), [update]);

  const handleEdit = useCallback((targetScreen?: number) => goTo(targetScreen ?? 1, 'backward'), [goTo]);

  const enterVariant = direction === 'forward' ? 'enterForward' : 'enterBackward';
  const exitVariant  = direction === 'forward' ? 'exitForward'  : 'exitBackward';

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 0: return <StartScreen key="start" onStart={handleStart} />;

      case 1: return (
        <InviteScreen
          key="invite"
          selected={state.initialAnswer}
          onSelect={(id: InitialAnswer) => update({ initialAnswer: id })}
          onNext={goNext}
        />
      );

      case 2: return (
        <LocationScreen
          key="location"
          locations={state.locations}
          customLocation={state.customLocation}
          onToggleLocation={toggleLocation}
          onCustomLocationChange={(v) => update({ customLocation: v })}
          onBack={goBack}
          onNext={goNext}
        />
      );

      case 3: return (
        <ActivityScreen
          key="activity"
          activities={state.activities}
          customActivity={state.customActivity}
          onToggleActivity={toggleActivity}
          onCustomActivityChange={(v) => update({ customActivity: v })}
          onBack={goBack}
          onNext={goNext}
        />
      );

      case 4: return (
        <ScheduleScreen
          key="schedule"
          timeSlot={state.timeSlot}
          onSetTimeSlot={(v) => update({ timeSlot: v })}
          onBack={goBack}
          onNext={goNext}
        />
      );

      case 5: return (
        <BonusScreen
          key="bonus"
          specialRequest={state.specialRequest}
          funFactors={state.funFactors}
          restrictions={state.restrictions}
          plannerRequests={state.plannerRequests}
          onSpecialRequestChange={(v) => update({ specialRequest: v })}
          onToggleFunFactor={toggleFunFactor}
          onRestrictionsChange={(v) => update({ restrictions: v })}
          onPlannerRequestsChange={(v) => update({ plannerRequests: v })}
          onBack={goBack}
          onNext={goNext}
        />
      );

      case 6: return (
        <FinalScreen
          key="final"
          state={state}
          onDecision={handleDecision}
          onEdit={handleEdit}
          onStateUpdate={update}
        />
      );

      default: return null;
    }
  };

  return (
    <div className="app-wrapper">
      <ProgressBar currentScreen={state.currentScreen} totalScreens={TOTAL_SCREENS} />

      <AnimatePresence mode="wait" initial={false}>
        {state.currentScreen === 0 ? (
          <motion.div
            key="start"
            style={{ flex: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <StartScreen onStart={handleStart} />
          </motion.div>
        ) : (
          <motion.div
            key={state.currentScreen}
            style={{ flex: 1 }}
            initial={enterVariant}
            animate="center"
            exit={exitVariant}
            variants={slideVariants}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderScreen()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
