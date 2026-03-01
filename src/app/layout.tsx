import type { Metadata } from 'next'
import './globals.css'
import { AppBackground } from '@components'
import { APP_NAME, FONT_VARIABLES } from '@consts'
import { AppSidebar } from '@/components/app-sidebar'

const faviconPath = '/icons/favicon.svg'

export const metadata: Metadata = {
  title: APP_NAME,
  description:
    'Dino Tracker helps freelancers track projects, log hours, and monitor progress in one clean workspace. Stay organized, move faster, and make better decisions with clear stats and insights.',
  icons: {
    icon: faviconPath,
    shortcut: faviconPath,
    apple: faviconPath
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${FONT_VARIABLES} antialiased overflow-x-hidden 2xl:px-40 xl:px-32 lg:px-24 px-8 py-(--app-margin-y) min-h-dvh w-screen font-plus`}
      >
        {children}

        <AppBackground />
      </body>
    </html>
  )
}
