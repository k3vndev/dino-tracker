'use client'

import { Button, DialogWrapper } from '@components'
import { useProjectsStore } from '@store'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useProjectContext } from '@/context'
import { ColorSelector } from './color-selector'
import { FieldWrapper } from './field-wrapper'
import { ImageSelector } from './image-selector'

export const ProjectSettingsButton = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const { id: projectId } = useProjectContext()
  const setProjects = useProjectsStore(s => s.setProjects)
  const router = useRouter()

  const deleteProject = () => {
    setProjects(prev => prev.filter(p => p.id !== projectId))
    router.push('/projects')
  }

  return (
    <>
      <Button icon='settings' onClick={() => setIsSettingsOpen(true)}>
        Project Settings
      </Button>

      <DialogWrapper
        title='Project Settings'
        icon='settings'
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
      >
        <FieldWrapper label='Cover image'>
          <ImageSelector />
        </FieldWrapper>

        <FieldWrapper label='Color palette'>
          <ColorSelector />
        </FieldWrapper>

        <div className='flex items-center gap-4 mt-8 w-full justify-between'>
          <Button onClick={() => setDeleteIsOpen(true)} icon='trash'>
            Delete Project
          </Button>

          <DialogWrapper
            title='Delete project?'
            icon='trash'
            open={deleteIsOpen}
            onOpenChange={setDeleteIsOpen}
            className={{
              content: 'sm:max-w-100 sm:min-w-0 w-fit'
            }}
          >
            <p className='text-lg text-muted-foreground text-center'>
              This action cannot be undone. All your tasks and data will be lost.
            </p>

            <div className='flex items-center justify-between w-full mt-4'>
              <Button onClick={deleteProject} icon='trash'>
                Yes, delete it
              </Button>
              <Button onClick={() => setDeleteIsOpen(false)} primary icon='cross'>
                Cancel
              </Button>
            </div>
          </DialogWrapper>

          <Button icon='check' primary onClick={() => setIsSettingsOpen(false)}>
            All Done
          </Button>
        </div>
      </DialogWrapper>
    </>
  )
}
