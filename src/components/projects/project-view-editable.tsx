import { EditableText } from '@components/projects'
import { PROJECT_DEFAULT_VALUES } from '@consts'
import type { DatePickerDates } from '@context'
import { useProjectsStore } from '@store'
import type { Project } from '@types'
import { getProjectBgGradient } from '@utils'
import { useMemo } from 'react'
import { DatePicker } from './date-picker'
import { Payment } from './payment'
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
  const setProjectAttributes = useProjectsStore(s => s.setProjectAttributes)

  const setName = (name: string) => setProjectAttributes(id, { name })
  const setClientName = (clientName: string) => setProjectAttributes(id, { clientName })
  const setDates = ({ from, to }: DatePickerDates) => {
    setProjectAttributes(id, { startDate: from, endDate: to })
  }
  const setFinalPayment = (finalPayment: number) => setProjectAttributes(id, { finalPayment })
  const setHourlyRate = (hourlyRate: number) => setProjectAttributes(id, { hourlyRate })

  return (
    <section
      className='flex flex-col md:p-8 sm:p-4 p-2 rounded-2xl border border-white/15 gap-6 backdrop-blur-xs shadow-element group/project'
      style={{ background: bgLinearGradient }}
    >
      {/* Header section */}
      <div className='flex items-start justify-between gap-4'>
        <div className='flex flex-1 min-w-0 flex-col gap-0'>
          <EditableText
            className='md:text-3xl text-xl font-semibold'
            defaultValue={PROJECT_DEFAULT_VALUES.name}
            element='h1'
            initialText={name}
            setState={setName}
            multiline
          />
          <EditableText
            className='md:text-lg text-base text-white/75'
            defaultValue={PROJECT_DEFAULT_VALUES.clientName}
            element='h2'
            initialText={clientName}
            setState={setClientName}
            multiline
          />
        </div>

        <StatusChip status={status} projectId={id} showBorder editable />
      </div>

      {/* Footer section */}
      <div className='flex items-end justify-between text-white'>
        {/* Date range */}
        <DatePicker {...{ startDate, endDate, setDates }} />

        {/* Payment or Rate */}
        <div className='flex items-center gap-10'>
          <Payment label='FINAL' data={finalPayment} setData={setFinalPayment} />
          <Payment label='HOURLY' data={hourlyRate} hourly setData={setHourlyRate} />
        </div>
      </div>
    </section>
  )
}
