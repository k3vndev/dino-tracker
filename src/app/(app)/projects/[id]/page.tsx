'use client'

import { AppShell, Icon } from '@components'
import { DataDisplay } from '@components/data-display'
import { ProjectViewEditable } from '@components/projects/view'
import { AddChart as AddChartButton } from '@components/projects/view/buttons'
import { ProjectSettingsButton } from '@components/projects/view/buttons/project-settings'
import { RegisterData as RegisterDataButton } from '@components/projects/view/buttons/register-data'
import { ProjectContext } from '@context'
import { useProjectsStore } from '@store'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

export default function ProjectViewPage() {
  // Grab the project ID from the URL params
  const projects = useProjectsStore(s => s.projects)
  const { id } = useParams()
  const project = useMemo(() => projects.find(p => p.id === id), [id, projects])
  const hydrated = useProjectsStore(s => s.hydrated)

  if (!project) {
    return (
      <AppShell>
        <section className='flex items-center text-white text-center font-poppins flex-col w-full justify-center gap-2 size-64 bg-white/5 rounded-xl border border-white/10 backdrop-blur-xs'>
          {hydrated ? (
            <>
              <h2 className='font-semibold text-2xl'>404</h2>
              <h1 className='font-bold text-4xl'>Project Not Found</h1>
            </>
          ) : (
            <Icon name='loading' className='size-16 animate-spin' />
          )}
        </section>
      </AppShell>
    )
  }

  return (
    <ProjectContext.Provider value={project}>
      <AppShell className='gap-0'>
        <ProjectViewEditable {...project} />

        <section className='flex sm:items-center not-sm:flex-col w-full lg:gap-4 gap-2 flex-wrap mt-4 animation-slide-in-from-bottom'>
          <RegisterDataButton />
          <ProjectSettingsButton />
          <AddChartButton />
        </section>

        <section className='flex items-center flex-col gap-4 mt-8'>
          {project.dataDisplay?.map((dataDisplay, index) => (
            <DataDisplay key={index} {...dataDisplay} index={index} />
          ))}
        </section>
      </AppShell>
    </ProjectContext.Provider>
  )
}
