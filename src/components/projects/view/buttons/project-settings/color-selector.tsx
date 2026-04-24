import { ColorInput } from '@components'
import { COLORS } from '@consts'
import { useProjectContext } from '@context'
import { useGlobalStateRefresh } from '@hooks'
import { useProjectsStore } from '@store'
import { randomColor } from '@utils'
import { useState } from 'react'

export const ColorSelector = () => {
  const { color, id: projectId } = useProjectContext()
  const [pickerColor, setPickerColor] = useState(color ?? randomColor())
  const setProjectAttributes = useProjectsStore(s => s.setProjectAttributes)

  useGlobalStateRefresh(latest => {
    if (!latest) return
    setProjectAttributes(projectId, { color: pickerColor })
  }, pickerColor)

  return (
    <div className='h-fit w-full flex items-center sm:gap-8 gap-3'>
      <ColorInput
        color={color || pickerColor}
        onChange={setPickerColor}
        className={{ trigger: 'sm:min-h-20 sm:size-20 sm:min-w-20 min-h-12 size-12 min-w-12' }}
      />

      <div className='w-0 h-2/3 border-r-2 border-dashed border-white/20' />

      <ul className='grid grid-cols-5 h-full w-full rounded-sm overflow-clip gap-0.5'>
        {COLORS.map(c => (
          <li
            key={c}
            className='w-full button'
            style={{ backgroundColor: c }}
            onClick={() => setPickerColor(c)}
          />
        ))}
      </ul>
    </div>
  )
}
