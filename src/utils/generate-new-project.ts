import { DATA_DISPLAY_DEFAULT_TITLE, PROJECT_DEFAULT_VALUES } from '@consts'
import type { Project } from '@types'
import { getRandomColor } from './'

export const generateNewProject = (): Project => ({
  id: crypto.randomUUID(),
  ...PROJECT_DEFAULT_VALUES,
  startDate: new Date().toISOString(),
  color: getRandomColor(),
  dataDisplay: [
    {
      id: crypto.randomUUID(),
      title: DATA_DISPLAY_DEFAULT_TITLE,
      type: 'daily',
      fieldIds: []
    }
  ]
})
