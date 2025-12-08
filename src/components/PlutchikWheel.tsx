import { useState, useRef, useEffect } from 'react'
import {
  PrimaryEmotion,
  IntensityLevel,
  EMOTIONS,
  EMOTION_ORDER,
  getEmotionColor,
} from '@/lib/emotionModel'

interface EmotionSelection {
  emotion: PrimaryEmotion
  intensity: IntensityLevel
}

interface PlutchikWheelProps {
  selectedEmotions: EmotionSelection[]
  onEmotionSelect: (emotion: PrimaryEmotion, intensity: IntensityLevel) => void
  showConnection?: boolean
}

interface PetalProps {
  emotion: PrimaryEmotion
  index: number
  total: number
  isSelected: boolean
  selectedIntensity?: IntensityLevel
  onSelect: (emotion: PrimaryEmotion, intensity: IntensityLevel) => void
  onHover: (emotion: PrimaryEmotion, intensity: IntensityLevel | null) => void
  isFocused: boolean
  onFocus: () => void
}

const EmotionPetal = ({
  emotion,
  index,
  total,
  isSelected,
  selectedIntensity,
  onSelect,
  onHover,
  isFocused,
  onFocus,
}: PetalProps) => {
  const centerX = 300
  const centerY = 300
  const angleStep = (2 * Math.PI) / total
  const startAngle = index * angleStep - Math.PI / 2
  const endAngle = (index + 1) * angleStep - Math.PI / 2

  const innerRadius = 50
  const midInnerRadius = 100
  const midOuterRadius = 150
  const outerRadius = 220

  const createArc = (
    innerR: number,
    outerR: number,
    startA: number,
    endA: number
  ) => {
    const x1 = centerX + innerR * Math.cos(startA)
    const y1 = centerY + innerR * Math.sin(startA)
    const x2 = centerX + outerR * Math.cos(startA)
    const y2 = centerY + outerR * Math.sin(startA)
    const x3 = centerX + outerR * Math.cos(endA)
    const y3 = centerY + outerR * Math.sin(endA)
    const x4 = centerX + innerR * Math.cos(endA)
    const y4 = centerY + innerR * Math.sin(endA)

    return `M ${x1} ${y1} L ${x2} ${y2} A ${outerR} ${outerR} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerR} ${innerR} 0 0 0 ${x1} ${y1} Z`
  }

  const bands: Array<{
    intensity: IntensityLevel
    path: string
    innerR: number
    outerR: number
  }> = [
    {
      intensity: 'strong',
      path: createArc(innerRadius, midInnerRadius, startAngle, endAngle),
      innerR: innerRadius,
      outerR: midInnerRadius,
    },
    {
      intensity: 'normal',
      path: createArc(midInnerRadius, midOuterRadius, startAngle, endAngle),
      innerR: midInnerRadius,
      outerR: midOuterRadius,
    },
    {
      intensity: 'weak',
      path: createArc(midOuterRadius, outerRadius, startAngle, endAngle),
      innerR: midOuterRadius,
      outerR: outerRadius,
    },
  ]

  const labelAngle = (startAngle + endAngle) / 2
  const labelRadius = outerRadius + 25
  const labelX = centerX + labelRadius * Math.cos(labelAngle)
  const labelY = centerY + labelRadius * Math.sin(labelAngle)

  return (
    <g className="emotion-petal">
      {bands.map((band) => {
        const isThisBandSelected =
          isSelected && selectedIntensity === band.intensity
        const color = getEmotionColor(emotion, band.intensity)
        const intensityData = EMOTIONS[emotion].intensities[band.intensity]

        return (
          <path
            key={`${emotion}-${band.intensity}`}
            d={band.path}
            fill={color}
            stroke={
              isSelected
                ? 'var(--accent)'
                : isThisBandSelected
                ? 'var(--accent)'
                : 'var(--border)'
            }
            strokeWidth={isThisBandSelected ? 3 : isSelected ? 2 : 1}
            className="cursor-pointer transition-all duration-200 hover:brightness-110 hover:scale-[1.02] origin-center"
            style={{
              filter: isSelected ? 'drop-shadow(0 0 8px var(--accent))' : '',
              opacity: isThisBandSelected ? 1 : isSelected ? 0.9 : 0.85,
              outline: isFocused ? '2px dashed var(--accent)' : 'none',
              outlineOffset: '2px',
            }}
            onClick={() => onSelect(emotion, band.intensity)}
            onMouseEnter={() => onHover(emotion, band.intensity)}
            onMouseLeave={() => onHover(emotion, null)}
            onFocus={onFocus}
            tabIndex={0}
            role="button"
            aria-label={`${intensityData.label} (${band.intensity} ${emotion})`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelect(emotion, band.intensity)
              }
            }}
          />
        )
      })}
      <text
        x={labelX}
        y={labelY}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-sm font-medium fill-foreground pointer-events-none select-none"
        style={{ fontSize: '14px' }}
      >
        {emotion}
      </text>
    </g>
  )
}

export const PlutchikWheel = ({
  selectedEmotions,
  onEmotionSelect,
  showConnection = true,
}: PlutchikWheelProps) => {
  const [hoveredEmotion, setHoveredEmotion] = useState<{
    emotion: PrimaryEmotion
    intensity: IntensityLevel
  } | null>(null)
  const [focusedIndex, setFocusedIndex] = useState<number>(-1)
  const svgRef = useRef<SVGSVGElement>(null)

  const handleHover = (emotion: PrimaryEmotion, intensity: IntensityLevel | null) => {
    if (intensity) {
      setHoveredEmotion({ emotion, intensity })
    } else {
      setHoveredEmotion(null)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!svgRef.current) return

      const totalEmotions = EMOTION_ORDER.length
      let newIndex = focusedIndex

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        newIndex = (focusedIndex + 1) % totalEmotions
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        newIndex = (focusedIndex - 1 + totalEmotions) % totalEmotions
      }

      if (newIndex !== focusedIndex) {
        setFocusedIndex(newIndex)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [focusedIndex])

  const renderConnectionArc = () => {
    if (!showConnection || selectedEmotions.length !== 2) return null

    const emotion1 = selectedEmotions[0].emotion
    const emotion2 = selectedEmotions[1].emotion

    const index1 = EMOTION_ORDER.indexOf(emotion1)
    const index2 = EMOTION_ORDER.indexOf(emotion2)

    const angleStep = (2 * Math.PI) / EMOTION_ORDER.length
    const angle1 = index1 * angleStep - Math.PI / 2 + angleStep / 2
    const angle2 = index2 * angleStep - Math.PI / 2 + angleStep / 2

    const radius = 130
    const centerX = 300
    const centerY = 300

    const x1 = centerX + radius * Math.cos(angle1)
    const y1 = centerY + radius * Math.sin(angle1)
    const x2 = centerX + radius * Math.cos(angle2)
    const y2 = centerY + radius * Math.sin(angle2)

    return (
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="var(--accent)"
        strokeWidth="3"
        strokeDasharray="5,5"
        opacity="0.6"
        className="animate-[pulse_2s_ease-in-out_infinite]"
      />
    )
  }

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox="0 0 600 600"
        className="w-full h-full max-w-[600px] max-h-[600px] mx-auto"
        role="img"
        aria-label="Plutchik's Wheel of Emotions"
      >
        <circle
          cx="300"
          cy="300"
          r="240"
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
          opacity="0.3"
        />

        {renderConnectionArc()}

        {EMOTION_ORDER.map((emotion, index) => {
          const selection = selectedEmotions.find((s) => s.emotion === emotion)
          return (
            <EmotionPetal
              key={emotion}
              emotion={emotion}
              index={index}
              total={EMOTION_ORDER.length}
              isSelected={!!selection}
              selectedIntensity={selection?.intensity}
              onSelect={onEmotionSelect}
              onHover={handleHover}
              isFocused={focusedIndex === index}
              onFocus={() => setFocusedIndex(index)}
            />
          )
        })}

        <circle
          cx="300"
          cy="300"
          r="45"
          fill="var(--card)"
          stroke="var(--border)"
          strokeWidth="2"
        />
      </svg>

      {hoveredEmotion && (
        <div
          className="absolute pointer-events-none bg-popover text-popover-foreground px-3 py-2 rounded-md shadow-lg text-sm border border-border z-50"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="font-semibold">{hoveredEmotion.emotion}</div>
          <div className="text-xs text-muted-foreground capitalize">
            {EMOTIONS[hoveredEmotion.emotion].intensities[
              hoveredEmotion.intensity
            ].label}
          </div>
        </div>
      )}
    </div>
  )
}
