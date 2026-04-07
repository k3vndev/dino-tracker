import { Button } from '@components'
import { useMemo, useState } from 'react'
import { useProjectsStore } from '@/store'
import { DialogWrapper } from '../dialog-wrapper'
import { EditableField } from './editable-field/editable-field'

interface Props {
  projectId: string
}

export const RegisterData = ({ projectId }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const projects = useProjectsStore(s => s.projects)

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

  return (
    <>
      <Button icon='chart' primary className='relative' onClick={handleClick}>
        Register Data
      </Button>

      {customFields && (
        <DialogWrapper open={isOpen} onOpenChange={handleOpenChange} title='Register Data' icon='chart'>
          <ul className='flex flex-col overflow-x-hidden overflow-y-scroll max-h-80 border border-white/15 rounded-l-xl'>
            {customFields.map((field, index) => (
              <EditableField {...field} index={index} key={field.id} projectId={projectId} />
            ))}
          </ul>
        </DialogWrapper>
      )}
    </>
  )
}
