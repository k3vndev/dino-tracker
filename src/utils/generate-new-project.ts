import { DATA_DISPLAY_DEFAULT_TITLE, PROJECT_DEFAULT_VALUES } from '@consts'
import type { Project } from '@types'
import { DateTime } from 'luxon'
import { randomColor } from './'

export const generateNewProject = (): Project => {
  const nowISO = DateTime.now().toISO()

  return {
    id: crypto.randomUUID(),
    ...PROJECT_DEFAULT_VALUES,
    startDate: DateTime.now().toISODate(),
    color: randomColor(),
    createdAt: nowISO,
    updatedAt: nowISO,
    dataDisplay: [
      {
        id: crypto.randomUUID(),
        title: DATA_DISPLAY_DEFAULT_TITLE,
        type: 'daily',
        fieldIds: []
      }
    ]
  }
}
