'use client'

import { LS_KEYS } from '@consts'
import { useDebounce } from '@hooks'
import { useProjectsStore } from '@store'
import type { Project } from '@types'
import { generateNewProject, idbGet, idbSet } from '@utils'
import { useEffect } from 'react'

export const StoreStateHandler = () => {
  const setProjects = useProjectsStore(s => s.setProjects)
  const projects = useProjectsStore(s => s.projects)

  const hydrated = useProjectsStore(s => s.hydrated)
  const setHydrated = useProjectsStore(s => s.setHydrated)

  // Only executes on the client side, ensuring that the store is initialized properly
  useEffect(() => {
    if (hydrated) return

    idbGet<Project[]>(LS_KEYS.PROJECTS)
      .then(stored => {
        setProjects(stored ?? [generateNewProject()])
      })
      .catch(error => {
        console.error('Failed to load projects from IndexedDB:', error)
        setProjects([generateNewProject()])
      })
      .finally(() => {
        // Mark the store as hydrated after the initial load to prevent hydration mismatches
        requestAnimationFrame(() => {
          setHydrated(true)
        })
      })
  }, [hydrated])

  // Listen for changes in the projects store and save them to IndexedDB
  const debouncedProjects = useDebounce(projects, 500)
  useEffect(() => {
    if (!hydrated) return
    idbSet(LS_KEYS.PROJECTS, debouncedProjects).catch(error => {
      console.error('Failed to save projects to IndexedDB:', error)
    })
  }, [debouncedProjects, hydrated])

  return null
}
