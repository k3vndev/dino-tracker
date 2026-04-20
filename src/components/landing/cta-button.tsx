import { LinkButton } from '@components'
import { cn } from '@utils'

export const CTAButton = ({ className = '' }) => (
  <LinkButton
    primary
    icon='arrow'
    className={cn('mt-12 animation-slide-in-from-bottom', className)}
    href='/projects'
  >
    Take control of your time
  </LinkButton>
)
