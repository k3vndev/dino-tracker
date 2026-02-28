import { Icon } from '@components'
import type { Project } from '@types'
import { formatProjectDate, getProjectBgGradient } from '@utils'
import { useMemo } from 'react'

export const ProjectEditable = ({
  name,
  status,
  clientName,
  startDate,
  endDate,
  finalPayment,
  hourlyRate,
  color
}: Project) => {
  const background = useMemo(() => getProjectBgGradient(color), [color])

  return (
    <section className='flex flex-col p-8 rounded-2xl border border-white/15 gap-10' style={{ background }}>
      {/* Header section */}
      <div className='flex items-start justify-between gap-4'>
        <div className='flex flex-col gap-1.5'>
          <h3 className='font-poppins font-bold text-2xl text-pretty'>{name}</h3>
          <p>{clientName}</p>
        </div>

        <div className='flex items-center gap-2'>
          <div className='size-3 min-w-3 rounded-full bg-green-500' />
          <small className='text-nowrap text-xs'>{status}</small>
        </div>
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
