import { Button, DialogWrapper } from '@components'
import { useState } from 'react'
import { ColorSelector } from './color-selector'
import { FieldWrapper } from './field-wrapper'
import { ImageSelector } from './image-selector'

export const ProjectSettingsButton = () => {
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
          <ColorSelector />
        </FieldWrapper>

        <Button className='mt-8 justify-self-end' icon='cross' primary onClick={() => setIsOpen(false)}>
          All Done
        </Button>
      </DialogWrapper>
    </>
  )
}
