import { COLORS } from '@consts'

export const randomColor = () => {
  const randomIndex = Math.floor(Math.random() * COLORS.length)
  return COLORS[randomIndex].toLowerCase()
}
