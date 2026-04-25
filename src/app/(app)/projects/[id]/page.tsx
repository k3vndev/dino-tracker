'use client'

import { AppShell, NotFoundScreen } from '@components'
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
        <NotFoundScreen
          text='Project Not Found'
          isLoading={!hydrated}
          linkButton={{
            label: 'Back to Projects',
            href: '/projects'
          }}
        />
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
