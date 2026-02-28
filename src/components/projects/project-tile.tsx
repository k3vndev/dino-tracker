import type { Project } from '@types'
import { cn, hueRotate } from '@utils'
import { useMemo } from 'react'
import { Icon } from '../icon'

interface Props extends React.HTMLAttributes<HTMLElement> {
  data: Project
  index: number
}

export const ProjectTile = ({ data: p, index, className, style, ...props }: Props) => {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/D'

    const date = new Date(dateStr)
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  }

  const background = useMemo(() => {
    const hueOffset = 25
    const opacity = 0.3
    const opacityHex = Math.round(opacity * 255)
      .toString(16)
      .padStart(2, '0')

    if (!p.color) return `#000000${opacityHex}`

    return `linear-gradient(to bottom right, ${hueRotate(p.color, hueOffset)}${opacityHex}, ${hueRotate(p.color, -hueOffset)}${opacityHex})`
  }, [p.color])

  return (
    <article
      className={cn(
        'flex flex-col justify-between gap-4 rounded-2xl border border-white/25 px-5 py-4 min-h-48 backdrop-blur-md',
        className
      )}
      style={{ background, ...style }}
      {...props}
    >
      {/* Header section */}
      <div className='flex items-start justify-between gap-4'>
        <div className='flex flex-col gap-1.5'>
          <h3 className='font-poppins font-bold text-2xl text-pretty'>{p.name}</h3>
          <p>{p.clientName}</p>
        </div>

        <div className='flex items-center gap-2'>
          <div className='size-3 min-w-3 rounded-full bg-green-500' />
          <small className='text-nowrap text-xs'>{p.status}</small>
        </div>
      </div>

      {/* Footer section */}
      <div className='flex items-center justify-between'>
        {/* Date range */}
        <div className='flex items-center gap-1'>
          <Icon name='clock' className='size-5' />
          <span className='text-sm text-nowrap'>
            {formatDate(p.startDate)} - {formatDate(p.endDate)}
          </span>
        </div>

        {/* Payment or Rate */}
        <div className='flex items-center gap-1 font-poppins text-xl font-semibold'>
          {p.finalPayment ? (
            <span>${p.finalPayment}</span>
          ) : p.hourlyRate ? (
            <>
              <span>${p.hourlyRate}</span>
              <span className='opacity-50'>/hr</span>
            </>
          ) : (
            <span className='opacity-50'>N/D</span>
          )}
        </div>
      </div>
    </article>
  )
}
