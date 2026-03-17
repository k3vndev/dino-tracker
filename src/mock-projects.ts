import type { Project } from '@types'

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p-001',
    name: 'Portfolio Website Revamp',
    clientName: 'Northwind Labs',
    startDate: '2026-01-06',
    hourlyRate: 95,
    status: 'Active',
    color: '#F85A5A',
    customFields: [
      {
        type: 'static',
        key: 'total commits',
        value: 120
      },
      {
        type: 'daily',
        key: 'daily worked hours',
        value: [
          { date: '2026-01-06', value: 5 },
          { date: '2026-01-07', value: 8 },
          { date: '2026-01-08', value: 12 }
        ]
      }
    ],
    dataDisplay: [
      {
        id: 'dd-001',
        fieldKeys: ['total commits'],
        title: 'Total Commits'
      },
      {
        id: 'dd-002',
        fieldKeys: ['daily worked hours'],
        title: 'Daily Worked Hours'
      }
    ]
  },
  {
    id: 'p-002',
    name: 'Mobile Analytics Dashboard',
    clientName: 'Blue Harbor',
    startDate: '2026-02-01',
    status: 'Not Started',
    color: '#5A9BF8'
  },
  {
    id: 'p-003',
    name: 'E-commerce Checkout Optimization',
    clientName: 'Vertex Supply',
    startDate: '2025-11-18',
    endDate: '2026-01-30',
    finalPayment: 4200,
    status: 'Not Yet Paid',
    color: '#F2C94C'
  },
  {
    id: 'p-004',
    name: 'Internal CRM Migration',
    clientName: 'Maple Partners',
    endDate: '2025-12-20',
    finalPayment: 9800,
    status: 'Completed',
    color: '#6FCF97'
  },
  {
    id: 'p-005',
    name: 'Marketing Landing Page A/B Tests',
    clientName: 'Sunset Media',
    startDate: '2026-01-22',
    status: 'Paused',
    color: '#BB6BD9'
  }
]
