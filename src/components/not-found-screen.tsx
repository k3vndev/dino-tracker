import { Icon, LinkButton } from '@components'
import { cn } from '@utils'

interface Props {
  isLoading?: boolean
  text?: string
  className?: string

  linkButton?: {
    label: string
    href: string
  }
}

export const NotFoundScreen = ({ isLoading = false, text = 'Not Found', linkButton, className }: Props) => (
  <section
    className={cn(
      'flex items-center text-white text-center flex-col w-full justify-center gap-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-xs py-16 font-bold',
      className
    )}
  >
    {!isLoading ? (
      <>
        <h2 className='text-7xl font-poppins'>404</h2>
        <h1 className='text-4xl font-plus'>{text}</h1>

        {linkButton && (
          <LinkButton href={linkButton.href} icon='arrow' className='[&_img]:-rotate-180 mt-6'>
            {linkButton.label}
          </LinkButton>
        )}
      </>
    ) : (
      <Icon name='loading' className='size-16 animate-spin' />
    )}
  </section>
)
