import type { Project } from '@types'

export const APP_NAME = 'Dino Tracker'

/** Defines the possible statuses a project can have, along with their associated colors. */
export const PROJECT_STATUSES = {
  'Not Started': '#151515',
  Active: '#08F988',
  'Not Yet Paid': '#FFD256',
  Completed: '#4093FF',
  Paused: '#41414B',
  Canceled: '#FF5E2D'
} as const

export const PROJECT_DEFAULT_VALUES = {
  name: 'My New Project',
  clientName: "My Client's Name",
  status: 'Not Started'
} as const satisfies Omit<Project, 'id' | 'startDate' | 'endDate' | 'color'>

export const DATE_SEPARATOR = '-'

export const NO_DATA_LABEL = 'N/D'

export const DEFAULT_COLOR = '#5A9BF8'

/** Default time span for charts in days */
export const DEFAULT_CHART_TIME_SPAN = 7
