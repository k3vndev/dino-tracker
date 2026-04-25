import { NotFoundScreen } from '@components'

export default function NotFoundPage() {
  return (
    <main className='size-full min-h-dvh bg-black flex items-center justify-center px-4'>
      <NotFoundScreen
        className='lg:w-fit w-full lg:px-64'
        linkButton={{
          label: 'Back to Landing Page',
          href: '/'
        }}
      />
    </main>
  )
}
