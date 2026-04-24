import { COLORS_MAP } from '@consts'
import type { Project } from '@types'

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p-001',
    name: 'Portfolio Website Revamp',
    clientName: 'Northwind Labs',
    startDate: '2026-01-06',
    hourlyRate: 95,
    status: 'Active',
    color: COLORS_MAP.RED
  },
  {
    id: 'p-002',
    name: 'Mobile Analytics Dashboard',
    img: '/burger-sample.jpg',
    clientName: 'Blue Harbor',
    startDate: '2026-01-06',
    status: 'Not Started',
    color: COLORS_MAP.PURPLE,
    customFields: [
      {
        type: 'static',
        name: 'Total Commits',
        id: 'cf-001',
        color: COLORS_MAP.PINK,
        value: 120
      },
      {
        type: 'daily',
        name: 'Code',
        id: 'cf-002',
        color: COLORS_MAP.LIGHT_BLUE,
        value: [
          { date: '2026-01-06', value: 5 },
          { date: '2026-01-07', value: 8 },
          { date: '2026-01-08', value: 12 },
          // Intentional one-off spike to show how the chart handles it
          { date: '2026-01-10', value: 4 },
          { date: '2026-01-11', value: 3 },
          { date: '2026-01-12', value: 6 }
        ]
      },
      {
        type: 'daily',
        name: 'Design',
        id: 'cf-003',
        color: COLORS_MAP.PURPLE,
        value: [
          { date: '2026-01-06', value: 3 },
          { date: '2026-01-07', value: 4 },
          { date: '2026-01-08', value: 6 },
          { date: '2026-01-09', value: 2 },
          { date: '2026-01-10', value: 1 }
        ]
      },
      {
        type: 'daily',
        name: 'Meetings',
        id: 'cf-004',
        color: COLORS_MAP.GOLD,
        value: [
          { date: '2026-01-06', value: 2 },
          { date: '2026-01-07', value: 1 },
          { date: '2026-01-08', value: 1 },
          { date: '2026-01-09', value: 3 },
          { date: '2026-01-10', value: 2 }
        ]
      }
    ],
    dataDisplay: [
      {
        id: 'dd-002',
        fieldIds: ['cf-002', 'cf-003'],
        title: 'Daily Worked Hours',
        type: 'daily'
      },
      {
        id: 'dd-001',
        fieldIds: ['cf-001', 'cf-002', 'cf-003', 'cf-004'],
        title: 'Display of Total Commits',
        type: 'static'
      },
      {
        id: 'dd-003',
        fieldIds: ['cf-003', 'cf-004'],
        title: 'Daily Worked Hours (Testing)',
        type: 'daily'
      }
    ]
  },
  {
    id: 'p-003',
    name: 'E-commerce Checkout Optimization',
    clientName: 'Vertex Supply',
    startDate: '2025-11-18',
    endDate: '2026-01-30',
    finalPayment: 4200,
    status: 'Not Yet Paid',
    color: COLORS_MAP.GOLD
  },
  {
    id: 'p-004',
    name: 'Internal CRM Migration',
    clientName: 'Maple Partners',
    endDate: '2025-12-20',
    finalPayment: 9800,
    status: 'Completed',
    color: COLORS_MAP.LIGHT_GREEN
  },
  {
    id: 'p-005',
    name: 'Marketing Landing Page A/B Tests',
    clientName: 'Sunset Media',
    startDate: '2026-01-22',
    status: 'Paused',
    color: COLORS_MAP.LIGHT_BLUE
  }
]
