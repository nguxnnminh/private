export const INITIAL_ANSWERS = ['yes', 'see_plan', 'maybe', 'not_now'] as const;
export type InitialAnswer = typeof INITIAL_ANSWERS[number];

export const FINAL_DECISIONS = ['accept', 'change_plan', 'maybe_later', 'decline'] as const;
export type FinalDecision = typeof FINAL_DECISIONS[number] | null;

export const TIME_SLOTS = ['weekend', 'weekday_afternoon', 'evening', 'discuss_later', ''] as const;
export type TimeSlot = typeof TIME_SLOTS[number];

export interface GameState {
  sessionId: string;
  currentScreen: number;
  initialAnswer: InitialAnswer | '';

  // Screen 2 - Food
  foods: string[];
  customFood: string;
  anyFoodOk: boolean;

  // Screen 3 - Location
  locations: string[];
  customLocation: string;

  // Screen 4 - Activity
  activities: string[];
  customActivity: string;

  // Screen 5 - Time
  timeSlot: TimeSlot;

  // Screen 6 - Bonus Round
  specialRequest: string;
  funFactors: string[];
  restrictions: string;
  plannerRequests: string;

  // Screen 7 - Final Decision
  finalDecision: FinalDecision;

  // Meta
  submittedAt: string;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitError: string;
}

export const initialGameState: GameState = {
  sessionId: '',
  currentScreen: 0,
  initialAnswer: '',

  foods: [],
  customFood: '',
  anyFoodOk: false,

  locations: [],
  customLocation: '',

  activities: [],
  customActivity: '',

  timeSlot: '',

  specialRequest: '',
  funFactors: [],
  restrictions: '',
  plannerRequests: '',

  finalDecision: null,

  submittedAt: '',
  isSubmitting: false,
  isSubmitted: false,
  submitError: '',
};
