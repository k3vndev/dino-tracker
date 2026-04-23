import { hueRotate } from './hue-rotate'

export const getProjectBg = (color?: string, img?: string) => {
  const image = img ? `url(${img})` : undefined

  const grOpacity = 0.35
  const grHueOffset = 30

  const grOpacityHex = Math.round(grOpacity * 255)
    .toString(16)
    .padStart(2, '0')

  // Create a linear gradient with hue rotation for a dynamic background effect
  const gradient = color
    ? `linear-gradient(to bottom right, ${hueRotate(color, grHueOffset)}${grOpacityHex}, ${hueRotate(color, -grHueOffset)}${grOpacityHex})`
    : `#000000${grOpacityHex}`

  return {
    gradient,
    image
  }
}
