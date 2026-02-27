'use client'

import { Icon } from '@components'
import { APP_NAME } from '@consts'
import type { IconName } from '@types'
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
    <aside className='fixed bg-linear-to-r from-black/90 to-black/30 w-(--app-sidebar-width) px-8 py-12 rounded-2xl border border-white/10 backdrop-blur-xs top-(--app-margin-y) bottom-(--app-margin-y) flex flex-col gap-10'>
      <AppName />

      <ul className='flex flex-col gap-2'>
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
    ? 'bg-linear-to-r from-white/12.5 to-white/0 pointer-events-none'
    : 'button not-hover:opacity-80'

  return (
    <li>
      <Link
        href={path}
        className={`flex items-center gap-4 text-white px-6 py-4 rounded-lg relative group overflow-clip ${activeClassName}`}
      >
        <Icon name={icon} className='size-8 *:text-blue-500' />
        <span className='text-xl font-plus'>{name}</span>

        <div className='bg-linear-to-r from-white/5 to-white/1 h-full top-0 left-0 absolute w-0 group-hover:w-full transition-all duration-400' />
      </Link>
    </li>
  )
}

const AppName = () => {
  const [namePart1, namePart2] = APP_NAME.split(' ')

  return (
    <h1 className='flex items-center gap-2.5'>
      <Icon name='favicon' className='size-14 saturate-150' />
      <div className='flex items-center gap-1.5 font-poppins text-3xl text-white text-nowrap'>
        <span className='font-semibold'>{namePart1}</span>
        <span className='font-bold'>{namePart2}</span>
      </div>
    </h1>
  )
}

const Chart = () => (
  <div className='border border-white/10 bg-white/5 w-full h-full rounded-xl flex items-center justify-center flex-col gap-2'>
    <Icon name='chart' className='size-16' />
    <span className='font-poppins italic text-xl text-pretty px-16 text-center'>YOUR CHART WILL GO HERE</span>
  </div>
)

interface SidebarItem {
  name: string
  path: string
  icon: IconName
}
