import { Button, DialogWrapper } from '@components'
import { useProjectContext } from '@context'
import { useState } from 'react'
import { FieldWrapper } from './field-wrapper'
import { ImageSelector } from './image-selector'

export const ProjectSettingsButton = () => {
  const { color } = useProjectContext()
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => setIsOpen(true)

  return (
    <>
      <Button icon='settings' onClick={handleClick}>
        Project Settings
      </Button>

      <DialogWrapper title='Project Settings' icon='settings' open={isOpen} onOpenChange={setIsOpen}>
        <FieldWrapper label='Cover image'>
          <ImageSelector />
        </FieldWrapper>

        <FieldWrapper label='Color palette'>
          <div className='w-full h-10 rounded-lg border border-white/20' style={{ backgroundColor: color }} />
        </FieldWrapper>
      </DialogWrapper>
    </>
  )
}
