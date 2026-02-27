import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import type { IconName } from '../types/icons'

type IconProps = {
  name: IconName
  className?: string
}

export const Icon = ({ name, className }: IconProps) => (
  <Image
    src={`/icons/${name}.svg`}
    alt={name}
    width={32}
    height={32}
    className={twMerge('size-8', className)}
  />
)
