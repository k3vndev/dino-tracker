'use client'

import { AppShell } from '@components'
import { CreateProjectButton, ProjectTile } from '@components/projects'
import { DashboardContext } from '@context'
import { useProjectsStore } from '@store'
import { DateTime } from 'luxon'
import { useMemo, useState } from 'react'

export default function ProjectsPage() {
  const [projectsDisabled, setProjectsDisabled] = useState(false)
  const projects = useProjectsStore(s => s.projects)

  // Sort projects by last updated date
  const sortedProjects = useMemo(
    () =>
      projects.toSorted((a, b) => {
        if (!a.updatedAt) return 1
        if (!b.updatedAt) return -1

        return DateTime.fromISO(b.updatedAt).toMillis() - DateTime.fromISO(a.updatedAt).toMillis()
      }),
    [projects]
  )

  return (
    <DashboardContext.Provider value={{ projectsDisabled, setProjectsDisabled }}>
      <AppShell>
        <CreateProjectButton />

        <section className='grid 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
          {sortedProjects.map((project, index) => (
            <ProjectTile key={project.id} data={project} index={index} />
          ))}
        </section>
      </AppShell>
    </DashboardContext.Provider>
  )
}
