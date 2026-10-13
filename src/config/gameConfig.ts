// ============================================================
// GAME CONFIG - edit copy here without touching game logic
// ============================================================

export const META = {
  gameName: 'PROJECT: ONE MORE COFFEE',
  subtitle: 'A small plan. No pressure.',
  inviterName: 'Minh',
  version: '1.1.0',
};

// ---- Google Form submission --------------------------------
export const SUBMISSION_CONFIG = {
  googleFormResponseUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSen0cMeHP5orR527PhsmNYKXlpW4Kj9ZiDECoaAE8QrnyErDQ/formResponse',
  fields: {
    timestamp: 'entry.2054529163',
    sessionId: 'entry.1984317510',
    initialAnswer: 'entry.1650496019',
    foods: 'entry.64647727',
    customFood: 'entry.602950014',
    anyFoodOk: 'entry.327803623',
    locations: 'entry.1325866505',
    customLocation: 'entry.1395778277',
    activities: 'entry.144309340',
    customActivity: 'entry.1539664831',
    timeSlot: 'entry.600277793',
    duration: 'entry.1220623559',
    budget: 'entry.1069729171',
    specialRequest: 'entry.1332168492',
    funFactors: 'entry.823567436',
    restrictions: 'entry.2028281043',
    plannerRequests: 'entry.1652435482',
    finalDecision: 'entry.429420053',
    submittedAt: 'entry.1400688123',
  },
  enabled: true,
};

// ---- Screen 0: Start ---------------------------------------
export const SCREEN_START = {
  badge: 'from Minh',
  title: 'ONE MORE COFFEE',
  subtitle: 'A little date for us.\nOnly if your heart feels ready.',
  intro:
    'I have been thinking about you, and I would love to spend a gentle afternoon together again. I made this little invitation with care, so we can find something that feels right for you.',
  cta: 'Open my little note',
  footnote: 'No pressure. Just something honest from my heart.',
  decorTag: 'made for you',
};

// ---- Screen 1: First ---------------------------------------
export const SCREEN_QUEST = {
  screenLabel: 'First',
  title: 'Would you let me see you again?',
  question: 'I miss the easy moments with you. Would you be open to sharing one small, peaceful moment together?',
  options: [
    {
      id: 'yes',
      label: 'Yes, I would like that.',
      response: 'That makes me really happy. I will make it thoughtful, gentle, and worthy of your time.',
    },
    {
      id: 'see_plan',
      label: 'Let me see what you have in mind.',
      response: 'Of course. I want you to feel comfortable with every part of it before you decide.',
    },
    {
      id: 'maybe',
      label: 'Maybe, if it feels right.',
      response: 'That is completely fair. I will make it soft and simple, and let your feelings lead the way.',
    },
    {
      id: 'not_now',
      label: 'I am not ready right now.',
      response:
        'I understand. You can still look through my little idea, and the final choice will always be completely yours.',
    },
  ],
};

// ---- Food choices are intentionally handled by Minh ----------------
export const SCREEN_FOOD = {
  screenLabel: '01 - Food',
  title: 'What would feel nice?',
  question: 'If we get food or drinks, what kind of thing would you enjoy?',
  hint: 'Choose whatever feels easy. I will handle the rest.',
  anyFoodLabel: 'I am fine with anything',
  customLabel: 'Something else',
  customPlaceholder: 'For example: ramen, tacos, banh mi, noodles...',
  options: [
    {
      id: 'sushi',
      label: 'Sushi / Japanese',
      image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=80',
    },
    {
      id: 'korean',
      label: 'Korean food',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80',
    },
    {
      id: 'hotpot',
      label: 'Hotpot',
      image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80',
    },
    {
      id: 'bbq',
      label: 'BBQ / Grilled food',
      image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&q=80',
    },
    {
      id: 'viet_snacks',
      label: 'Vietnamese snacks',
      image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80',
    },
    {
      id: 'bubble_tea',
      label: 'Milk tea / Coffee',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80',
    },
    {
      id: 'dessert',
      label: 'Dessert / Cake',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
    },
    {
      id: 'pizza',
      label: 'Pizza / Western food',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80',
    },
    {
      id: 'vietnamese',
      label: 'Vietnamese food',
      image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&q=80',
    },
    {
      id: 'spicy',
      label: 'Something spicy',
      image: 'https://images.unsplash.com/photo-1606502973842-f64bc2785fe5?w=400&q=80',
    },
    {
      id: 'surprise',
      label: 'Let Minh choose a surprise',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
    },
  ],
};

// ---- Screen 3: Place ---------------------------------------
export const SCREEN_LOCATION = {
  screenLabel: '02 - Place',
  title: 'Where would feel nice for us?',
  question: '',
  hint: 'Choose the place where you would feel most at ease. I will take care of the food.',
  customLabel: 'Or is there a place you would love to share with me?',
  customPlaceholder: 'For example: a familiar cafe, a quiet street, the old place...',
  options: [
    {
      id: 'cafe',
      label: 'A quiet cafe',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80',
    },
    {
      id: 'street_food',
      label: 'Street food and a little walk',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80',
    },
    {
      id: 'mall_cinema',
      label: 'A mall or cinema area',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80',
    },
    {
      id: 'lake_walk',
      label: 'A slow walk by the lake',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
    },
    {
      id: 'dessert_shop',
      label: 'A small dessert spot',
      image: 'https://images.unsplash.com/photo-1559622214-f8a9850965bb?w=400&q=80',
    },
    {
      id: 'explore',
      label: 'Somewhere new for us to discover',
      image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80',
    },
    {
      id: 'minh_plans',
      label: 'Let me choose, you just come as you are',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80',
    },
  ],
};

// ---- Screen 4: Activity ------------------------------------
export const SCREEN_ACTIVITY = {
  screenLabel: '03 - A little something',
  title: 'What would make our time feel special?',
  question: 'After we eat, what little thing would you enjoy sharing with me?',
  hint: 'Choose one, and I will make room for a memory we can both keep.',
  customLabel: 'Or is there something your heart would enjoy?',
  customPlaceholder: 'For example: a bookstore, an exhibition, just talking...',
  options: [
    { id: 'walk_talk', label: 'Walk slowly and talk' },
    { id: 'cinema', label: 'Watch something together' },
    { id: 'arcade', label: 'Play and laugh together' },
    { id: 'photobooth', label: 'Keep one photo of us' },
    { id: 'bookstore', label: 'Wander through a sweet little shop' },
    { id: 'scenery', label: 'Find a pretty view together' },
    { id: 'second_dessert', label: 'Share one more sweet thing' },
    { id: 'spontaneous', label: 'Let the day surprise us' },
  ],
};

// ---- Screen 5: Time ----------------------------------------
export const SCREEN_TIME = {
  screenLabel: '04 - Time',
  title: 'When would you like to see me?',
  timeQuestion: 'Choose a moment when you can feel relaxed and present with me.',
  timeOptions: [
    { id: 'weekend', label: 'A slow weekend day' },
    { id: 'weekday_afternoon', label: 'A quiet afternoon' },
    { id: 'evening', label: 'A gentle evening' },
    { id: 'discuss_later', label: 'Let us find the right time together' },
  ],
};

// ---- Screen 6: Bonus ---------------------------------------
export const SCREEN_BONUS = {
  screenLabel: '05 - A few thoughts',
  title: 'Help me make it feel right for you',
  q1: 'Is there anything I can do to help you feel safe and comfortable?',
  q1Placeholder: 'For example: somewhere quiet, no spicy food, not too crowded...',
  q2: 'What would make our time feel warmer and more like us?',
  q2Options: [
    { id: 'easy_talk', label: 'Easy conversation', emoji: '💬' },
    { id: 'good_food', label: 'Good food', emoji: '🍜' },
    { id: 'nice_walk', label: 'A nice walk', emoji: '🚶' },
    { id: 'photos', label: 'A cute photo spot', emoji: '📷' },
    { id: 'quiet', label: 'Not too crowded', emoji: '🌿' },
  ],
  q3: 'Is there anything you would rather I avoid?',
  q3Placeholder: 'For example: no seafood, not too far, no horror movies...',
  q4: 'Is there anything you would like me to prepare for you?',
  q4Placeholder: 'For example: send the address first, choose an exact time, keep it short...',
  flirtLine: 'Your comfort matters to me. I want this to feel like a kind beginning, not a difficult conversation.',
};

// ---- Screen 7: Final ---------------------------------------
export const SCREEN_FINAL = {
  screenLabel: 'Decision',
  title: 'Could this be our next little memory?',
  summaryTitle: 'A little plan for us',
  editButton: 'Make it feel more like you',
  questionDefault: 'After seeing it, would you let me take you out?',
  questionNotNow:
    'This is only a gentle idea. How does it feel in your heart now?',
  decisions: [
    {
      id: 'accept',
      label: 'Okay, let us go.',
      sublabel: 'I will take care of the rest.',
      style: 'primary',
    },
    {
      id: 'change_plan',
      label: 'I want to adjust it a little.',
      sublabel: 'Go back and make the plan softer.',
      style: 'secondary',
    },
    {
      id: 'maybe_later',
      label: 'Maybe another day.',
      sublabel: 'A different time might feel better.',
      style: 'ghost',
    },
    {
      id: 'decline',
      label: 'I do not want to go.',
      sublabel: 'That is okay too.',
      style: 'ghost',
    },
  ],
  decisionsNotNow: [
    {
      id: 'accept',
      label: 'Actually, this feels okay.',
      sublabel: 'I will take care of the rest.',
      style: 'primary',
    },
    {
      id: 'change_plan',
      label: 'Maybe, if we change it a bit.',
      sublabel: 'Go back and adjust the plan.',
      style: 'secondary',
    },
    {
      id: 'maybe_later',
      label: 'Maybe another day.',
      sublabel: 'A different time might feel better.',
      style: 'ghost',
    },
    {
      id: 'decline',
      label: 'Still not right now.',
      sublabel: 'No pressure at all.',
      style: 'ghost',
    },
  ],
};

// ---- Ending -------------------------------------------------
export const SCREEN_ENDING = {
  accept: {
    title: 'Thank you for giving me one more chance.',
    message: 'Thank you for giving me the chance to go out with you one more time. It means more to me than I can say.',
    subtext: 'I will make it simple, thoughtful, and comfortable for both of us. I am really looking forward to seeing you again.',
  },
  change_plan: {
    title: 'Of course. We can make it feel right.',
    message: 'Thank you for giving me another chance, even if we need to change the plan first.',
    subtext: 'Tell me what would make it easier for you. I want this to feel comfortable for both of us.',
  },
  maybe_later: {
    title: 'Maybe you could think about it once more.',
    message: 'I understand that now may not feel like the right time. Still, I hope you might give me one more chance to spend a little time together.',
    subtext: 'There is no pressure. Please take your time, and I will respect how you feel.',
  },
  decline: {
    title: 'I understand. Please think about it once more.',
    message: 'Thank you for taking the time to look through this. I still hope you might give me one more chance to make things right and spend one good day together.',
    subtext: 'I will respect your decision. But if there is even a small part of you that is unsure, I hope you will give me another chance.',
  },
};

// ---- Summary labels ----------------------------------------
export const LABEL_MAPS = {
  initialAnswer: {
    yes: 'Open to going',
    see_plan: 'Wanted to see the plan first',
    maybe: 'Maybe, depending on the plan',
    not_now: 'Not right now at first',
    '': '-',
  },
  timeSlot: {
    weekend: 'Weekend',
    weekday_afternoon: 'Weekday afternoon',
    evening: 'Evening',
    discuss_later: 'Talk about it later',
    '': 'Not decided yet',
  },
  finalDecision: {
    accept: 'Agreed to go',
    change_plan: 'Wants to adjust the plan',
    maybe_later: 'Maybe another day',
    decline: 'Does not want to go',
    null: '-',
  },
};
