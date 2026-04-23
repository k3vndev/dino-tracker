'use client'

import { Icon } from '@components'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui'
import { cn, validateColor } from '@utils'
import { useEffect, useState } from 'react'
import { HexColorPicker } from 'react-colorful'

interface Props {
  color: string
  onChange: (color: string) => void
  disabled?: boolean
  title?: string
  className?: {
    trigger?: string
    content?: string
  }
}

export const ColorInput = ({ color, onChange, disabled, title, className }: Props) => {
  const [pickerColor, setPickerColor] = useState(color)
  const [inputValue, setInputValue] = useState(pickerColor)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const { value } = e.target
    const { isValid } = validateColor(value)

    if (isValid) {
      setPickerColor(value)
      return
    }
    setInputValue(value)
  }

  const handleInputBlur = () => {
    const { isValid, validated } = validateColor(inputValue)

    if (!isValid) {
      setInputValue(pickerColor)
      return
    }
    setPickerColor(validated)
  }

  useEffect(() => {
    onChange(pickerColor)
  }, [pickerColor])

  useEffect(() => {
    if (color === pickerColor) return

    setPickerColor(color)
    setInputValue(color)
  }, [color])

  return (
    <Popover>
      <PopoverTrigger
        style={{ background: pickerColor }}
        className={cn(
          'size-8 min-w-8 rounded-full cursor-pointer button flex items-center justify-center group',
          className?.trigger
        )}
        title={title ?? 'Change color'}
        disabled={disabled}
      >
        <Icon
          name='palette'
          className='size-[70%] group-hover:opacity-60 opacity-0 transition pointer-events-none'
        />
      </PopoverTrigger>

      <PopoverContent className={cn('popover-menu flex flex-col', className?.content)}>
        <h3 className='font-poppins mb-2'>Select color</h3>
        <HexColorPicker className='min-w-full' color={pickerColor} onChange={setPickerColor} />
        <input
          className='border border-white/15 focus:border-white/40 outline-none py-1 px-3 font-mono text-lg rounded-md mt-3'
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
      </PopoverContent>
    </Popover>
  )
}
