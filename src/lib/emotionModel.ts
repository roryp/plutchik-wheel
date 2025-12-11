export type PrimaryEmotion =
  | 'Joy'
  | 'Trust'
  | 'Fear'
  | 'Surprise'
  | 'Sadness'
  | 'Disgust'
  | 'Anger'
  | 'Anticipation'

export type IntensityLevel = 'weak' | 'normal' | 'strong'

export interface EmotionIntensity {
  level: IntensityLevel
  label: string
  description: string
}

export interface EmotionData {
  name: PrimaryEmotion
  color: string
  intensities: {
    weak: EmotionIntensity
    normal: EmotionIntensity
    strong: EmotionIntensity
  }
  position: number
  opposite: PrimaryEmotion
}

export interface Dyad {
  name: string
  primaryEmotions: [PrimaryEmotion, PrimaryEmotion]
  type: 'primary' | 'secondary' | 'tertiary' | 'opposite'
  description: string
}

export const EMOTIONS: Record<PrimaryEmotion, EmotionData> = {
  Joy: {
    name: 'Joy',
    color: 'oklch(0.85 0.15 85)',
    position: 0,
    opposite: 'Sadness',
    intensities: {
      weak: {
        level: 'weak',
        label: 'Serenity',
        description: 'A peaceful, calm sense of contentment and tranquility.',
      },
      normal: {
        level: 'normal',
        label: 'Joy',
        description: 'A feeling of great pleasure, happiness, and delight.',
      },
      strong: {
        level: 'strong',
        label: 'Ecstasy',
        description:
          'An overwhelming feeling of intense joy and rapture, beyond ordinary happiness.',
      },
    },
  },
  Trust: {
    name: 'Trust',
    color: 'oklch(0.75 0.12 180)',
    position: 1,
    opposite: 'Disgust',
    intensities: {
      weak: {
        level: 'weak',
        label: 'Acceptance',
        description:
          'A willingness to receive or acknowledge something without resistance.',
      },
      normal: {
        level: 'normal',
        label: 'Trust',
        description:
          'A firm belief in the reliability, truth, or ability of someone or something.',
      },
      strong: {
        level: 'strong',
        label: 'Admiration',
        description:
          'Deep respect and warm approval, a profound sense of trust and esteem.',
      },
    },
  },
  Fear: {
    name: 'Fear',
    color: 'oklch(0.70 0.12 140)',
    position: 2,
    opposite: 'Anger',
    intensities: {
      weak: {
        level: 'weak',
        label: 'Apprehension',
        description:
          'Mild anxiety or unease about something that might happen.',
      },
      normal: {
        level: 'normal',
        label: 'Fear',
        description:
          'An unpleasant emotion caused by the belief that something is dangerous or threatening.',
      },
      strong: {
        level: 'strong',
        label: 'Terror',
        description:
          'Extreme fear, a state of intense fright that can be paralyzing.',
      },
    },
  },
  Surprise: {
    name: 'Surprise',
    color: 'oklch(0.75 0.11 220)',
    position: 3,
    opposite: 'Anticipation',
    intensities: {
      weak: {
        level: 'weak',
        label: 'Distraction',
        description:
          'A slight diversion of attention, being drawn to something unexpected.',
      },
      normal: {
        level: 'normal',
        label: 'Surprise',
        description:
          'A feeling of mild astonishment or shock caused by something unexpected.',
      },
      strong: {
        level: 'strong',
        label: 'Amazement',
        description:
          'Overwhelming surprise mixed with wonder, being utterly astonished.',
      },
    },
  },
  Sadness: {
    name: 'Sadness',
    color: 'oklch(0.55 0.15 250)',
    position: 4,
    opposite: 'Joy',
    intensities: {
      weak: {
        level: 'weak',
        label: 'Pensiveness',
        description:
          'A state of deep, often melancholic thoughtfulness or reflection.',
      },
      normal: {
        level: 'normal',
        label: 'Sadness',
        description:
          'A feeling of sorrow, unhappiness, or emotional pain.',
      },
      strong: {
        level: 'strong',
        label: 'Grief',
        description:
          'Intense sorrow, especially caused by loss or profound disappointment.',
      },
    },
  },
  Disgust: {
    name: 'Disgust',
    color: 'oklch(0.60 0.14 300)',
    position: 5,
    opposite: 'Trust',
    intensities: {
      weak: {
        level: 'weak',
        label: 'Boredom',
        description:
          'A feeling of weariness and lack of interest, mild aversion.',
      },
      normal: {
        level: 'normal',
        label: 'Disgust',
        description:
          'A strong feeling of revulsion or profound disapproval.',
      },
      strong: {
        level: 'strong',
        label: 'Loathing',
        description:
          'Intense hatred or extreme disgust, a powerful sense of repulsion.',
      },
    },
  },
  Anger: {
    name: 'Anger',
    color: 'oklch(0.60 0.22 25)',
    position: 6,
    opposite: 'Fear',
    intensities: {
      weak: {
        level: 'weak',
        label: 'Annoyance',
        description:
          'Mild irritation or displeasure, a slight feeling of being bothered.',
      },
      normal: {
        level: 'normal',
        label: 'Anger',
        description:
          'A strong feeling of displeasure, hostility, or antagonism.',
      },
      strong: {
        level: 'strong',
        label: 'Rage',
        description:
          'Violent, uncontrollable anger, an intense fury that overwhelms reason.',
      },
    },
  },
  Anticipation: {
    name: 'Anticipation',
    color: 'oklch(0.75 0.15 50)',
    position: 7,
    opposite: 'Surprise',
    intensities: {
      weak: {
        level: 'weak',
        label: 'Interest',
        description:
          'A mild curiosity or attentiveness toward something.',
      },
      normal: {
        level: 'normal',
        label: 'Anticipation',
        description:
          'A feeling of excited expectation about something that is going to happen.',
      },
      strong: {
        level: 'strong',
        label: 'Vigilance',
        description:
          'Intense watchfulness and readiness, being keenly alert and prepared.',
      },
    },
  },
}

export const PRIMARY_DYADS: Dyad[] = [
  {
    name: 'Optimism',
    primaryEmotions: ['Anticipation', 'Joy'],
    type: 'primary',
    description:
      'A hopeful and confident attitude about the future, combining forward-looking anticipation with present joy.',
  },
  {
    name: 'Love',
    primaryEmotions: ['Joy', 'Trust'],
    type: 'primary',
    description:
      'A deep affection and attachment formed when happiness meets trust and acceptance.',
  },
  {
    name: 'Submission',
    primaryEmotions: ['Trust', 'Fear'],
    type: 'primary',
    description:
      'Yielding to authority or power, where trust in another combines with fear of consequences.',
  },
  {
    name: 'Awe',
    primaryEmotions: ['Fear', 'Surprise'],
    type: 'primary',
    description:
      'Overwhelming wonder mixed with reverence or fear, experienced when surprised by something vast and powerful.',
  },
  {
    name: 'Disapproval',
    primaryEmotions: ['Surprise', 'Sadness'],
    type: 'primary',
    description:
      'A negative judgment or feeling that something is wrong, arising from unexpected disappointment.',
  },
  {
    name: 'Remorse',
    primaryEmotions: ['Sadness', 'Disgust'],
    type: 'primary',
    description:
      'Deep regret and self-reproach for wrongdoing, combining sorrow with self-directed disgust.',
  },
  {
    name: 'Contempt',
    primaryEmotions: ['Disgust', 'Anger'],
    type: 'primary',
    description:
      'A feeling that someone or something is worthless or beneath consideration, merging disgust with anger.',
  },
  {
    name: 'Aggressiveness',
    primaryEmotions: ['Anger', 'Anticipation'],
    type: 'primary',
    description:
      'Hostile or forceful behavior driven by anger combined with forward-moving anticipation.',
  },
]

export const SECONDARY_DYADS: Dyad[] = [
  {
    name: 'Guilt',
    primaryEmotions: ['Joy', 'Fear'],
    type: 'secondary',
    description:
      'Feeling responsible for wrongdoing, where happiness is tainted by fear of consequences.',
  },
  {
    name: 'Curiosity',
    primaryEmotions: ['Trust', 'Surprise'],
    type: 'secondary',
    description:
      'A desire to learn or know something, combining trust in exploration with the element of surprise.',
  },
  {
    name: 'Despair',
    primaryEmotions: ['Fear', 'Sadness'],
    type: 'secondary',
    description:
      'Complete loss of hope, merging deep sadness with fear about the future.',
  },
  {
    name: 'Unbelief',
    primaryEmotions: ['Surprise', 'Disgust'],
    type: 'secondary',
    description:
      'Rejection or inability to accept something as true, mixing surprise with disgust.',
  },
  {
    name: 'Envy',
    primaryEmotions: ['Sadness', 'Anger'],
    type: 'secondary',
    description:
      'Resentful desire for what others have, combining sorrow over lack with anger at unfairness.',
  },
  {
    name: 'Cynicism',
    primaryEmotions: ['Disgust', 'Anticipation'],
    type: 'secondary',
    description:
      'Distrustful attitude expecting the worst, where disgust meets pessimistic anticipation.',
  },
  {
    name: 'Pride',
    primaryEmotions: ['Anger', 'Joy'],
    type: 'secondary',
    description:
      'Deep satisfaction derived from achievements, mixing joy with aggressive self-assertion.',
  },
  {
    name: 'Fatalism',
    primaryEmotions: ['Anticipation', 'Sadness'],
    type: 'secondary',
    description:
      'Belief that all events are predetermined and inevitable, combining anticipation with resignation.',
  },
  {
    name: 'Hope',
    primaryEmotions: ['Anticipation', 'Trust'],
    type: 'secondary',
    description:
      'Confident expectation of positive outcomes, combining forward-looking anticipation with trust in favorable results.',
  },
]

export const TERTIARY_DYADS: Dyad[] = [
  {
    name: 'Delight',
    primaryEmotions: ['Joy', 'Surprise'],
    type: 'tertiary',
    description:
      'Great pleasure and satisfaction from something unexpected and wonderful.',
  },
  {
    name: 'Sentimentality',
    primaryEmotions: ['Trust', 'Sadness'],
    type: 'tertiary',
    description:
      'Tender feelings about the past, mixing trust and acceptance with gentle sadness.',
  },
  {
    name: 'Shame',
    primaryEmotions: ['Fear', 'Disgust'],
    type: 'tertiary',
    description:
      'Painful feeling of humiliation from awareness of wrong or foolish behavior.',
  },
  {
    name: 'Outrage',
    primaryEmotions: ['Surprise', 'Anger'],
    type: 'tertiary',
    description:
      'Intense anger aroused by something perceived as unjust or offensive.',
  },
  {
    name: 'Pessimism',
    primaryEmotions: ['Sadness', 'Anticipation'],
    type: 'tertiary',
    description:
      'Tendency to expect the worst, combining current sadness with negative future expectations.',
  },
  {
    name: 'Morbidness',
    primaryEmotions: ['Disgust', 'Joy'],
    type: 'tertiary',
    description:
      'Unhealthy interest in disturbing subjects, mixing disgust with perverse pleasure.',
  },
  {
    name: 'Dominance',
    primaryEmotions: ['Anger', 'Trust'],
    type: 'tertiary',
    description:
      'Power and influence over others, combining anger-driven assertion with trust in authority.',
  },
  {
    name: 'Anxiety',
    primaryEmotions: ['Anticipation', 'Fear'],
    type: 'tertiary',
    description:
      'Worried anticipation of future threats, where forward-thinking meets apprehension.',
  },
]

export const OPPOSITE_DYADS: Dyad[] = [
  {
    name: 'Conflict (Joy-Sadness)',
    primaryEmotions: ['Joy', 'Sadness'],
    type: 'opposite',
    description:
      'Opposing emotions creating internal conflict between happiness and sorrow.',
  },
  {
    name: 'Ambivalence (Trust-Disgust)',
    primaryEmotions: ['Trust', 'Disgust'],
    type: 'opposite',
    description:
      'Contradictory feelings of acceptance and revulsion toward the same thing.',
  },
  {
    name: 'Frozen (Fear-Anger)',
    primaryEmotions: ['Fear', 'Anger'],
    type: 'opposite',
    description:
      'Paralysis from opposing impulses to flee or fight, creating emotional gridlock.',
  },
  {
    name: 'Bewilderment (Surprise-Anticipation)',
    primaryEmotions: ['Surprise', 'Anticipation'],
    type: 'opposite',
    description:
      'Confusion from unexpected events clashing with expectations.',
  },
]

export const ALL_DYADS: Dyad[] = [
  ...PRIMARY_DYADS,
  ...SECONDARY_DYADS,
  ...TERTIARY_DYADS,
  ...OPPOSITE_DYADS,
]

export const EMOTION_ORDER: PrimaryEmotion[] = [
  'Joy',
  'Trust',
  'Fear',
  'Surprise',
  'Sadness',
  'Disgust',
  'Anger',
  'Anticipation',
]

function normalizeEmotionPair(
  a: PrimaryEmotion,
  b: PrimaryEmotion
): [PrimaryEmotion, PrimaryEmotion] {
  const aIndex = EMOTION_ORDER.indexOf(a)
  const bIndex = EMOTION_ORDER.indexOf(b)
  return aIndex <= bIndex ? [a, b] : [b, a]
}

function areAdjacent(a: PrimaryEmotion, b: PrimaryEmotion): boolean {
  const aPos = EMOTIONS[a].position
  const bPos = EMOTIONS[b].position
  const diff = Math.abs(aPos - bPos)
  return diff === 1 || diff === 7
}

function getEmotionDistance(a: PrimaryEmotion, b: PrimaryEmotion): number {
  const aPos = EMOTIONS[a].position
  const bPos = EMOTIONS[b].position
  const diff = Math.abs(aPos - bPos)
  return Math.min(diff, 8 - diff)
}

export function getDyad(
  emotionA: PrimaryEmotion,
  emotionB: PrimaryEmotion
): Dyad | null {
  if (emotionA === emotionB) {
    return null
  }

  const [first, second] = normalizeEmotionPair(emotionA, emotionB)

  const dyad = ALL_DYADS.find(
    (d) =>
      (d.primaryEmotions[0] === first && d.primaryEmotions[1] === second) ||
      (d.primaryEmotions[0] === second && d.primaryEmotions[1] === first)
  )

  return dyad || null
}

export function getDyadsByType(type: Dyad['type']): Dyad[] {
  return ALL_DYADS.filter(d => d.type === type)
}

export function getEmotionColor(
  emotion: PrimaryEmotion,
  intensity: IntensityLevel
): string {
  const baseColor = EMOTIONS[emotion].color

  switch (intensity) {
    case 'weak':
      return baseColor.replace(/oklch\(([\d.]+)/, 'oklch($1').replace(/oklch\(([\d.]+) ([\d.]+)/, 'oklch($1 calc($2 * 0.4)')
    case 'normal':
      return baseColor.replace(/oklch\(([\d.]+) ([\d.]+)/, 'oklch($1 calc($2 * 0.7)')
    case 'strong':
      return baseColor
  }
}

export function getOpposite(emotion: PrimaryEmotion): PrimaryEmotion {
  return EMOTIONS[emotion].opposite
}

export function getAllEmotions(): EmotionData[] {
  return EMOTION_ORDER.map((name) => EMOTIONS[name])
}
