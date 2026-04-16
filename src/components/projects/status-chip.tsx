import { DropdownSelect, type DropdownSelectItem } from '@components'
import { PROJECT_STATUSES, PROJECT_STATUSES_ARRAY } from '@consts'
import { useProjectsStore } from '@store'
import type { ProjectStatus } from '@types'
import { cn } from '@utils'
import { useMemo } from 'react'

interface Props {
  status: ProjectStatus
  showBorder?: boolean
  className?: string
  editable?: boolean
  projectId?: string
}

export const StatusChip = ({ status, showBorder = false, className, editable = false, projectId }: Props) => {
  const setProjectAttributes = useProjectsStore(s => s.setProjectAttributes)

  const mainColor = PROJECT_STATUSES[status]
  const bgColor = showBorder ? `${mainColor}40` : 'transparent' // Adding transparency to the main color
  const borderStyle = showBorder ? 'border' : ''

  const handleChange = (newStatus: string) => {
    if (!projectId) return
    setProjectAttributes(projectId, { status: newStatus })
  }

  const selectItems = useMemo(
    () => PROJECT_STATUSES_ARRAY.map(({ color, status }) => ({ color, label: status })),
    []
  ) satisfies DropdownSelectItem[]

  const editableClassName = editable ? 'cursor-pointer button' : 'cursor-default'

  return (
    <div
      className={cn(
        'text-white flex items-center gap-1 rounded-md md:px-3 px-1.5 py-1 relative',
        editableClassName,
        borderStyle,
        className
      )}
      style={{ borderColor: mainColor, background: bgColor }}
    >
      <div className={`size-3 min-w-3 rounded-full`} style={{ background: mainColor }} />
      <small className='text-nowrap md:text-xs text-[10px] font-poppins'>{status}</small>

      {/* Select component */}
      {editable && (
        <DropdownSelect
          onValueChange={handleChange}
          label='Change status'
          items={selectItems}
          elementsRenderer={({ label, color }) => (
            <>
              <div className='size-4 rounded-full border border-white/75' style={{ background: color }} />
              <span>{label}</span>
            </>
          )}
        />
      )}
    </div>
  )
}
