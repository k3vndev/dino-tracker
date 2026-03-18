import type { PROJECT_STATUSES } from '@consts'
import type { IconName } from '@types'
import type { ComponentProps } from 'react'

export type ClassName = ComponentProps<'div'>['className']

export interface SidebarItem {
  name: string
  path: string
  icon: IconName
}

export interface Project {
  id: string
  name?: string
  clientName?: string
  startDate?: string
  endDate?: string
  hourlyRate?: number
  finalPayment?: number
  status: ProjectStatus
  color?: string

  /** Custom records associated with the project, such as total hours worked or daily revenue. */
  customFields?: CustomField[]

  /** Chart settings for the project, allowing for the display of various charts based on the project's custom data. */
  dataDisplay?: DataDisplay[]
}

export type ProjectStatus = keyof typeof PROJECT_STATUSES

/**
 * Can either be a static number or a daily time series. This allows for flexibility in the types of data that can be associated with a project, such as total hours worked (static) or daily revenue (time series).
 */
export type CustomField = StaticCustomField | DailyCustomField

interface BaseCustomField {
  name: string
  id: string
  color?: string
}

/** Represents a static custom field, which holds a single numeric value */
export interface StaticCustomField extends BaseCustomField {
  type: 'static'
  value: number
}

/** Represents a daily custom field, which holds an array of date-value pairs for time series data */
export interface DailyCustomField extends BaseCustomField {
  type: 'daily'
  value: ChartRecord[]
}

/** Chart settings for the project, allowing for the display of various charts based on the project's custom data. */
export interface DataDisplay {
  id: string
  fieldIds: string[]
  title?: string

  /** Whether to display the total value of the records */
  displayTotal?: boolean
}

/** Represents a single record in a daily time series chart for Chart component */
export interface ChartRecord {
  date: string
  value: number
}
