import { cn } from '@utils'
import { useEffect, useRef } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => void
}

export const TextInput = ({ value = '', onChange, className, ...props }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    requestAnimationFrame(() => {
      inputRef.current?.blur()
    })
  }, [])

  return (
    <input
      ref={inputRef}
      {...{ value, onChange }}
      className={cn(
        'bg-black/90 text-white rounded-lg px-3 py-2 border border-white/10 focus:border-white/50 outline-0 w-full placeholder:text-white/30',
        className
      )}
      {...props}
    />
  )
}
