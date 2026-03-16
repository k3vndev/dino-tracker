import { EditableText } from './editable-text'

interface Props {
  label: string
  hourly?: boolean
  data?: number
  setData?: (value: number) => void
}

export const Payment = ({ label, hourly = false, data, setData }: Props) => {
  const visibility = data === undefined ? 'hidden group-hover/project:flex' : 'flex'

  const handleSetData = (txt: string) => {
    const numericValue = Number.parseFloat(txt.trim())
    if (!Number.isNaN(numericValue)) {
      setData?.(numericValue)
      console.log(numericValue)
    }
  }

  const editableTextStyle =
    data === undefined ? 'text-white/25 [&_.internal:not(.editing)]:text-xl' : 'text-white'

  return (
    <label
      className={`${visibility} items-center flex-col gap-0.5 font-poppins text-xl animate-in fade-in-0 animation-duration-[250ms] group/tooltip`}
    >
      <span className='text-sm text-white/50 font-semibold'>{label}</span>

      <div className='flex items-center'>
        <span className='text-xl'>$</span>
        <EditableText
          setState={handleSetData}
          defaultValue={data?.toString()}
          element='span'
          className={`[&_.internal]:min-w-0 max-w-48 font-semibold peer text-3xl ${editableTextStyle}`}
        />
        {hourly && (
          <span className='opacity-30 text-lg group-hover/tooltip:peer-[:has(.internal):not(:has(.editing))]:opacity-0 transition'>
            /hr
          </span>
        )}
      </div>
    </label>
  )
}
