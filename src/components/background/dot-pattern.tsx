import { cn } from '@utils'

export const DotsPattern = ({ className = '' }) => (
  <div className={cn('fixed -z-20 h-screen w-screen overflow-hidden top-0 left-0', className)}>
    {/* Dots pattern */}
    <div
      id='dots'
      className='absolute inset-0 size-full top-0 left-0 bg-size bg-[#111] bg-[radial-gradient(circle,rgb(107_114_128/0.5)_1px,transparent_1px)] bg-size-[24px_24px]'
    />

    {/* Gradient overlay */}
    <div
      id='gradient'
      className='absolute inset-0 size-full top-0 left-0 bg-linear-to-b from-[#111]/0 via-[#111]/60 to-black/80'
    />
  </div>
)
