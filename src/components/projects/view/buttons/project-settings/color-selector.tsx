import { ColorInput } from '@components'
import { COLORS } from '@consts'
import { useProjectContext } from '@context'
import { useGlobalStateRefresh } from '@hooks'
import { useProjectsStore } from '@store'
import { getRandomColor } from '@utils'
import { useState } from 'react'

export const ColorSelector = () => {
  const { color, id: projectId } = useProjectContext()
  const [pickerColor, setPickerColor] = useState(color ?? getRandomColor())
  const setProjectAttributes = useProjectsStore(s => s.setProjectAttributes)

  useGlobalStateRefresh(latest => {
    if (!latest) return
    setProjectAttributes(projectId, { color: pickerColor })
  }, pickerColor)

  return (
    <div className='h-fit w-full flex items-center sm:gap-4 gap-2'>
      <ColorInput
        color={color || pickerColor}
        onChange={setPickerColor}
        className={{ trigger: 'sm:min-h-16 sm:size-16 sm:min-w-16 min-h-12 size-12 min-w-12' }}
      />

      <div className='w-0 h-full border-r-2 border-dashed border-white/20' />

      <ul className='grid gap-1 grid-cols-5 h-full sm:w-fit w-full'>
        {COLORS.map(c => (
          <li
            key={c}
            className='sm:w-16 w-full rounded-sm button'
            style={{ backgroundColor: c }}
            onClick={() => setPickerColor(c)}
          />
        ))}
      </ul>
    </div>
  )
}
