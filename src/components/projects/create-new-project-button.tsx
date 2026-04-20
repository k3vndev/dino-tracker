import { Button } from '@components'
import { DATA_DISPLAY_DEFAULT_TITLE, PROJECT_DEFAULT_VALUES } from '@consts'
import { useProjectsStore } from '@store'
import type { Project } from '@types'
import { getRandomColor } from '@utils'
import { DateTime } from 'luxon'

export const CreateNewProjectButton = () => {
  const setProjects = useProjectsStore(s => s.setProjects)

  const handleClick = () => {
    const nowISO = DateTime.now().toISO()

    const newProject: Project = {
      id: crypto.randomUUID(),
      name: PROJECT_DEFAULT_VALUES.name,
      clientName: PROJECT_DEFAULT_VALUES.clientName,
      status: PROJECT_DEFAULT_VALUES.status,
      color: getRandomColor(),
      createdAt: nowISO,
      updatedAt: nowISO,
      customFields: [],
      dataDisplay: [
        {
          id: crypto.randomUUID(),
          title: DATA_DISPLAY_DEFAULT_TITLE,
          type: 'daily',
          fieldIds: []
        }
      ],
      startDate: DateTime.now().toISODate()
    }

    // Add the new project to the projects store
    setProjects(prev => [newProject, ...prev])

    // Navigate to the new project's page
    //
  }

  return (
    <Button icon='plus' primary onClick={handleClick}>
      New Project
    </Button>
  )
}
