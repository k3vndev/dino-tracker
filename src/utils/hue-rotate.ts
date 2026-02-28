const clampDegree = (degree: number) => {
  const normalized = degree % 360
  return normalized < 0 ? normalized + 360 : normalized
}

const normalizeHex = (hexColor: string) => {
  const value = hexColor.trim().replace('#', '')

  if (/^[0-9a-fA-F]{3}$/.test(value)) {
    return value
      .split('')
      .map(char => `${char}${char}`)
      .join('')
  }

  if (/^[0-9a-fA-F]{6}$/.test(value)) {
    return value
  }

  return null
}

const hexToRgb = (hexColor: string) => {
  const normalized = normalizeHex(hexColor)
  if (!normalized) return null

  const red = parseInt(normalized.slice(0, 2), 16)
  const green = parseInt(normalized.slice(2, 4), 16)
  const blue = parseInt(normalized.slice(4, 6), 16)

  return { red, green, blue }
}

const rgbToHex = (red: number, green: number, blue: number) =>
  `#${[red, green, blue].map(channel => Math.round(channel).toString(16).padStart(2, '0')).join('')}`

const rgbToHsl = (red: number, green: number, blue: number) => {
  const r = red / 255
  const g = green / 255
  const b = blue / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  let hue = 0
  const lightness = (max + min) / 2
  const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1))

  if (delta !== 0) {
    if (max === r) {
      hue = ((g - b) / delta) % 6
    } else if (max === g) {
      hue = (b - r) / delta + 2
    } else {
      hue = (r - g) / delta + 4
    }

    hue *= 60
    if (hue < 0) hue += 360
  }

  return { hue, saturation, lightness }
}

const hslToRgb = (hue: number, saturation: number, lightness: number) => {
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation
  const x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1))
  const m = lightness - chroma / 2

  let rPrime = 0
  let gPrime = 0
  let bPrime = 0

  if (hue >= 0 && hue < 60) {
    rPrime = chroma
    gPrime = x
  } else if (hue >= 60 && hue < 120) {
    rPrime = x
    gPrime = chroma
  } else if (hue >= 120 && hue < 180) {
    gPrime = chroma
    bPrime = x
  } else if (hue >= 180 && hue < 240) {
    gPrime = x
    bPrime = chroma
  } else if (hue >= 240 && hue < 300) {
    rPrime = x
    bPrime = chroma
  } else {
    rPrime = chroma
    bPrime = x
  }

  return {
    red: (rPrime + m) * 255,
    green: (gPrime + m) * 255,
    blue: (bPrime + m) * 255
  }
}

export const hueRotate = (hexColor: string, degree: number) => {
  const rgb = hexToRgb(hexColor)
  if (!rgb) return hexColor

  const hsl = rgbToHsl(rgb.red, rgb.green, rgb.blue)
  const rotatedHue = clampDegree(hsl.hue + degree)
  const rotatedRgb = hslToRgb(rotatedHue, hsl.saturation, hsl.lightness)

  return rgbToHex(rotatedRgb.red, rotatedRgb.green, rotatedRgb.blue)
}
