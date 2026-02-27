import type { ClassName, IconName } from '@types'
import { cn } from '@utils'
import Image from 'next/image'
import type React from 'react'

interface IconProps extends React.HTMLAttributes<HTMLImageElement> {
  name: IconName
  className?: ClassName
}

export const Icon = ({ name, className, ...props }: IconProps) => (
  <Image
    src={`/icons/${name}.svg`}
    alt={name}
    width={32}
    height={32}
    draggable={false}
    className={cn('size-8', className)}
    {...props}
  />
)
