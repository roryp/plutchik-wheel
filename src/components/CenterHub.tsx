import { PrimaryEmotion, IntensityLevel, EMOTIONS, Dyad } from '@/lib/emotionModel'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface CenterHubProps {
  selectedEmotion?: {
    emotion: PrimaryEmotion
    intensity: IntensityLevel
  }
  dyad?: Dyad | null
}

export const CenterHub = ({ selectedEmotion, dyad }: CenterHubProps) => {
  if (dyad) {
    return (
      <Card className="p-6 text-center space-y-3 bg-card border-2 border-accent/30 shadow-lg">
        <Badge variant="secondary" className="text-xs uppercase tracking-wide">
          {dyad.type} Dyad
        </Badge>
        <h2 className="emotion-heading text-3xl font-semibold text-foreground">
          {dyad.name}
        </h2>
        <p className="text-sm text-muted-foreground">
          {dyad.primaryEmotions[0]} + {dyad.primaryEmotions[1]}
        </p>
        <p className="text-sm text-foreground leading-relaxed pt-2">
          {dyad.description}
        </p>
      </Card>
    )
  }

  if (selectedEmotion) {
    const emotionData = EMOTIONS[selectedEmotion.emotion]
    const intensityData = emotionData.intensities[selectedEmotion.intensity]

    return (
      <Card className="p-6 text-center space-y-3 bg-card border-2 border-primary/20 shadow-lg">
        <Badge
          variant="outline"
          className="text-xs uppercase tracking-wide"
          style={{
            backgroundColor: emotionData.color,
            color: 'white',
            borderColor: emotionData.color,
          }}
        >
          {selectedEmotion.intensity}
        </Badge>
        <h2 className="emotion-heading text-3xl font-semibold text-foreground">
          {intensityData.label}
        </h2>
        <p className="text-sm text-muted-foreground font-medium">
          {selectedEmotion.emotion}
        </p>
        <p className="text-sm text-foreground leading-relaxed pt-2">
          {intensityData.description}
        </p>
      </Card>
    )
  }

  return (
    <Card className="p-6 text-center space-y-3 bg-card/50 border-dashed">
      <h2 className="emotion-heading text-2xl font-semibold text-muted-foreground">
        Select an Emotion
      </h2>
      <p className="text-sm text-muted-foreground">
        Click any segment on the wheel to explore emotions and their intensities.
      </p>
      <p className="text-xs text-muted-foreground pt-2">
        Select two adjacent emotions to discover their dyad.
      </p>
    </Card>
  )
}
