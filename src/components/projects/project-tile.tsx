import { useProjectsContext } from '@context'
import type { ClassName, Project } from '@types'
import { cn, formatProjectDate, getProjectBgGradient } from '@utils'
import Link from 'next/link'
import { useMemo } from 'react'
import { Icon } from '../icon'

interface Props extends React.HTMLAttributes<HTMLElement> {
  data: Project
  index: number
}

export const ProjectTile = ({ data: p, index, className, style, onClick, ...props }: Props) => {
  const { projectsDisabled } = useProjectsContext()
  const background = useMemo(() => getProjectBgGradient(p.color), [p.color])

  const styleClass: ClassName = projectsDisabled
    ? 'brightness-90 cursor-not-allowed opacity-90'
    : 'hover:brightness-110 hover:border-white/50 hover:shadow-lg transition active:brightness-95 active:scale-95'

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (projectsDisabled) return
    onClick?.(e)
  }

  return (
    <article
      className={cn(
        'rounded-2xl border shadow-black/50 border-white/25 min-h-48 backdrop-blur-md',
        styleClass,
        className
      )}
      onClick={handleClick}
      style={{ background, ...style }}
      {...props}
    >
      <Link className='flex flex-col justify-between gap-4 px-5 py-4 size-full' href={`/projects/${p.id}`}>
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
              {formatProjectDate(p.startDate)} - {formatProjectDate(p.endDate)}
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
      </Link>
    </article>
  )
}
