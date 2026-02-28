'use client'

import { MainWrapper } from '@components'
import { ProjectEditable } from '@components/projects'
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
        <h1 className='text-white font-poppins text-4xl'>Project Not Found</h1>
      </MainWrapper>
    )
  }

  return (
    <MainWrapper>
      <ProjectEditable {...p} />
    </MainWrapper>
  )
}
