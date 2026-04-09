import { Button, DropDownSelect, Icon } from '@components'
import { useProjectsStore } from '@store'
import type { DataDisplay, IconName } from '@types'
import { useState } from 'react'
import { DATA_DISPLAY_DEFAULT_TITLE } from '@/consts'

interface Props {
  projectId: string
}

export const AddChart = ({ projectId }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const setProjectAttributes = useProjectsStore(s => s.setProjectAttributes)

  const options: Option[] = [
    {
      icon: 'chart',
      label: 'New daily',
      type: 'daily'
    },
    {
      icon: 'hash',
      label: 'New static',
      type: 'static'
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
    <div className='ml-auto relative'>
      <Button icon='plus' primary onPointerDown={() => setIsOpen(true)}>
        Add Chart
      </Button>

      <DropDownSelect
        defaultValue='0'
        items={options}
        onValueChange={handleAddNewChart}
        open={isOpen}
        onOpenChange={setIsOpen}
        valuesGetter={({ type }) => type}
        className={{ trigger: 'translate-y-2 pointer-events-none', item: 'group/select-item py-3 px-2' }}
        elementsRenderer={({ icon, label }) => (
          <>
            <Icon name={icon} className='group-hover/select-item:invert size-5' />
            <span>{label}</span>
          </>
        )}
      />
    </div>
  )
}

interface Option {
  icon: IconName
  label: string
  type: DataDisplay['type']
}
