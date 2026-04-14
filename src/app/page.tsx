import { LinkButton } from '@components'
import { DotsPattern } from '@components/background'
import { Feature, TextGradient } from '@components/landing'
import type { LandingFeature } from '@types'

export default function LandingPage() {
  const features: LandingFeature[] = [
    { title: 'Time tracking', desc: 'Log hours of work in seconds.', icon: 'clock' },
    { title: 'Project control', desc: 'Stay on top of every task all the time.', icon: 'dashboard' },
    { title: 'Clear insights', desc: 'See where all your time goes.', icon: 'chart' },
    { title: 'Customizable', desc: 'Customize everything, work yor way.', icon: 'settings' }
  ]

  return (
    <main className='flex flex-col items-start gap-4 text-2xl bg-[#111] min-h-screen'>
      <section className='flex px-64 py-48'>
        <div className='flex flex-col max-w-2xl'>
          <h1 className='font-poppins text-white text-7xl font-bold'>
            Your <TextGradient>work</TextGradient>, finally under <TextGradient>control</TextGradient>.
          </h1>

          <h2 className='font-plus font-semibold text-4xl text-white/60 mt-6'>
            Track projects, log hours, and get clear insights without the mess.
          </h2>

          <LinkButton primary icon='arrow' className='mt-12' href='/projects'>
            Take control of your time
          </LinkButton>
        </div>
      </section>

      <section className='z-10 w-full relative py-40 flex flex-col items-center'>
        <DotsPattern className='top-0 h-full w-full absolute [&>#gradient]:bg-black/40' />

        <h2 className='font-poppins text-white text-6xl font-bold text-center mb-12'>
          Track, <TextGradient>everything</TextGradient>, <TextGradient>anytime</TextGradient>.
        </h2>

        <div className='flex items-center justify-center w-full gap-8 h-fit'>
          {features.map((feature, index) => (
            <Feature {...feature} key={index} index={index} />
          ))}
        </div>

        <LinkButton primary icon='arrow' className='mt-12' href='/projects'>
          Take control of your time
        </LinkButton>
      </section>
    </main>
  )
}
