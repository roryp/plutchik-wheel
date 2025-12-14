import { useState } from 'react'
import {
  Dyad,
  PrimaryEmotion,
  PRIMARY_DYADS,
  SECONDARY_DYADS,
  TERTIARY_DYADS,
  OPPOSITE_DYADS,
} from '@/lib/emotionModel'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { ArrowRight } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'

interface DyadBrowserProps {
  onDyadSelect: (emotions: [PrimaryEmotion, PrimaryEmotion]) => void
  selectedDyad: Dyad | null
}

export function DyadBrowser({ onDyadSelect, selectedDyad }: DyadBrowserProps) {
  const [activeTab, setActiveTab] = useState<Dyad['type']>('primary')

  const getDyadTypeDescription = (type: Dyad['type']): string => {
    switch (type) {
      case 'primary':
        return 'Adjacent emotions (1 step apart)'
      case 'secondary':
        return 'Emotions with 1 emotion between them (2 steps apart)'
      case 'tertiary':
        return 'Emotions with 2 emotions between them (3 steps apart)'
      case 'opposite':
        return 'Emotions directly across from each other (4 steps apart)'
    }
  }

  const getDyadList = (type: Dyad['type']): Dyad[] => {
    switch (type) {
      case 'primary':
        return PRIMARY_DYADS
      case 'secondary':
        return SECONDARY_DYADS
      case 'tertiary':
        return TERTIARY_DYADS
      case 'opposite':
        return OPPOSITE_DYADS
    }
  }

  const renderDyadList = (dyads: Dyad[]) => {
    return (
      <div className="space-y-2">
        {dyads.map((dyad) => {
          const isSelected =
            selectedDyad?.name === dyad.name &&
            selectedDyad?.type === dyad.type

          return (
            <Button
              key={`${dyad.type}-${dyad.name}`}
              onClick={() => onDyadSelect(dyad.primaryEmotions)}
              variant={isSelected ? 'default' : 'outline'}
              className="w-full justify-start text-left h-auto py-3 px-4"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold">{dyad.name}</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>{dyad.primaryEmotions[0]}</span>
                    <ArrowRight size={12} weight="bold" />
                    <span>{dyad.primaryEmotions[1]}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {dyad.description}
                </p>
              </div>
            </Button>
          )
        })}
      </div>
    )
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl">Dyad Browser</CardTitle>
        <p className="text-sm text-muted-foreground">
          Explore emotional combinations and select to highlight on the wheel
        </p>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as Dyad['type'])}
          className="h-full flex flex-col"
        >
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="primary" className="text-xs">
              Primary
              <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-[10px]">
                {PRIMARY_DYADS.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="secondary" className="text-xs">
              Secondary
              <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-[10px]">
                {SECONDARY_DYADS.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="tertiary" className="text-xs">
              Tertiary
              <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-[10px]">
                {TERTIARY_DYADS.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="opposite" className="text-xs">
              Opposite
              <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-[10px]">
                {OPPOSITE_DYADS.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <div className="mb-3 p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground">
              {getDyadTypeDescription(activeTab)}
            </p>
          </div>

          {(['primary', 'secondary', 'tertiary', 'opposite'] as const).map(
            (type) => (
              <TabsContent
                key={type}
                value={type}
                className="flex-1 overflow-y-auto mt-0 pr-2"
              >
                {renderDyadList(getDyadList(type))}
              </TabsContent>
            )
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
}
