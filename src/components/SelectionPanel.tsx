import {
  PrimaryEmotion,
  IntensityLevel,
  EMOTIONS,
  Dyad,
  getOpposite,
} from '@/lib/emotionModel'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'

interface SelectionPanelProps {
  selectedEmotions: Array<{
    emotion: PrimaryEmotion
    intensity: IntensityLevel
  }>
  dyad?: Dyad | null
}

export const SelectionPanel = ({
  selectedEmotions,
  dyad,
}: SelectionPanelProps) => {
  if (dyad && selectedEmotions.length === 2) {
    return (
      <Card className="p-6 h-full">
        <ScrollArea className="h-full">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Dyad Information
              </h3>
              <Badge variant="secondary" className="mb-3 capitalize">
                {dyad.type} Dyad
              </Badge>
            </div>

            <div>
              <h4 className="emotion-heading text-2xl font-semibold text-foreground mb-2">
                {dyad.name}
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Combination of {dyad.primaryEmotions[0]} and{' '}
                {dyad.primaryEmotions[1]}
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                {dyad.description}
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Component Emotions
              </h4>

              {selectedEmotions.map((selection, index) => {
                const emotionData = EMOTIONS[selection.emotion]
                const intensityData =
                  emotionData.intensities[selection.intensity]

                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border-2"
                        style={{
                          backgroundColor: emotionData.color,
                          borderColor: emotionData.color,
                        }}
                      />
                      <h5 className="font-semibold text-foreground">
                        {selection.emotion}
                      </h5>
                      <Badge
                        variant="outline"
                        className="text-xs"
                        style={{
                          backgroundColor: `${emotionData.color}33`,
                          borderColor: emotionData.color,
                          color: 'var(--foreground)',
                        }}
                      >
                        {intensityData.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">
                      {intensityData.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </ScrollArea>
      </Card>
    )
  }

  if (selectedEmotions.length === 1) {
    const selection = selectedEmotions[0]
    const emotionData = EMOTIONS[selection.emotion]
    const intensityData = emotionData.intensities[selection.intensity]
    const opposite = getOpposite(selection.emotion)

    return (
      <Card className="p-6 h-full">
        <ScrollArea className="h-full">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full border-2"
                style={{
                  backgroundColor: emotionData.color,
                  borderColor: emotionData.color,
                }}
              />
              <h3 className="text-lg font-semibold text-foreground">
                {selection.emotion}
              </h3>
            </div>

            <div>
              <h4 className="emotion-heading text-2xl font-semibold text-foreground mb-2">
                {intensityData.label}
              </h4>
              <Badge
                variant="outline"
                className="mb-3"
                style={{
                  backgroundColor: emotionData.color,
                  color: 'white',
                  borderColor: emotionData.color,
                }}
              >
                {selection.intensity} intensity
              </Badge>
            </div>

            <p className="text-sm text-foreground leading-relaxed">
              {intensityData.description}
            </p>

            <Separator />

            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                All Intensities
              </h4>

              {(['strong', 'normal', 'weak'] as IntensityLevel[]).map(
                (level) => {
                  const intensity = emotionData.intensities[level]
                  const isCurrent = level === selection.intensity

                  return (
                    <div
                      key={level}
                      className={`p-3 rounded-md border ${
                        isCurrent
                          ? 'bg-accent/10 border-accent'
                          : 'bg-muted/30 border-border'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm text-foreground">
                          {intensity.label}
                        </span>
                        <Badge
                          variant="secondary"
                          className="text-xs capitalize"
                        >
                          {level}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {intensity.description}
                      </p>
                    </div>
                  )
                }
              )}
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                Opposite Emotion
              </h4>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border-2"
                  style={{
                    backgroundColor: EMOTIONS[opposite].color,
                    borderColor: EMOTIONS[opposite].color,
                  }}
                />
                <span className="text-sm font-medium text-foreground">
                  {opposite}
                </span>
              </div>
            </div>
          </div>
        </ScrollArea>
      </Card>
    )
  }

  return (
    <Card className="p-6 h-full bg-muted/30 border-dashed">
      <div className="space-y-4 text-center">
        <h3 className="text-lg font-semibold text-muted-foreground">
          No Selection
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Click on any emotion segment in the wheel to view detailed information
          about that emotion and its intensity level.
        </p>
        <Separator />
        <p className="text-xs text-muted-foreground">
          💡 Tip: Select two adjacent emotions to discover how they combine into
          a dyad emotion.
        </p>
      </div>
    </Card>
  )
}
