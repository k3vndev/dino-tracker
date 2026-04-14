import { Icon } from '@components'
import { useDatePickerContext } from '@context'
import { useMemo } from 'react'

export const EditableDateDisplay = () => {
  const { displayDate, startDate, endDate, setDates } = useDatePickerContext()

  const [buttonText, dateText] = useMemo(() => {
    const getButtonAndDate = (prefix: string) => {
      if (displayDate.startsWith(prefix)) {
        return [prefix, displayDate.replace(prefix, '').trim()]
      }

      return null
    }

    return getButtonAndDate('From') || getButtonAndDate('To') || [null, displayDate]
  }, [displayDate])

  const handleButtonClick = () => {
    if (!buttonText) return

    if (buttonText === 'From') {
      setDates({ to: startDate })
    } else if (buttonText === 'To') {
      setDates({ from: endDate })
    }
  }

  return (
    <span className='flex items-center w-full justify-center gap-2 text-white text-lg mb-1 mt-3 pl-4'>
      {buttonText && (
        <button
          className='px-3 ring ring-white/25 rounded-full bg-white/10 button flex items-center gap-2 group hover:ring-white/50'
          onClick={handleButtonClick}
        >
          {buttonText}
          <Icon name='switch-vertical' className='text-white size-4 group-hover:animate-pulse' />
        </button>
      )}
      {dateText}
    </span>
  )
}
