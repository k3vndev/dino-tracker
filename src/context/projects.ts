import { createContext, useContext } from 'react'

interface ProjectsContextType {
  projectsDisabled: boolean
  setProjectsDisabled: (disabled: boolean) => void
}

export const ProjectsContext = createContext<ProjectsContextType>({
  projectsDisabled: false,
  setProjectsDisabled: () => {}
})

export const useProjectsContext = () => useContext(ProjectsContext)
