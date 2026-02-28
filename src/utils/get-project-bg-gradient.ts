import { hueRotate } from './hue-rotate'

export const getProjectBgGradient = (hexColor?: string) => {
  const hueOffset = 30
  const opacity = 0.3

  const opacityHex = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0')

  if (!hexColor) return `#000000${opacityHex}`

  return `linear-gradient(to bottom right, ${hueRotate(hexColor, hueOffset)}${opacityHex}, ${hueRotate(hexColor, -hueOffset)}${opacityHex})`
}
