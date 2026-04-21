import { Button, DialogWrapper } from '@components'
import { useProjectContext } from '@context'
import Image from 'next/image'
import { useState } from 'react'
import { Label } from './label'

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
        <Label>
          <span>Cover image</span>

          <div className='w-full h-30 rounded-lg border border-white/20 overflow-clip'>
            <Image
              src={'/burger-sample.jpg'}
              alt='Cover Image'
              width={400}
              height={100}
              className='w-full max-h-full object-cover blur-[2px] opacity-50'
            />
          </div>
        </Label>

        <Label>
          <span>Color palette</span>
          <div className='w-full h-10 rounded-lg border border-white/20' style={{ backgroundColor: color }} />
        </Label>
      </DialogWrapper>
    </>
  )
}
