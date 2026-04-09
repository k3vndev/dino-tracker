import { Icon } from '@components'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui'
import { useEditableFieldContext } from '@context'
import { useGlobalStateRefresh } from '@hooks'
import { validateColor } from '@utils'
import { useEffect, useState } from 'react'
import { HexColorPicker } from 'react-colorful'

export const ColorSelector = () => {
  const { field, setField, isBeingDeleted } = useEditableFieldContext()
  const [pickerColor, setPickerColor] = useState(field?.color!)
  const [inputValue, setInputValue] = useState(pickerColor)

  useGlobalStateRefresh(latest => {
    if (!latest || !field) return

    const newField = { ...field, color: pickerColor }
    setField(newField)
  }, pickerColor)

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
    setInputValue(pickerColor)
  }, [pickerColor])

  return (
    <Popover>
      <PopoverTrigger
        style={{ background: field?.color }}
        className='size-8 min-w-8 rounded-full cursor-pointer button flex items-center justify-center group'
        title='Change color'
        disabled={isBeingDeleted}
      >
        <Icon
          name='palette'
          className='size-[70%] group-hover:opacity-60 opacity-0 transition pointer-events-none'
        />
      </PopoverTrigger>

      <PopoverContent className='popover-menu flex flex-col'>
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
