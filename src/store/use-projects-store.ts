import type { Project } from '@types'
import { StateSetter, type ValueOrCallback } from '@utils'
import { create } from 'zustand'
import { MOCK_PROJECTS } from '@/mock-projects'

interface ProjectsStore {
  projects: Project[]
  setProjects: (projects: ValueOrCallback<Project[]>) => void
}

export const useProjectsStore = create<ProjectsStore>(set => {
  const { setState } = new StateSetter<ProjectsStore>(set)

  return {
    projects: MOCK_PROJECTS,
    setProjects: projects => setState('projects', projects)
  }
})
