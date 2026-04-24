import { ColorInput } from '@components'
import { useEditableFieldContext } from '@context'
import { useGlobalStateRefresh } from '@hooks'
import { useState } from 'react'

export const ColorSelector = () => {
  const { field, setField, isBeingDeleted } = useEditableFieldContext()
  const [pickerColor, setPickerColor] = useState(field?.color!)

  useGlobalStateRefresh(latest => {
    if (!latest || !field) return

    const newField = { ...field, color: pickerColor }
    setField(newField)
  }, pickerColor)

  return (
    <ColorInput color={field?.color || pickerColor} onChange={setPickerColor} disabled={isBeingDeleted} />
  )
}
