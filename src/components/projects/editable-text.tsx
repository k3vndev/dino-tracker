import { useFreshRefs } from '@hooks'
import type { ClassName } from '@types'
import { cn } from '@utils'
import { useEffect, useState } from 'react'
import { EditableTooltip } from './editable-tooltip'

interface Props {
  initialText?: string
  setState?: (text: string) => void
  defaultValue: string
  element: 'h1' | 'h2' | 'h3' | 'span'
  className?: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
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

  const inputRef = useFreshRefs<HTMLTextAreaElement | null>(null)

  const resizeTextarea = () => {
    const input = inputRef.current
    const container = input?.parentElement

    console.log({ input, container })

    if (!input || !container) return

    const maxWidth = container.clientWidth
    const { style } = input

    const paddingTotalCss = '1rem'
    const borderTotalCss = '2px'

    style.width = '0px'
    style.height = 'auto'
    style.overflow = 'scroll'
    style.textWrap = 'nowrap'

    const nextWidthValue = Math.min(input.scrollWidth, maxWidth)
    const oneLineHeight = input.clientHeight

    style.textWrap = 'wrap'
    style.overflow = 'hidden auto'

    const scrollbarWidth = input.offsetWidth - input.clientWidth
    const nextWidth = `calc(${nextWidthValue + scrollbarWidth}px + ${paddingTotalCss} + ${borderTotalCss})`

    style.width = nextWidth
    style.maxWidth = `${maxWidth}px`
    style.height = 'auto'
    const { scrollHeight } = input
    style.height = `calc(${scrollHeight}px + ${borderTotalCss})`

    const maxHeight = oneLineHeight * 2
    style.maxHeight = `${maxHeight}px`

    input.scrollTop = scrollHeight
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const startEditing = (e: React.MouseEvent<HTMLElement>) => {
    onClick?.(e)

    setIsEditing(true)
    setText(initialText || defaultValue)

    // Handle the input on the next animation frame to ensure it exists in the DOM
    requestAnimationFrame(() => {
      const input = inputRef.current

      if (input) {
        input.focus()
        const { length } = input.value
        input.setSelectionRange(length, length)

        if ((textRef.current || defaultValue) === defaultValue) {
          input.select()
        }

        resizeTextarea()
      }
    })
  }

  const handleFocusLost = (
    e: React.FocusEvent<HTMLTextAreaElement> | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    const hasKey = 'key' in e

    // If the event is a keyboard event and the key is not 'Enter', do nothing
    if (hasKey && e.key !== 'Enter') return

    if (hasKey) e.preventDefault()

    setText(validateText(textRef.current))

    requestAnimationFrame(() => {
      refreshState()
      setIsEditing(false)
    })
  }

  const validateText = (txt: string) => {
    const noNewLines = txt.replace(/\n/g, ' ').trim()
    if (!noNewLines) return defaultValue

    // Remove 2 consecutive spaces or more
    const noExtraSpaces = noNewLines.replace(/\s{2,}/g, ' ')
    return noExtraSpaces
  }

  const refreshState = () => {
    setState?.(textRef.current)
  }
  useEffect(() => refreshState, [])

  useEffect(() => {
    if (isEditing) {
      requestAnimationFrame(resizeTextarea)
    }
  }, [isEditing, text])

  const internalElementClassName: ClassName =
    'text-wrap border font-poppins text-white px-2 py-1 rounded-lg wrap-break-word whitespace-pre-wrap min-w-20 max-w-full'

  return (
    <div className={cn('w-full min-w-0 flex text-xl', propsClassName)}>
      {!isEditing ? (
        <span className='relative group min-w-0 flex'>
          <Element
            onClick={startEditing}
            className={cn(
              'cursor-pointer border-transparent min-w-0 max-w-full line-clamp-2 whitespace-normal overflow-hidden text-ellipsis',
              internalElementClassName
            )}
            {...props}
          >
            {initialText || defaultValue}
          </Element>

          <EditableTooltip />
        </span>
      ) : (
        <textarea
          ref={inputRef}
          className={cn(
            'bg-black/10 animate-input-border outline-none h-fit resize-none overflow-hidden max-w-full',
            internalElementClassName
          )}
          rows={1}
          value={text}
          onChange={handleChange}
          onBlur={handleFocusLost}
          onKeyDown={handleFocusLost}
          onClick={onClick}
          {...props}
        />
      )}
    </div>
  )
}
