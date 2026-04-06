import { useEffect, useRef } from 'react'

interface Props {
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => void
}

export const TextInput = ({ value, onChange }: Props) => {
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
      className='bg-black/90 text-white rounded-sm px-3 py-1.5 border border-white/15 focus:border-white/50 outline-0 w-full'
    />
  )
}
