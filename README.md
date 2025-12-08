# Plutchik Wheel Explorer

An interactive web application for exploring **Robert Plutchik's Wheel of Emotions**, a psychoevolutionary theory of emotion developed in 1980. This tool helps users understand primary emotions, their varying intensities, and how emotions combine to form complex emotional states.

## What is Plutchik's Wheel?

Robert Plutchik's emotion wheel is a psychological model that organizes emotions in a circular pattern, similar to a color wheel. The model proposes that:

1. **There are 8 primary emotions** arranged in a circle, with opposing emotions directly across from each other
2. **Each emotion has three levels of intensity**, from mild (outer ring) to intense (inner ring)
3. **Adjacent emotions can combine** to form more complex "dyad" emotions

This model helps us understand that emotions exist on a spectrum and that complex feelings often arise from combinations of simpler, primary emotions.

## Features

### Interactive Emotion Wheel
- **Visual representation**: SVG-based circular wheel with 8 "petals" (one per primary emotion)
- **Three intensity levels per emotion**: Outer (weak), middle (normal), and inner (strong)
- **Color-coded segments**: Each emotion has a distinct color that varies by intensity
- **Hover tooltips**: See emotion names and intensity labels as you explore
- **Click to select**: Choose any emotion segment to view detailed information

### Single Emotion Exploration
When you select one emotion, you can:
- View the specific intensity label (e.g., "Serenity" vs "Ecstasy" for Joy)
- Read a description of what that emotion feels like
- See all three intensity levels for that emotion
- Discover the opposite emotion on the wheel

### Dyad Discovery
Select two **adjacent** emotions to discover their combination:
- **8 primary dyads** are supported (e.g., Joy + Trust = Love)
- Visual connection shows the relationship between the two emotions
- Detailed explanation of the combined emotion
- View both component emotions and how they interact

### Accessibility
- **Full keyboard navigation**: Use Tab and Arrow keys to navigate, Enter/Space to select
- **ARIA labels**: Screen reader friendly with descriptive labels
- **Color-independent design**: Selection states use borders and visual indicators beyond color
- **Responsive layout**: Works on mobile, tablet, and desktop

## The 8 Primary Emotions

1. **Joy** (weak: Serenity → normal: Joy → strong: Ecstasy)
2. **Trust** (weak: Acceptance → normal: Trust → strong: Admiration)
3. **Fear** (weak: Apprehension → normal: Fear → strong: Terror)
4. **Surprise** (weak: Distraction → normal: Surprise → strong: Amazement)
5. **Sadness** (weak: Pensiveness → normal: Sadness → strong: Grief)
6. **Disgust** (weak: Boredom → normal: Disgust → strong: Loathing)
7. **Anger** (weak: Annoyance → normal: Anger → strong: Rage)
8. **Anticipation** (weak: Interest → normal: Anticipation → strong: Vigilance)

### Opposite Pairs
- Joy ↔ Sadness
- Trust ↔ Disgust
- Fear ↔ Anger
- Surprise ↔ Anticipation

## Primary Dyads

When adjacent emotions combine, they create these dyads:

| Dyad | Component Emotions |
|------|-------------------|
| **Optimism** | Anticipation + Joy |
| **Love** | Joy + Trust |
| **Submission** | Trust + Fear |
| **Awe** | Fear + Surprise |
| **Disapproval** | Surprise + Sadness |
| **Remorse** | Sadness + Disgust |
| **Contempt** | Disgust + Anger |
| **Aggressiveness** | Anger + Anticipation |

## How to Run

This is a React + TypeScript application built with Vite.

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Data Model Structure

The application is built on a well-structured data model located in `src/lib/emotionModel.ts`.

### Core Types

```typescript
type PrimaryEmotion = 
  'Joy' | 'Trust' | 'Fear' | 'Surprise' | 
  'Sadness' | 'Disgust' | 'Anger' | 'Anticipation'

type IntensityLevel = 'weak' | 'normal' | 'strong'

interface EmotionData {
  name: PrimaryEmotion
  color: string              // OKLCH color value
  intensities: {
    weak: EmotionIntensity
    normal: EmotionIntensity
    strong: EmotionIntensity
  }
  position: number           // 0-7, position on wheel
  opposite: PrimaryEmotion   // Opposite emotion
}

interface Dyad {
  name: string
  primaryEmotions: [PrimaryEmotion, PrimaryEmotion]
  type: 'primary'
  description: string
}
```

### Key Functions

**`getDyad(emotionA, emotionB): Dyad | null`**
- Takes two primary emotions
- Returns the dyad if they are adjacent, or `null` if not
- Order-independent (A+B equals B+A)

**`getOpposite(emotion): PrimaryEmotion`**
- Returns the opposite emotion for any primary emotion

**`getEmotionColor(emotion, intensity): string`**
- Returns the OKLCH color value for a specific emotion at a specific intensity

## Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn components
│   ├── PlutchikWheel.tsx      # Main wheel SVG component
│   ├── CenterHub.tsx          # Central display panel
│   └── SelectionPanel.tsx     # Side panel with details
├── lib/
│   ├── emotionModel.ts        # Core data model and logic
│   ├── emotionModel.test.ts   # Unit tests
│   └── utils.ts               # Utility functions
├── App.tsx                    # Main application component
└── index.css                  # Global styles and theme
```

## Testing

The emotion model has comprehensive unit tests covering:
- All 8 primary dyad combinations
- Order independence (A+B = B+A)
- Invalid combinations (same emotion, non-adjacent emotions)
- Opposite emotion relationships
- Data structure integrity

Run tests with:
```bash
npm test
```

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - UI component library
- **Vitest** - Testing framework
- **Phosphor Icons** - Icon library

## Design Philosophy

The application follows these design principles:
- **Educational clarity**: Make complex psychological concepts approachable
- **Exploratory interaction**: Invite curiosity through intuitive interactions
- **Visual hierarchy**: Use typography, color, and spacing to guide understanding
- **Accessibility-first**: Ensure everyone can access emotional education

## References

- Plutchik, R. (1980). *Emotion: A Psychoevolutionary Synthesis*. Harper & Row.
- Plutchik, R. (2001). The Nature of Emotions. *American Scientist*, 89(4), 344-350.

## License

MIT License - see LICENSE file for details

## Contributing

Contributions are welcome! Areas for enhancement:
- Additional dyad types (secondary, tertiary)
- Localization/internationalization
- Animation improvements
- Additional educational content
- Mobile touch gesture improvements

---

**Note**: This is an educational tool for understanding emotional theory. It is not a substitute for professional mental health advice or therapy.
