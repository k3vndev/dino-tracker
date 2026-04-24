'use client'

import { LS_KEYS } from '@consts'
import { useGlobalStateRefresh } from '@hooks'
import { useProjectsStore } from '@store'
import { generateNewProject } from '@utils'
import { useEffect } from 'react'

export const StoreStateHandler = () => {
  const setProjects = useProjectsStore(s => s.setProjects)
  const projects = useProjectsStore(s => s.projects)

  const hydrated = useProjectsStore(s => s.hydrated)
  const setHydrated = useProjectsStore(s => s.setHydrated)

  // Only executes on the client side, ensuring that the store is initialized properly
  useEffect(() => {
    if (hydrated) return
    const storedProjects = localStorage.getItem(LS_KEYS.PROJECTS)

    if (storedProjects) {
      try {
        const parsedProjects = JSON.parse(storedProjects)
        setProjects(parsedProjects)
      } catch (error) {
        console.error('Failed to parse projects from localStorage:', error)
      }
    } else {
      // If there are no projects in localStorage, initialize store
      setProjects([generateNewProject()])
    }

    // Mark the store as hydrated after the initial load to prevent hydration mismatches
    requestAnimationFrame(() => {
      setHydrated(true)
    })
  }, [hydrated])

  // Listen for changes in the projects store and save them to localStorage
  useGlobalStateRefresh(
    latest => {
      localStorage.setItem(LS_KEYS.PROJECTS, JSON.stringify(latest))
    },
    projects,
    500
  )

  return null
}
