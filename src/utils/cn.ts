import { twMerge } from 'tailwind-merge'

/** Utility function to merge Tailwind CSS classes. */
export const cn = (...classes: (string | boolean | undefined)[]) => twMerge(classes.filter(Boolean).join(' '))
