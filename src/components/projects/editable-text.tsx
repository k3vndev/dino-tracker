import { useFreshRefs } from '@hooks'
import { cn } from '@utils'
import { useEffect, useState } from 'react'
import { EditableTooltip } from './editable-tooltip'

interface Props extends React.HTMLAttributes<HTMLElement> {
  initialText?: string
  setState?: (text: string) => void
  defaultValue: string
  element: 'h1' | 'h2' | 'h3' | 'span'
  className?: string
}

export const EditableText = ({
  initialText,
  setState,
  defaultValue,
  element: Element,
  className: propsClassName,
  onClick,
  ...props
}: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(initialText || defaultValue)
  const textRef = useFreshRefs(text)
  const inputRef = useFreshRefs<HTMLInputElement | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleElementClick = (e: React.MouseEvent<HTMLElement>) => {
    onClick?.(e)

    setIsEditing(true)
    setText(initialText || defaultValue)

    requestAnimationFrame(() => {
      const input = inputRef.current

      if (input) {
        input.focus()
        input.value = textRef.current

        if (!textRef.current.trim()) {
          input.value = defaultValue
        }

        if (input.value === defaultValue) {
          input.select()
        }
      }
    })
  }

  const handleFocusLost = (e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
    if ('key' in e && e.key !== 'Enter') return

    console.log('Focuse lost!')

    if (!text.trim()) {
      setText(defaultValue)
    }
    requestAnimationFrame(() => {
      refreshState()
      setIsEditing(false)
    })
  }

  const refreshState = () => {
    setState?.(textRef.current)
  }
  useEffect(() => refreshState, [])

  const className = 'border font-poppins text-white text-xl px-2 py-1 rounded-lg'

  return !isEditing ? (
    <Element
      onClick={handleElementClick}
      className={cn('cursor-pointer border-transparent relative group w-fit', className, propsClassName)}
      {...props}
    >
      {initialText || defaultValue}

      <EditableTooltip />
    </Element>
  ) : (
    <input
      ref={inputRef}
      className={cn('bg-black/10 animate-input-border outline-none h-fit', className, propsClassName)}
      type='text'
      onChange={handleChange}
      onBlur={handleFocusLost}
      onKeyDown={handleFocusLost}
      onClick={onClick}
      {...props}
    />
  )
}
