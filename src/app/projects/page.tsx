'use client'

import { AppShell, Button } from '@components'
import { ProjectTile } from '@components/projects'
import { ProjectsContext } from '@context'
import { useProjectsStore } from '@store'
import { useState } from 'react'

export default function ProjectsPage() {
  const [projectsDisabled, setProjectsDisabled] = useState(false)
  const projects = useProjectsStore(s => s.projects)

  return (
    <ProjectsContext.Provider value={{ projectsDisabled, setProjectsDisabled }}>
      <AppShell>
        <Button icon='plus' primary>
          New Project
        </Button>

        <section className='grid grid-cols-3 gap-4'>
          {projects.map((project, index) => (
            <ProjectTile key={project.id} data={project} index={index} />
          ))}
        </section>
      </AppShell>
    </ProjectsContext.Provider>
  )
}
