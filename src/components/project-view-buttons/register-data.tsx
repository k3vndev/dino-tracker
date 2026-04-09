import { Button } from '@components'
import { CUSTOM_FIELD_DEFAULT_NAME } from '@consts'
import { useProjectsStore } from '@store'
import type { CustomField } from '@types'
import { getRandomColor } from '@utils'
import { useEffect, useMemo, useRef, useState } from 'react'
import { DialogWrapper } from '../dialog-wrapper'
import { EditableField } from './editable-field'

interface Props {
  projectId: string
}

export const RegisterData = ({ projectId }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const projects = useProjectsStore(s => s.projects)
  const setProjectAttributes = useProjectsStore(s => s.setProjectAttributes)
  const [buttonsDisabled, setButtonsDisabled] = useState(false)
  const disabledTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [deletingFieldsIds, setDeletingFieldsIds] = useState<string[]>([])

  const customFields = useMemo(() => {
    const thisProject = projects.find(p => p.id === projectId)
    if (!thisProject) return null

    return thisProject.customFields ?? []
  }, [projectId, projects])

  const project = useMemo(() => projects.find(p => p.id === projectId), [projectId, projects])

  const handleClickMainButton = () => setIsOpen(true)
  const handleOpenChange = (open: boolean) => setIsOpen(open)

  const addNewField = (type: 'daily' | 'static') => {
    if (buttonsDisabled) return

    const id = crypto.randomUUID()
    const color = getRandomColor()
    const name = CUSTOM_FIELD_DEFAULT_NAME
    const value = type === 'daily' ? [] : null
    const newField = { id, name, type, color, value } as CustomField

    const updatedFields = customFields ? [newField, ...customFields] : [newField]
    setProjectAttributes(projectId, { customFields: updatedFields })

    // Disable buttons for 250ms to prevent rapid clicks
    setButtonsDisabled(true)
    disabledTimeoutRef.current = setTimeout(() => {
      setButtonsDisabled(false)
    }, 250)
  }

  useEffect(() => {
    return () => {
      if (disabledTimeoutRef.current) {
        clearTimeout(disabledTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (deletingFieldsIds.length > 0 && !isOpen) {
      // Delete fields
      const updatedFields = customFields?.filter(field => !deletingFieldsIds.includes(field.id)) ?? []
      setProjectAttributes(projectId, { customFields: updatedFields })

      setDeletingFieldsIds([])
    }
  }, [deletingFieldsIds, isOpen])

  return (
    <>
      <Button icon='chart' primary className='relative' onClick={handleClickMainButton}>
        Register Data
      </Button>

      {customFields && (
        <DialogWrapper
          open={isOpen}
          onOpenChange={handleOpenChange}
          title='Register Data'
          icon='chart'
          ariaDescription="Register your data by creating custom fields. You can create daily fields that allow you to input values for specific dates, or static fields for information that doesn't change over time."
        >
          <ul className='flex flex-col overflow-x-hidden overflow-y-scroll max-h-80 border border-white/15 rounded-l-xl'>
            {customFields.length ? (
              customFields.map(({ id }, index) => (
                <EditableField
                  index={index}
                  key={id}
                  fieldId={id}
                  project={project}
                  deletingFieldsIds={deletingFieldsIds}
                  setDeletingFieldsIds={setDeletingFieldsIds}
                />
              ))
            ) : (
              <div className='text-white/50 text-center py-12 px-4 bg-white/5 font-plus'>
                No custom fields yet. Create one by clicking the buttons below!
              </div>
            )}
          </ul>

          <div className='flex items-center gap-4'>
            <Button icon='chart' primary onClick={() => addNewField('daily')} disabled={buttonsDisabled}>
              New Daily
            </Button>
            <Button icon='hash' primary onClick={() => addNewField('static')} disabled={buttonsDisabled}>
              New Static
            </Button>
          </div>
        </DialogWrapper>
      )}
    </>
  )
}
