import { Button } from '@components'
import { useDashboardContext } from '@context'
import { useProjectsStore } from '@store'
import { generateNewProject } from '@utils'
import { useRouter } from 'next/navigation'

export const CreateProjectButton = () => {
  const setProjects = useProjectsStore(s => s.setProjects)
  const router = useRouter()
  const { setProjectsDisabled } = useDashboardContext()

  const handleClick = () => {
    // Generate a new project and add it to the store
    const newProject = generateNewProject()
    setProjects(prev => [newProject, ...prev])

    // Navigate to the new project's page
    setProjectsDisabled(true)
    router.push(`/projects/${newProject.id}`)
  }

  return (
    <Button icon='plus' primary onClick={handleClick}>
      New Project
    </Button>
  )
}
