import { DropdownSelect, type DropdownSelectItem, Icon } from '@components'
import { useDataDisplayContext } from '@context'
import { useProjectsStore } from '@store'
import { useMemo } from 'react'

export const MoreDropdown = () => {
  const { projectId, id: dataDisplayId, projectIndex, dataDisplayIndex } = useDataDisplayContext()
  const setProjectAttributes = useProjectsStore(s => s.setProjectAttributes)
  const projects = useProjectsStore(s => s.projects)

  const options: DropdownSelectItem[] = useMemo(() => {
    const dataDisplayLength = projects[projectIndex]?.dataDisplay?.length
    if (dataDisplayIndex === -1 || !dataDisplayLength) return []

    return [
      {
        label: 'Move up',
        icon: 'arrow',
        className: '[&_.icon]:-rotate-90',
        disabled: dataDisplayIndex === 0
      },
      {
        label: 'Move down',
        icon: 'arrow',
        className: '[&_.icon]:rotate-90',
        disabled: dataDisplayIndex === dataDisplayLength - 1
      },
      {
        label: 'Delete',
        icon: 'trash'
      }
    ]
  }, [projects, projectIndex, dataDisplayIndex])

  const moveDataDisplay = (direction: 'up' | 'down') => {
    setProjectAttributes(projectId, project => {
      const newDataDisplay = structuredClone(project.dataDisplay)
      if (!newDataDisplay || newDataDisplay.length < 2) return {}

      const originalIndex = newDataDisplay.findIndex(d => d.id === dataDisplayId)

      // Check for invalid cases
      if (
        originalIndex === -1 ||
        (direction === 'up' && originalIndex <= 0) ||
        (direction === 'down' && originalIndex >= newDataDisplay.length - 1)
      ) {
        return {}
      }

      // Delete item on its original position and add it to the new position
      const add = direction === 'up' ? -1 : 1
      const originalElement = { ...newDataDisplay[originalIndex] }
      newDataDisplay.splice(originalIndex, 1)
      newDataDisplay.splice(originalIndex + add, 0, originalElement)

      return { dataDisplay: newDataDisplay }
    })
  }

  const handleValueChange = (value: string) => {
    const numeric = +value
    if (numeric >= 2) return

    moveDataDisplay(['up', 'down'][numeric] as any)
  }

  return (
    <div className='relative w-fit'>
      <button className='button'>
        <Icon name='dots-vertical' className='size-6' />
      </button>

      <DropdownSelect
        items={options}
        onValueChange={handleValueChange}
        className={{ content: 'w-fit', group: 'w-full', item: 'w-full' }}
        indexAsValue
      />
    </div>
  )
}
