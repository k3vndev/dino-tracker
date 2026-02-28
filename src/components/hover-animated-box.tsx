import { cn } from '@utils'

/**
 * A box that animates its width from 0 to full on hover. Used for animating the background of selectable items.
 * Needs a parent with `relative`, `group` and `overflow-clip` classes to work properly.
 */
export const HoverAnimatedBox = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'h-full top-0 left-0 absolute w-0 group-hover:w-full transition-all duration-400 pointer-events-none',
      className
    )}
    {...props}
  />
)
