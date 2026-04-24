import { COLORS } from '@consts'

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * COLORS.length)
  return COLORS[randomIndex].toLowerCase()
}
