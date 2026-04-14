import { NO_DATA_LABEL } from '@consts'
import { useFreshRefs } from '@hooks'
import type { ClassName } from '@types'
import { cn } from '@utils'
import { useEffect, useMemo, useRef, useState } from 'react'
import { EditableTooltip } from '../../editable-tooltip'

interface Props {
  initialText?: string
  setState?: (text: string) => void
  defaultValue?: string
  element: 'h1' | 'h2' | 'h3' | 'span'
  className?: string
  onClick?: (e: React.MouseEvent<HTMLElement> | MouseEvent) => void
  multiline?: boolean
}

/**
 * A component that renders an editable text element. When the user clicks on the text, it turns into a textarea that can be edited. When the user clicks outside the textarea or presses the Enter key, the changes are saved and the textarea turns back into the original element.
 * Use `internal` class on the element to style the text element and the textarea with the same styles. The component will handle the resizing of the textarea based on its content and the container's width.
 * Use `editing` class on the element to style the text element when it's in editing mode.
 */
export const EditableText = ({
  initialText,
  setState,
  defaultValue,
  element: TextElement,
  className: propsClassName,
  onClick,
  multiline = false,
  ...props
}: Props) => {
  const [isEditing, setIsEditing] = useState(false)

  const textWaterfall = useMemo(
    () => initialText || defaultValue || NO_DATA_LABEL,
    [initialText, defaultValue]
  )
  const textWaterfallRef = useFreshRefs(textWaterfall)

  const [text, setText] = useState(textWaterfallRef.current)
  const textRef = useFreshRefs(text)

  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  // Detect an outer parent label element and use it to trigger the editing state on click
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const label = wrapper.closest('label')
    if (!label) return

    const handleLabelClick = (e: MouseEvent) => {
      if (e.target !== wrapper) {
        startEditing(e)
      }
    }

    label.addEventListener('click', handleLabelClick)
    return () => label.removeEventListener('click', handleLabelClick)
  }, [])

  const resizeTextarea = () => {
    const input = inputRef.current
    const container = input?.parentElement

    if (!input || !container) return

    const maxWidth = container.clientWidth
    const { style } = input

    const paddingTotalCss = '1rem'
    const borderTotalCss = '2px'

    style.width = '0px'
    style.height = 'auto'
    style.overflow = 'scroll'
    style.textWrap = 'nowrap'

    const nextWidthValue = multiline ? input.scrollWidth : Math.min(input.scrollWidth, maxWidth)
    const oneLineHeight = input.clientHeight

    style.textWrap = 'wrap'
    style.overflow = 'hidden auto'

    const scrollbarWidth = input.offsetWidth - input.clientWidth
    const nextWidth = `calc(${nextWidthValue + scrollbarWidth}px + ${paddingTotalCss} + ${borderTotalCss})`

    style.width = nextWidth

    if (multiline) {
      style.maxWidth = `${maxWidth}px`

      style.height = 'auto'
      const { scrollHeight } = input
      style.height = `calc(${scrollHeight}px + ${borderTotalCss})`

      const maxHeight = oneLineHeight * 2
      style.maxHeight = `${maxHeight}px`

      input.scrollTop = scrollHeight
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const startEditing = (e: React.MouseEvent<HTMLElement> | MouseEvent) => {
    onClick?.(e)

    setIsEditing(true)
    setText(textWaterfallRef.current)

    // Handle the input on the next animation frame to ensure it exists in the DOM
    requestAnimationFrame(() => {
      const input = inputRef.current

      if (input) {
        input.focus()
        const { length } = input.value
        input.setSelectionRange(length, length)

        if (textRef.current === defaultValue || textRef.current === NO_DATA_LABEL) {
          input.select()
        }

        resizeTextarea()
      }
    })
  }

  const handleFocusLost = (
    e:
      | React.FocusEvent<HTMLTextAreaElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.FocusEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    const hasKey = 'key' in e

    // If the event is a keyboard event and the key is not 'Enter', do nothing
    if (hasKey && e.key !== 'Enter') return

    if (hasKey) e.preventDefault()

    const validated = validateText(textRef.current)
    setText(validated)

    requestAnimationFrame(() => {
      refreshState()
      setIsEditing(false)
    })
  }

  const validateText = (txt: string) => {
    const noNewLines = txt.replace(/\n/g, ' ').trim()
    if (!noNewLines) return defaultValue || NO_DATA_LABEL

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
    'internal text-wrap border font-poppins px-2 py-1 rounded-lg wrap-break-word whitespace-pre-wrap min-w-20 max-w-full'

  const InputElement = multiline ? 'textarea' : 'input'
  const textElementClassName = multiline ? 'line-clamp-2' : 'line-clamp-1'

  return (
    <div className={cn('w-full min-w-0 flex text-white text-xl', propsClassName)} ref={wrapperRef}>
      {!isEditing ? (
        <span className='relative group min-w-0 flex'>
          <TextElement
            onClick={startEditing}
            className={cn(
              'cursor-pointer border-transparent min-w-0 max-w-full whitespace-normal overflow-hidden text-ellipsis',
              textElementClassName,
              internalElementClassName
            )}
            {...props}
          >
            {textWaterfall}
          </TextElement>

          <EditableTooltip />
        </span>
      ) : (
        <InputElement
          ref={inputRef as any}
          className={cn(
            'editing bg-black/10 animate-input-border outline-none h-fit resize-none overflow-hidden max-w-full',
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
