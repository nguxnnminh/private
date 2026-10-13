import type { GameState } from '../types/game';
import { SUBMISSION_CONFIG } from '../config/gameConfig';

export interface SubmissionPayload {
  timestamp: string;
  sessionId: string;
  submittedAt: string;
  initialAnswer: string;
  foods: string[];
  customFood: string;
  anyFoodOk: boolean;
  locations: string[];
  customLocation: string;
  activities: string[];
  customActivity: string;
  timeSlot: string;
  duration: string;
  budget: string;
  specialRequest: string;
  funFactors: string[];
  restrictions: string;
  plannerRequests: string;
  finalDecision: string;
}

interface SubmissionResult {
  success: boolean;
  message: string;
}

function buildPayload(state: GameState): SubmissionPayload {
  const now = new Date();

  return {
    timestamp: now.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }),
    sessionId: state.sessionId,
    submittedAt: now.toISOString(),
    initialAnswer: state.initialAnswer,
    foods: state.foods,
    customFood: state.customFood,
    anyFoodOk: state.anyFoodOk,
    locations: state.locations,
    customLocation: state.customLocation,
    activities: state.activities,
    customActivity: state.customActivity,
    timeSlot: state.timeSlot,
    duration: '',
    budget: '',
    specialRequest: state.specialRequest,
    funFactors: state.funFactors,
    restrictions: state.restrictions,
    plannerRequests: state.plannerRequests,
    finalDecision: state.finalDecision ?? '',
  };
}

function appendFormValue(form: HTMLFormElement, fieldName: string, value: string | boolean | string[]) {
  const normalizedValue = Array.isArray(value)
    ? value.join(', ')
    : typeof value === 'boolean'
      ? value ? 'Yes' : 'No'
      : value;

  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = fieldName;
  input.value = normalizedValue;
  form.appendChild(input);
}

function buildGoogleFormElement(payload: SubmissionPayload, targetName: string): HTMLFormElement {
  const form = document.createElement('form');
  const { fields } = SUBMISSION_CONFIG;

  form.method = 'POST';
  form.action = SUBMISSION_CONFIG.googleFormResponseUrl;
  form.target = targetName;
  form.style.display = 'none';

  appendFormValue(form, fields.timestamp, payload.timestamp);
  appendFormValue(form, fields.sessionId, payload.sessionId);
  appendFormValue(form, fields.initialAnswer, payload.initialAnswer);
  appendFormValue(form, fields.foods, payload.foods);
  appendFormValue(form, fields.customFood, payload.customFood);
  appendFormValue(form, fields.anyFoodOk, payload.anyFoodOk);
  appendFormValue(form, fields.locations, payload.locations);
  appendFormValue(form, fields.customLocation, payload.customLocation);
  appendFormValue(form, fields.activities, payload.activities);
  appendFormValue(form, fields.customActivity, payload.customActivity);
  appendFormValue(form, fields.timeSlot, payload.timeSlot);
  appendFormValue(form, fields.duration, payload.duration);
  appendFormValue(form, fields.budget, payload.budget);
  appendFormValue(form, fields.specialRequest, payload.specialRequest);
  appendFormValue(form, fields.funFactors, payload.funFactors);
  appendFormValue(form, fields.restrictions, payload.restrictions);
  appendFormValue(form, fields.plannerRequests, payload.plannerRequests);
  appendFormValue(form, fields.finalDecision, payload.finalDecision);
  appendFormValue(form, fields.submittedAt, payload.submittedAt);

  return form;
}

function submitGoogleForm(payload: SubmissionPayload): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined') {
      reject(new Error('Google Form submit chi chay trong trinh duyet.'));
      return;
    }

    const targetName = `google-form-submit-${Date.now()}`;
    const iframe = document.createElement('iframe');
    const form = buildGoogleFormElement(payload, targetName);
    let settled = false;

    iframe.name = targetName;
    iframe.style.display = 'none';

    const cleanup = () => {
      window.setTimeout(() => {
        form.remove();
        iframe.remove();
      }, 1000);
    };

    iframe.addEventListener('load', () => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve();
    });

    window.setTimeout(() => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve();
    }, 2500);

    try {
      document.body.appendChild(iframe);
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      settled = true;
      cleanup();
      reject(err);
    }
  });
}

export async function submitGameData(state: GameState): Promise<SubmissionResult> {
  if (!SUBMISSION_CONFIG.enabled || !SUBMISSION_CONFIG.googleFormResponseUrl) {
    return {
      success: false,
      message: 'Chua cau hinh Google Form de nhan du lieu.',
    };
  }

  try {
    await submitGoogleForm(buildPayload(state));

    return { success: true, message: 'Recorded in Google Form.' };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, message: `Gui that bai: ${msg}` };
  }
}
