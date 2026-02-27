import type { ClassName, IconName } from '@types'
import { cn } from '@utils'
import Image from 'next/image'

type IconProps = {
  name: IconName
  className?: ClassName
}

export const Icon = ({ name, className }: IconProps) => (
  <Image src={`/icons/${name}.svg`} alt={name} width={32} height={32} className={cn('size-8', className)} />
)
