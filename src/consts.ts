import { Plus_Jakarta_Sans, Poppins } from 'next/font/google'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export const FONT_VARIABLES = [poppins, plusJakartaSans].map(font => font.variable).join(' ')
