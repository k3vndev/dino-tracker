'use client'

import { Button, MainWrapper } from '@components'
import { ProjectViewEditable } from '@components/projects'
import { useProjectsStore } from '@store'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

export default function ProjectViewPage() {
  // Grab the project ID from the URL params
  const projects = useProjectsStore(s => s.projects)
  const { id } = useParams()
  const p = useMemo(() => projects.find(p => p.id === id), [id, projects])

  if (!p) {
    return (
      <MainWrapper>
        <section className='flex items-center text-white text-center font-poppins flex-col w-full justify-center gap-2 size-64 bg-white/5 rounded-xl border border-white/10 backdrop-blur-xs'>
          <h2 className='font-semibold text-2xl'>404</h2>
          <h1 className='font-bold text-4xl'>Project Not Found</h1>
        </section>
      </MainWrapper>
    )
  }

  return (
    <MainWrapper>
      <ProjectViewEditable {...p} />

      <section className='flex items-center w-full gap-4 flex-wrap'>
        <Button icon='chart' primary>
          Register Data
        </Button>
        <Button icon='settings'>Project Settings</Button>
        <Button icon='plus' primary className='ml-auto'>
          Add Chart
        </Button>
      </section>
    </MainWrapper>
  )
}
