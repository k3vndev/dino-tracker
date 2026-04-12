import { DropDownSelect } from '@components'
import { PROJECT_STATUSES, PROJECT_STATUSES_ARRAY } from '@consts'
import { useProjectsStore } from '@store'
import type { ProjectStatus } from '@types'
import { cn } from '@utils'

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
        <DropDownSelect
          defaultValue={status}
          onValueChange={handleChange}
          label='Change status'
          items={PROJECT_STATUSES_ARRAY}
          valuesGetter={({ status }) => status}
          elementsRenderer={({ status, color }) => (
            <>
              <div className='size-4 rounded-full border border-white/75' style={{ background: color }} />
              <span>{status}</span>
            </>
          )}
        />
      )}
    </div>
  )
}
