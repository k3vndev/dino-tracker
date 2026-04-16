import { DotsPattern } from '@components/background'
import { CTAButton, Feature, TextGradient } from '@components/landing'
import type { LandingFeature } from '@types'
import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
  const features: LandingFeature[] = [
    { title: 'Time tracking', desc: 'Log hours of work in seconds.', icon: 'clock' },
    { title: 'Project control', desc: 'Stay on top of every task all the time.', icon: 'dashboard' },
    { title: 'Clear insights', desc: 'See where all your time goes.', icon: 'chart' },
    { title: 'Customizable', desc: 'Customize everything, work yor way.', icon: 'settings' }
  ]

  const footerIconsSize = 32

  return (
    <main className='flex flex-col items-start text-2xl min-h-screen bg-[#111]'>
      <section className='flex not-lg:flex-col 2xl:px-64 xl:px-32 lg:px-16 px-8 lg:py-40 sm:py-32 py-20 w-full gap-8 items-center bg-linear-to-b from-[#0c0c0c] to-[#111]'>
        <div className='flex flex-col max-w-2xl'>
          <h1 className='font-poppins text-white lg:text-7xl text-5xl font-bold'>
            Your <TextGradient>work</TextGradient>, finally under <TextGradient>control</TextGradient>.
          </h1>

          <h2 className='font-plus font-semibold lg:text-4xl text-2xl text-white/60 mt-6'>
            Track projects, log hours, and get clear insights without the mess.
          </h2>

          <CTAButton />
        </div>

        <div className='size-full overflow-clip border-2 border-white/10 rounded-2xl'>
          <Image
            src='/landing.gif'
            className='size-full'
            alt='A freelance project dashboard, with charts and info display'
            width={800}
            height={653}
            draggable={false}
          />
        </div>
      </section>

      <section className='z-10 w-full relative lg:py-40 sm:py-32 py-20 flex flex-col items-center'>
        <DotsPattern className='top-0 h-full w-full absolute [&>#gradient]:bg-black/40' />

        <h2 className='font-poppins text-white lg:text-6xl text-4xl font-bold text-center mb-12 px-8'>
          Track, <TextGradient>everything</TextGradient>, <TextGradient>anytime</TextGradient>.
        </h2>

        <div className='grid 2xl:grid-cols-4 md:grid-cols-2 grid-cols-1 w-fit gap-8 h-fit'>
          {features.map((feature, index) => (
            <Feature {...feature} key={index} index={index} />
          ))}
        </div>

        <CTAButton />
      </section>

      <footer className='flex justify-between bg-black border-t-2 border-white/10 w-full py-8 md:px-32 sm:px-16 px-8 flex-wrap gap-x-8 gap-y-4'>
        <h2 className='flex items-center gap-2 cursor-default'>
          <Image src='/favicon.png' alt='App icon' width={footerIconsSize} height={footerIconsSize} />
          <span className='text-white font-poppins'>WorkTrack</span>
        </h2>

        <Link
          href='https://github.com/k3vndev/work-track'
          target='_blank'
          className='flex items-center gap-3 opacity-70 button hover:opacity-100'
        >
          {/* This won't render using the Icon component for some reason */}
          <svg viewBox='0 0 1024 1024' fill='none' className='size-5 min-w-5'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z'
              transform='scale(64)'
              fill='white'
            />
          </svg>
          <span className='text-white font-plus text-sm text-nowrap'>Contribute ♡</span>
        </Link>
      </footer>
    </main>
  )
}
