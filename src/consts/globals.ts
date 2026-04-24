import type { Project } from '@types'

export const APP_NAME = 'WorkTrack'

// -- Colors --
export const COLORS_MAP = {
  LIGHT_BLUE: '#53CBF3',
  BLUE: '#3366E6',
  PURPLE: '#6367FF',
  PINK: '#FE81D4',
  RED: '#FF0087',
  LIGHT_YELLOW: '#FEEE91',
  GOLD: '#FFC300',
  BEIGE: '#FFB399',
  OLIVE: '#999966',
  LIGHT_GREEN: '#99FF99'
} as const
export const COLORS = Object.values(COLORS_MAP)

/** Defines the possible statuses a project can have, along with their associated colors. */
export const PROJECT_STATUSES = {
  'Not Started': '#151515',
  Active: '#08F988',
  'Not Yet Paid': '#FFD256',
  Completed: '#4093FF',
  Paused: '#41414B',
  Canceled: '#FF5E2D'
} as const

export const PROJECT_STATUSES_ARRAY = Object.entries(PROJECT_STATUSES).map(([status, color]) => ({
  status,
  color
}))

export const PROJECT_DEFAULT_VALUES = {
  name: 'My New Project',
  clientName: "My Client's Name",
  status: 'Active'
} as const satisfies Omit<Project, 'id' | 'startDate' | 'endDate' | 'color'>

export const DATE_SEPARATOR = '-'

export const NO_DATA_LABEL = 'N/D'

export const DEFAULT_COLOR = '#5A9BF8'

export const DATA_DISPLAY_DEFAULT_TITLE = 'My Personalized Chart'

export const CUSTOM_FIELD_DEFAULT_NAME = 'Untitled Field'

export const LS_KEYS_PREFIX = 'wt-'

export const LS_KEYS = {
  PROJECTS: `${LS_KEYS_PREFIX}projects`
}
