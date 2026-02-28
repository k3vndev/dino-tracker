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
  customData?: Record<string, CustomDataField>
}

type ProjectStatus = keyof typeof PROJECT_STATUSES

/**
 * Custom data field can either be a static number or a daily time series. This allows for flexibility in the types of data that can be associated with a project, such as total hours worked (static) or daily revenue (time series).
 */
type CustomDataField =
  | {
      type: 'static'
      value: number
    }
  | {
      type: 'daily'
      value: Array<{
        date: string
        value: number
      }>
    }
