import { Icon } from '@components'
import type { LandingFeature } from '@types'

interface Props extends LandingFeature {
  index: number
}

export const Feature = ({ index, title, desc, icon }: Props) => {
  // Note: index will later be used to animate this component on appear

  return (
    <article className='bg-linear-to-b from-[#111] to-black flex flex-col rounded-xl px-8 py-8 w-80 outline-2 outline-white/5'>
      <div className='bg-white rounded-xl w-fit p-2 mb-4'>
        <Icon name={icon} className='invert md:size-16 size-8' />
      </div>
      <h3 className='font-poppins text-white font-semibold text-3xl'>{title}</h3>
      <p className='text-white/60 font-plus text-xl'>{desc}</p>
    </article>
  )
}
