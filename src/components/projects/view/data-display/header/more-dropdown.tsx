import { DropdownSelect, type DropdownSelectItem, Icon } from '@components'
import { useDataDisplayContext } from '@context'
import { useProjectsStore } from '@store'
import { useMemo } from 'react'

export const MoreDropdown = () => {
  const { projectId, id: dataDisplayId, projectIndex, dataDisplayIndex } = useDataDisplayContext()
  const setProjectAttributes = useProjectsStore(s => s.setProjectAttributes)
  const projects = useProjectsStore(s => s.projects)

  const options: DropdownSelectItem[] = useMemo(() => {
    const dataDisplayLength = projects[projectIndex]?.dataDisplay?.length ?? 0
    if (dataDisplayIndex === -1 || dataDisplayLength === 0) return []

    return [
      {
        value: 'move-up',
        label: 'Move up',
        icon: 'arrow',
        className: '[&_.icon]:-rotate-90',
        disabled: dataDisplayIndex === 0
      },
      {
        value: 'move-down',
        label: 'Move down',
        icon: 'arrow',
        className: '[&_.icon]:rotate-90',
        disabled: dataDisplayIndex === dataDisplayLength - 1
      },
      {
        value: 'delete',
        label: 'Delete',
        icon: 'trash',
        disabled: (projects[projectIndex]?.dataDisplay?.length ?? 0) <= 1
      }
    ]
  }, [projects, projectIndex, dataDisplayIndex])

  const moveDataDisplay = (direction: 'up' | 'down') => {
    setProjectAttributes(projectId, project => {
      const newDataDisplay = structuredClone(project.dataDisplay)
      if (!newDataDisplay || newDataDisplay.length < 2) return {}

      if (
        dataDisplayIndex === -1 ||
        (direction === 'up' && dataDisplayIndex <= 0) ||
        (direction === 'down' && dataDisplayIndex >= newDataDisplay.length - 1)
      ) {
        return {}
      }

      const add = direction === 'up' ? -1 : 1
      const originalElement = { ...newDataDisplay[dataDisplayIndex] }
      newDataDisplay.splice(dataDisplayIndex, 1)
      newDataDisplay.splice(dataDisplayIndex + add, 0, originalElement)

      return { dataDisplay: newDataDisplay }
    })
  }

  const deleteDataDisplay = () => {
    setProjectAttributes(projectId, project => {
      const dataDisplay = project.dataDisplay ?? []
      const newDataDisplay = dataDisplay.filter(dd => dd.id !== dataDisplayId)

      if (newDataDisplay.length === dataDisplay.length) return {}
      return { dataDisplay: newDataDisplay }
    })
  }

  const handleValueChange = (value: string) => {
    switch (value) {
      case 'move-up':
        moveDataDisplay('up')
        break
      case 'move-down':
        moveDataDisplay('down')
        break
      case 'delete':
        deleteDataDisplay()
        break
      default:
        break
    }
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
      />
    </div>
  )
}
