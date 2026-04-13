'use client'

import { useProjectsStore } from '@store'
import { hueRotate } from '@utils'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type MinMax = {
  min: number
  max: number
}

type Spotlight = {
  size: number
  left: number
  top: number
  animationDuration: number
  opacity: number
  color: string
}

const spotlightsConfig = {
  maxElements: 20,
  maxFailedIterations: 30,
  gap: 10,
  size: { min: 5, max: 40 },
  left: { min: 0, max: 100 },
  top: { min: 0, max: 100 },
  opacity: { min: 0.033, max: 0.15 },
  animationDuration: { min: 5, max: 40 },
  colorRange: { min: -30, max: 30 }
}

const randomInRange = ({ min, max }: MinMax) => Math.random() * (max - min) + min

export const AppSpotlights = () => {
  const pathname = usePathname()
  const [spotlights, setSpotlights] = useState<Spotlight[]>([])
  const projects = useProjectsStore(s => s.projects)

  useEffect(() => {
    const newSpotlights: Spotlight[] = []
    let failedIterations = 0
    let colorToUse = '#5A9BF8'

    // Try to extract a project id from URL and use its color
    const regResult = pathname.match(/\/projects\/([^/?]+)/)?.[1]
    if (regResult) {
      const project = projects.find(p => p.id === regResult)

      if (project?.color) {
        colorToUse = project.color
      }
    }

    // Generate spotlight candidates
    while (
      newSpotlights.length < spotlightsConfig.maxElements &&
      failedIterations < spotlightsConfig.maxFailedIterations
    ) {
      const candidate: Spotlight = {
        size: randomInRange(spotlightsConfig.size),
        left: randomInRange(spotlightsConfig.left),
        top: randomInRange(spotlightsConfig.top),
        opacity: randomInRange(spotlightsConfig.opacity),
        animationDuration: randomInRange(spotlightsConfig.animationDuration),
        color: hueRotate(colorToUse, randomInRange(spotlightsConfig.colorRange))
      }

      const overlaps = newSpotlights.some(item => {
        const dx = candidate.left - item.left
        const dy = candidate.top - item.top
        const distance = Math.hypot(dx, dy)
        const minDistance = candidate.size / 2 + item.size / 2 + spotlightsConfig.gap

        return distance < minDistance
      })

      if (overlaps) {
        failedIterations += 1
        continue
      }

      newSpotlights.push(candidate)
    }

    if (newSpotlights.length < spotlightsConfig.maxElements) {
      console.warn(
        '[InstallSectionBackground] Spiral generation stopped early after reaching max failed iterations.'
      )
    }

    setSpotlights(newSpotlights)
  }, [pathname])

  return (
    <div className='fixed size-full left-0 top-0 z-10 pointer-events-none overflow-clip'>
      {spotlights.map((light, index) => (
        <div
          key={index}
          className='absolute rounded-full aspect-square blur-3xl'
          style={{
            width: `${light.size}vw`,
            height: `${light.size}vw`,
            left: `calc(${light.left}% - ${light.size / 2}%)`,
            top: `calc(${light.top}% - ${light.size / 2}%)`,
            opacity: light.opacity
          }}
        >
          <div
            className='size-full rounded-full animate-pulse'
            style={{
              backgroundColor: light.color,
              animationDuration: `${light.animationDuration}s`
            }}
          />
        </div>
      ))}
    </div>
  )
}
