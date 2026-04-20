import type { Project } from '@types'
import { StateSetter, type ValueOrCallback } from '@utils'
import { create } from 'zustand'
import { MOCK_PROJECTS } from '@/mock-projects'

type ProjectKey = keyof Omit<Project, 'id'>
type Attributes = Partial<Record<ProjectKey, Project[ProjectKey]>>

interface ProjectsStore {
  projects: Project[]
  setProjects: (projects: ValueOrCallback<Project[]>) => void

  /** A helper function to update specific attributes of a project by its ID. */
  setProjectAttributes: (id: string, attributes: Attributes | ((project: Project) => Attributes)) => void
}

export const useProjectsStore = create<ProjectsStore>(set => {
  const { setState } = new StateSetter<ProjectsStore>(set)

  return {
    projects: MOCK_PROJECTS,
    setProjects: projects => setState('projects', projects),

    setProjectAttributes: (id, attributes) =>
      set(state => {
        const prev = structuredClone(state.projects)
        const projectIndex = prev.findIndex(p => p.id === id)

        // Check if the project exists before attempting to update it
        if (projectIndex === -1) {
          console.warn(`Project with ID ${id} not found.`)
          return {}
        }

        // Handle attributes
        let attr: Attributes
        if (typeof attributes === 'function') {
          attr = attributes(state.projects[projectIndex])
        } else {
          attr = attributes
        }

        // Update the specific project with the new attributes while keeping the rest of its data intact
        prev[projectIndex] = {
          ...prev[projectIndex],
          ...(attr as Partial<Omit<Project, 'id'>>)
        }
        return { projects: prev }
      })
  }
})
