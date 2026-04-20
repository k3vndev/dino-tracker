import { createContext, useContext } from 'react'

interface DashboardContextType {
  projectsDisabled: boolean
  setProjectsDisabled: (disabled: boolean) => void
}

export const DashboardContext = createContext<DashboardContextType>({
  projectsDisabled: false,
  setProjectsDisabled: () => {}
})

export const useDashboardContext = () => useContext(DashboardContext)
