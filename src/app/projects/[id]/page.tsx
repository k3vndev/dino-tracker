'use client'

import { AppShell, Button } from '@components'
import { DataDisplay } from '@components/data-display'
import { ProjectViewEditable } from '@components/projects'
import { useProjectsStore } from '@store'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { RegisterData as RegisterDataButton } from '@/components/project-view-buttons/register-data'

export default function ProjectViewPage() {
  // Grab the project ID from the URL params
  const projects = useProjectsStore(s => s.projects)
  const { id } = useParams()
  const p = useMemo(() => projects.find(p => p.id === id), [id, projects])

  if (!p) {
    return (
      <AppShell>
        <section className='flex items-center text-white text-center font-poppins flex-col w-full justify-center gap-2 size-64 bg-white/5 rounded-xl border border-white/10 backdrop-blur-xs'>
          <h2 className='font-semibold text-2xl'>404</h2>
          <h1 className='font-bold text-4xl'>Project Not Found</h1>
        </section>
      </AppShell>
    )
  }

  return (
    <AppShell className='gap-0'>
      <ProjectViewEditable {...p} />

      <section className='flex items-center w-full lg:gap-4 gap-2 flex-wrap mt-4'>
        <RegisterDataButton projectId={p.id} />
        <Button icon='settings'>Project Settings</Button>
        <Button icon='plus' primary className='ml-auto'>
          Add Chart
        </Button>
      </section>

      <section className='flex items-center flex-col gap-4 mt-8'>
        {p.dataDisplay?.map((dataDisplay, index) => (
          <DataDisplay key={index} {...dataDisplay} projectId={p.id} />
        ))}
      </section>
    </AppShell>
  )
}
