'use client'

import { Button, MainWrapper } from '@components'
import { ProjectTile } from '@components/projects'
import { useProjectsStore } from '@store'

export default function ProjectsPage() {
  const projects = useProjectsStore(s => s.projects)

  return (
    <MainWrapper>
      <Button icon='plus' primary>
        New Project
      </Button>

      <section className='grid grid-cols-3 gap-4'>
        {projects.map((project, index) => (
          <ProjectTile key={project.id} data={project} index={index} />
        ))}
      </section>
    </MainWrapper>
  )
}
