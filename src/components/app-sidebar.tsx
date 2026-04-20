'use client'

import { HoverAnimatedBox, Icon } from '@components'
import { APP_NAME } from '@consts'
import type { SidebarItem } from '@types'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const AppSidebar = () => {
  const items: SidebarItem[] = [
    {
      name: 'Projects',
      path: '/projects',
      icon: 'dashboard'
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: 'settings'
    },
    {
      name: 'Trash',
      path: '/trash',
      icon: 'trash'
    },
    {
      name: 'Analytics',
      icon: 'chart',
      path: '/analytics'
    }
  ]

  return (
    <aside className='fixed lg:bg-linear-to-r lg:from-black/75 lg:to-black/25 bg-black/75 lg:w-(--app-sidebar-width) sm:px-8 px-4 lg:py-12 py-2 rounded-2xl border border-white/10 lg:backdrop-blur-xs backdrop-blur-xl lg:top-(--app-margin-y) lg:bottom-(--app-margin-y) flex lg:flex-col not-lg:items-center lg:gap-10 gap-8 shadow-element bottom-4 not-lg:justify-between left-(--app-margin-x) w-[calc(100vw-2*var(--app-margin-x))] z-50 animation-slide-in-from-bottom'>
      <AppName />

      <ul className='flex lg:flex-col lg:gap-2 gap-0.5'>
        {items.map(item => (
          <SidebarItemTile key={item.path} {...item} />
        ))}
      </ul>

      <Chart />
    </aside>
  )
}

const SidebarItemTile = ({ name, path, icon }: SidebarItem) => {
  const pathname = usePathname()
  const isActive = pathname === path

  const activeClassName = isActive
    ? 'lg:bg-linear-to-r bg-linear-to-b from-white/10 lg:to-white/0 to-white/5 pointer-events-none'
    : 'button not-hover:opacity-80'

  return (
    <li>
      <Link
        href={path}
        className={`flex items-center gap-4 text-white lg:px-6 px-3 lg:py-4 py-2 rounded-lg relative group overflow-clip ${activeClassName}`}
      >
        <Icon name={icon} className='lg:min-w-8 lg:size-7 min-w-7 size-8 *:text-blue-500' />
        <span className='text-xl font-plus not-lg:hidden'>{name}</span>

        <HoverAnimatedBox className='bg-linear-to-r from-white/5 to-white/1 not-lg:hidden' />
      </Link>
    </li>
  )
}

const AppName = () => {
  const [namePart1, namePart2] = APP_NAME.split(' ')
  const imageSize = 128

  return (
    <Link href='/'>
      <h1 className='flex items-center gap-2.5 bg-black border border-white/10 rounded-xl lg:p-4 p-2 squares-pattern'>
        <Image
          className='sm:size-12 size-8 sm:min-w-12 min-w-8 saturate-150 object-cover'
          src='/favicon.png'
          width={imageSize}
          height={imageSize}
          alt='App logo'
        />

        <div className='flex items-center gap-1.5 font-poppins 2xl:text-3xl text-2xl text-white text-nowrap not-lg:hidden'>
          <span>{namePart1}</span>
          <span>{namePart2}</span>
        </div>
      </h1>
    </Link>
  )
}

const Chart = () => (
  <div className='border text-white border-white/10 bg-white/5 w-full h-full rounded-xl flex items-center justify-center flex-col gap-2 not-lg:hidden'>
    <Icon name='chart' className='size-16' />
    <span className='font-poppins italic text-xl text-pretty px-16 text-center'>YOUR CHART WILL GO HERE</span>
  </div>
)
