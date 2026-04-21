import { Button, DropdownSelect, type DropdownSelectItem } from '@components'
import { DATA_DISPLAY_DEFAULT_TITLE } from '@consts'
import { useProjectContext } from '@context'
import { useProjectsStore } from '@store'
import type { DataDisplay, IconName } from '@types'
import { useState } from 'react'

export const AddChart = () => {
  const [isOpen, setIsOpen] = useState(false)
  const setProjectAttributes = useProjectsStore(s => s.setProjectAttributes)
  const { id: projectId } = useProjectContext()

  const options: Option[] = [
    {
      icon: 'chart',
      label: 'New daily',
      value: 'daily'
    },
    {
      icon: 'hash',
      label: 'New static',
      value: 'static'
    }
  ]

  const handleAddNewChart = (value: string) => {
    const newChart: DataDisplay = {
      id: crypto.randomUUID(),
      title: DATA_DISPLAY_DEFAULT_TITLE,
      type: value as DataDisplay['type'],
      fieldIds: []
    }

    setProjectAttributes(projectId, project => ({
      dataDisplay: [newChart, ...(project.dataDisplay ?? [])]
    }))
  }

  return (
    <div className='sm:ml-auto relative'>
      <Button icon='plus' primary onPointerDown={() => setIsOpen(true)}>
        Add Chart
      </Button>

      <DropdownSelect
        items={options}
        onValueChange={handleAddNewChart}
        open={isOpen}
        onOpenChange={setIsOpen}
        className={{
          trigger: 'translate-y-2 pointer-events-none',
          item: 'py-3 px-2'
        }}
      />
    </div>
  )
}

interface Option extends DropdownSelectItem {
  icon: IconName
  label: string
  value: DataDisplay['type']
}
