import { AppSidebar } from '@components'
import type { ReactNode } from 'react'
import { DotsPattern } from '@/components/background'

interface AppLayoutProps {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <DotsPattern />
      {children}
      <AppSidebar />
    </>
  )
}
