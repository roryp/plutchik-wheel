import { useState } from 'react'
import { PlutchikWheel } from '@/components/PlutchikWheel'
import { CenterHub } from '@/components/CenterHub'
import { SelectionPanel } from '@/components/SelectionPanel'
import { DyadBrowser } from '@/components/DyadBrowser'
import { Button } from '@/components/ui/button'
import { X, Info } from '@phosphor-icons/react'
import {
  PrimaryEmotion,
  IntensityLevel,
  getDyad,
  Dyad,
} from '@/lib/emotionModel'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface EmotionSelection {
  emotion: PrimaryEmotion
  intensity: IntensityLevel
}

function App() {
  const [selectedEmotions, setSelectedEmotions] = useState<EmotionSelection[]>(
    []
  )
  const [currentDyad, setCurrentDyad] = useState<Dyad | null>(null)

  const handleEmotionSelect = (
    emotion: PrimaryEmotion,
    intensity: IntensityLevel
  ) => {
    setSelectedEmotions((prev) => {
      const existingIndex = prev.findIndex((s) => s.emotion === emotion)

      if (existingIndex >= 0) {
        if (prev[existingIndex].intensity === intensity) {
          const newSelections = prev.filter((s) => s.emotion !== emotion)
          updateDyad(newSelections)
          return newSelections
        } else {
          const newSelections = [...prev]
          newSelections[existingIndex] = { emotion, intensity }
          updateDyad(newSelections)
          return newSelections
        }
      }

      if (prev.length >= 2) {
        const newSelections = [{ emotion, intensity }]
        updateDyad(newSelections)
        return newSelections
      }

      const newSelections = [...prev, { emotion, intensity }]
      updateDyad(newSelections)
      return newSelections
    })
  }

  const updateDyad = (selections: EmotionSelection[]) => {
    if (selections.length === 2) {
      const dyad = getDyad(selections[0].emotion, selections[1].emotion)
      setCurrentDyad(dyad)
    } else {
      setCurrentDyad(null)
    }
  }

  const handleClearSelection = () => {
    setSelectedEmotions([])
    setCurrentDyad(null)
  }

  const handleDyadSelect = (emotions: [PrimaryEmotion, PrimaryEmotion]) => {
    const newSelections: EmotionSelection[] = [
      { emotion: emotions[0], intensity: 'normal' },
      { emotion: emotions[1], intensity: 'normal' },
    ]
    setSelectedEmotions(newSelections)
    updateDyad(newSelections)
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Plutchik Wheel Explorer
          </h1>
          <div className="flex items-center justify-center gap-2">
            <p className="text-sm text-muted-foreground max-w-2xl">
              Explore Robert Plutchik's emotion wheel to understand primary
              emotions, their intensities, and how they combine into complex
              feelings.
            </p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="More information"
                  >
                    <Info size={18} />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-xs">
                    Click emotion segments to explore intensities. Select two
                    emotions to discover their dyad combination, or browse all
                    dyads in the Dyad Browser tab.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </header>

        <div className="grid lg:grid-cols-[1fr,400px] gap-6 items-start">
          <div className="space-y-6">
            <div className="relative">
              <PlutchikWheel
                selectedEmotions={selectedEmotions}
                onEmotionSelect={handleEmotionSelect}
                showConnection={true}
              />
            </div>

            <div className="max-w-2xl mx-auto">
              <CenterHub
                selectedEmotion={
                  selectedEmotions.length === 1
                    ? selectedEmotions[0]
                    : undefined
                }
                dyad={currentDyad}
              />
            </div>

            {selectedEmotions.length > 0 && (
              <div className="flex justify-center">
                <Button
                  onClick={handleClearSelection}
                  variant="outline"
                  className="gap-2"
                >
                  <X size={16} weight="bold" />
                  Clear Selection
                </Button>
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-6">
            <Tabs defaultValue="selection" className="h-[700px] flex flex-col">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="selection">Selection</TabsTrigger>
                <TabsTrigger value="browser">Dyad Browser</TabsTrigger>
              </TabsList>
              <TabsContent value="selection" className="flex-1 mt-4">
                <SelectionPanel
                  selectedEmotions={selectedEmotions}
                  dyad={currentDyad}
                />
              </TabsContent>
              <TabsContent value="browser" className="flex-1 mt-4 overflow-hidden">
                <DyadBrowser
                  onDyadSelect={handleDyadSelect}
                  selectedDyad={currentDyad}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <footer className="text-center text-xs text-muted-foreground pt-8 border-t border-border">
          <p>
            Based on Robert Plutchik's psychoevolutionary theory of emotion (1980)
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App