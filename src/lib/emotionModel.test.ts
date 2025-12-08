import { describe, it, expect } from 'vitest'
import {
  getDyad,
  getOpposite,
  EMOTIONS,
  EMOTION_ORDER,
  PrimaryEmotion,
} from './emotionModel'

describe('emotionModel', () => {
  describe('getDyad', () => {
    it('should return Optimism for Anticipation + Joy', () => {
      const dyad = getDyad('Anticipation', 'Joy')
      expect(dyad).not.toBeNull()
      expect(dyad?.name).toBe('Optimism')
      expect(dyad?.primaryEmotions).toContain('Anticipation')
      expect(dyad?.primaryEmotions).toContain('Joy')
    })

    it('should return Optimism for Joy + Anticipation (order independent)', () => {
      const dyad = getDyad('Joy', 'Anticipation')
      expect(dyad).not.toBeNull()
      expect(dyad?.name).toBe('Optimism')
    })

    it('should return Love for Joy + Trust', () => {
      const dyad = getDyad('Joy', 'Trust')
      expect(dyad).not.toBeNull()
      expect(dyad?.name).toBe('Love')
    })

    it('should return Submission for Trust + Fear', () => {
      const dyad = getDyad('Trust', 'Fear')
      expect(dyad).not.toBeNull()
      expect(dyad?.name).toBe('Submission')
    })

    it('should return Awe for Fear + Surprise', () => {
      const dyad = getDyad('Fear', 'Surprise')
      expect(dyad).not.toBeNull()
      expect(dyad?.name).toBe('Awe')
    })

    it('should return Disapproval for Surprise + Sadness', () => {
      const dyad = getDyad('Surprise', 'Sadness')
      expect(dyad).not.toBeNull()
      expect(dyad?.name).toBe('Disapproval')
    })

    it('should return Remorse for Sadness + Disgust', () => {
      const dyad = getDyad('Sadness', 'Disgust')
      expect(dyad).not.toBeNull()
      expect(dyad?.name).toBe('Remorse')
    })

    it('should return Contempt for Disgust + Anger', () => {
      const dyad = getDyad('Disgust', 'Anger')
      expect(dyad).not.toBeNull()
      expect(dyad?.name).toBe('Contempt')
    })

    it('should return Aggressiveness for Anger + Anticipation', () => {
      const dyad = getDyad('Anger', 'Anticipation')
      expect(dyad).not.toBeNull()
      expect(dyad?.name).toBe('Aggressiveness')
    })

    it('should return null for same emotion', () => {
      const dyad = getDyad('Joy', 'Joy')
      expect(dyad).toBeNull()
    })

    it('should return null for non-adjacent emotions', () => {
      const dyad = getDyad('Joy', 'Sadness')
      expect(dyad).toBeNull()
    })

    it('should return null for Joy + Fear (not adjacent)', () => {
      const dyad = getDyad('Joy', 'Fear')
      expect(dyad).toBeNull()
    })

    it('should return null for Trust + Anger (not adjacent)', () => {
      const dyad = getDyad('Trust', 'Anger')
      expect(dyad).toBeNull()
    })

    it('should handle all valid primary dyads', () => {
      const validPairs: Array<[PrimaryEmotion, PrimaryEmotion, string]> = [
        ['Anticipation', 'Joy', 'Optimism'],
        ['Joy', 'Trust', 'Love'],
        ['Trust', 'Fear', 'Submission'],
        ['Fear', 'Surprise', 'Awe'],
        ['Surprise', 'Sadness', 'Disapproval'],
        ['Sadness', 'Disgust', 'Remorse'],
        ['Disgust', 'Anger', 'Contempt'],
        ['Anger', 'Anticipation', 'Aggressiveness'],
      ]

      validPairs.forEach(([emotion1, emotion2, expectedName]) => {
        const dyad = getDyad(emotion1, emotion2)
        expect(dyad).not.toBeNull()
        expect(dyad?.name).toBe(expectedName)
      })
    })
  })

  describe('getOpposite', () => {
    it('should return Sadness as opposite of Joy', () => {
      expect(getOpposite('Joy')).toBe('Sadness')
    })

    it('should return Joy as opposite of Sadness', () => {
      expect(getOpposite('Sadness')).toBe('Joy')
    })

    it('should return Disgust as opposite of Trust', () => {
      expect(getOpposite('Trust')).toBe('Disgust')
    })

    it('should return Trust as opposite of Disgust', () => {
      expect(getOpposite('Disgust')).toBe('Trust')
    })

    it('should return Anger as opposite of Fear', () => {
      expect(getOpposite('Fear')).toBe('Anger')
    })

    it('should return Fear as opposite of Anger', () => {
      expect(getOpposite('Anger')).toBe('Fear')
    })

    it('should return Anticipation as opposite of Surprise', () => {
      expect(getOpposite('Surprise')).toBe('Anticipation')
    })

    it('should return Surprise as opposite of Anticipation', () => {
      expect(getOpposite('Anticipation')).toBe('Surprise')
    })

    it('should have reciprocal opposites', () => {
      EMOTION_ORDER.forEach((emotion) => {
        const opposite = getOpposite(emotion)
        const oppositeOfOpposite = getOpposite(opposite)
        expect(oppositeOfOpposite).toBe(emotion)
      })
    })
  })

  describe('EMOTIONS data structure', () => {
    it('should have 8 primary emotions', () => {
      expect(Object.keys(EMOTIONS)).toHaveLength(8)
      expect(EMOTION_ORDER).toHaveLength(8)
    })

    it('should have unique positions for each emotion', () => {
      const positions = EMOTION_ORDER.map((e) => EMOTIONS[e].position)
      const uniquePositions = new Set(positions)
      expect(uniquePositions.size).toBe(8)
    })

    it('should have positions from 0 to 7', () => {
      const positions = EMOTION_ORDER.map((e) => EMOTIONS[e].position)
      positions.forEach((pos) => {
        expect(pos).toBeGreaterThanOrEqual(0)
        expect(pos).toBeLessThan(8)
      })
    })

    it('should have three intensity levels for each emotion', () => {
      EMOTION_ORDER.forEach((emotion) => {
        const data = EMOTIONS[emotion]
        expect(data.intensities.weak).toBeDefined()
        expect(data.intensities.normal).toBeDefined()
        expect(data.intensities.strong).toBeDefined()
      })
    })

    it('should have proper intensity labels for Joy', () => {
      const joy = EMOTIONS.Joy
      expect(joy.intensities.weak.label).toBe('Serenity')
      expect(joy.intensities.normal.label).toBe('Joy')
      expect(joy.intensities.strong.label).toBe('Ecstasy')
    })

    it('should have proper intensity labels for Fear', () => {
      const fear = EMOTIONS.Fear
      expect(fear.intensities.weak.label).toBe('Apprehension')
      expect(fear.intensities.normal.label).toBe('Fear')
      expect(fear.intensities.strong.label).toBe('Terror')
    })

    it('should have color defined for each emotion', () => {
      EMOTION_ORDER.forEach((emotion) => {
        expect(EMOTIONS[emotion].color).toBeDefined()
        expect(EMOTIONS[emotion].color).toMatch(/oklch/)
      })
    })

    it('should have descriptions for all intensity levels', () => {
      EMOTION_ORDER.forEach((emotion) => {
        const data = EMOTIONS[emotion]
        expect(data.intensities.weak.description).toBeTruthy()
        expect(data.intensities.normal.description).toBeTruthy()
        expect(data.intensities.strong.description).toBeTruthy()
      })
    })
  })

  describe('adjacency logic', () => {
    it('should recognize adjacent emotions in sequence', () => {
      const adjacentPairs: Array<[PrimaryEmotion, PrimaryEmotion]> = [
        ['Joy', 'Trust'],
        ['Trust', 'Fear'],
        ['Fear', 'Surprise'],
        ['Surprise', 'Sadness'],
        ['Sadness', 'Disgust'],
        ['Disgust', 'Anger'],
        ['Anger', 'Anticipation'],
      ]

      adjacentPairs.forEach(([e1, e2]) => {
        const dyad = getDyad(e1, e2)
        expect(dyad).not.toBeNull()
      })
    })

    it('should recognize wrap-around adjacency (Anticipation + Joy)', () => {
      const dyad = getDyad('Anticipation', 'Joy')
      expect(dyad).not.toBeNull()
      expect(dyad?.name).toBe('Optimism')
    })

    it('should not recognize opposite emotions as adjacent', () => {
      const oppositePairs: Array<[PrimaryEmotion, PrimaryEmotion]> = [
        ['Joy', 'Sadness'],
        ['Trust', 'Disgust'],
        ['Fear', 'Anger'],
        ['Surprise', 'Anticipation'],
      ]

      oppositePairs.forEach(([e1, e2]) => {
        const dyad = getDyad(e1, e2)
        expect(dyad).toBeNull()
      })
    })
  })
})
