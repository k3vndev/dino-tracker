import { Button } from '@components'
import { useMemo, useState } from 'react'
import { CUSTOM_FIELD_DEFAULT_NAME } from '@/consts'
import { useProjectsStore } from '@/store'
import type { CustomField } from '@/types'
import { getRandomColor } from '@/utils'
import { DialogWrapper } from '../dialog-wrapper'
import { EditableField } from './editable-field/editable-field'

interface Props {
  projectId: string
}

export const RegisterData = ({ projectId }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const projects = useProjectsStore(s => s.projects)
  const setProjectAttributes = useProjectsStore(s => s.setProjectAttributes)

  const customFields = useMemo(() => {
    const thisProject = projects.find(p => p.id === projectId)
    if (!thisProject) return null

    return thisProject.customFields ?? []
  }, [projectId, projects])

  const handleClick = () => {
    setIsOpen(true)
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
  }

  const addNewField = (type: 'daily' | 'static') => {
    const id = crypto.randomUUID()
    const color = getRandomColor()
    const name = CUSTOM_FIELD_DEFAULT_NAME
    const value = type === 'daily' ? [] : null
    const newField = { id, name, type, color, value } as CustomField

    const updatedFields = customFields ? [newField, ...customFields] : [newField]
    setProjectAttributes(projectId, { customFields: updatedFields })
  }

  return (
    <>
      <Button icon='chart' primary className='relative' onClick={handleClick}>
        Register Data
      </Button>

      {customFields && (
        <DialogWrapper open={isOpen} onOpenChange={handleOpenChange} title='Register Data' icon='chart'>
          <ul className='flex flex-col overflow-x-hidden overflow-y-scroll max-h-80 border border-white/15 rounded-l-xl'>
            {customFields.map(({ id }, index) => (
              <EditableField index={index} key={id} fieldId={id} projectId={projectId} />
            ))}
          </ul>

          <div className='flex items-center gap-4'>
            <Button icon='chart' primary onClick={() => addNewField('daily')}>
              New Daily
            </Button>
            <Button icon='hash' primary onClick={() => addNewField('static')}>
              New Static
            </Button>
          </div>
        </DialogWrapper>
      )}
    </>
  )
}
