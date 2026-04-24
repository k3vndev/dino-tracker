import type { Project } from '@types'
import { createContext, useContext } from 'react'

interface ProjectContextType extends Project {}

export const ProjectContext = createContext<ProjectContextType>({
  id: '',
  status: 'Active'
})

export const useProjectContext = () => useContext(ProjectContext)
