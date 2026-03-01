import { Icon } from '@components'
import { EditableText } from '@components/projects'
import type { Project } from '@types'
import { formatProjectDate, getProjectBgGradient } from '@utils'
import { useMemo } from 'react'
import { PROJECT_DEFAULT_VALUES } from '@/consts'
import { useProjectsStore } from '@/store'
import { StatusChip } from './status-chip'

export const ProjectViewEditable = ({
  id,
  name,
  status,
  clientName,
  startDate,
  endDate,
  finalPayment,
  hourlyRate,
  color
}: Project) => {
  const bgLinearGradient = useMemo(() => getProjectBgGradient(color, 0.3, 40), [color])
  const setProjects = useProjectsStore(s => s.setProjects)

  const updateStoreProject = (key: keyof Omit<Project, 'id'>, value: Project[typeof key]) => {
    setProjects(prev => {
      const projectIndex = prev.findIndex(p => p.id === id)
      if (projectIndex === -1) return prev

      const updatedProjects = [...prev]
      updatedProjects[projectIndex] = {
        ...updatedProjects[projectIndex],
        [key]: value
      }
      return updatedProjects
    })
  }

  const setName = (newName: string) => updateStoreProject('name', newName)
  const setClientName = (newClientName: string) => updateStoreProject('clientName', newClientName)

  return (
    <section
      className='flex flex-col p-8 rounded-2xl border border-white/15 gap-10 backdrop-blur-xs shadow-card'
      style={{ background: bgLinearGradient }}
    >
      {/* Header section */}
      <div className='flex items-start justify-between gap-4'>
        <div className='flex flex-1 min-w-0 flex-col gap-0'>
          <EditableText
            className='text-3xl font-semibold'
            defaultValue={PROJECT_DEFAULT_VALUES.name}
            element='h1'
            initialText={name}
            setState={setName}
          />
          <EditableText
            className='text-lg font-medium'
            defaultValue={PROJECT_DEFAULT_VALUES.clientName}
            element='h2'
            initialText={clientName}
            setState={setClientName}
          />
        </div>

        <StatusChip status={status} showBorder />
      </div>

      {/* Footer section */}
      <div className='flex items-center justify-between'>
        {/* Date range */}
        <div className='flex items-center gap-1'>
          <Icon name='clock' className='size-5' />
          <span className='text-sm text-nowrap'>
            {formatProjectDate(startDate)} - {formatProjectDate(endDate)}
          </span>
        </div>

        {/* Payment or Rate */}
        <div className='flex items-center gap-1 font-poppins text-xl font-semibold'>
          {finalPayment ? (
            <span>${finalPayment}</span>
          ) : hourlyRate ? (
            <>
              <span>${hourlyRate}</span>
              <span className='opacity-50'>/hr</span>
            </>
          ) : (
            <span className='opacity-50'>N/D</span>
          )}
        </div>
      </div>
    </section>
  )
}
