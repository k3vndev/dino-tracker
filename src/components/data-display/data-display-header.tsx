import { DATA_DISPLAY_DEFAULT_TITLE } from '@consts'
import { useDataDisplayContext } from '@context'
import { useProjectsStore } from '@store'
import { EditableText } from '../projects'
import { Fields } from './fields/fields-section'
import { Select } from './select'

interface Props {
  selectOptions: string[]
  onSelectChange: (value: number) => void
  selectInitialValue?: number
  selectLabel: string
}

export const DataDisplayHeader = ({
  selectOptions,
  onSelectChange,
  selectInitialValue = 0,
  selectLabel
}: Props) => {
  const { title, projectId, id: dataDisplayId } = useDataDisplayContext()
  const setProjectAttributes = useProjectsStore(s => s.setProjectAttributes)
  const projects = useProjectsStore(s => s.projects)

  const setTitle = (newTitle: string) => {
    const foundProject = projects.find(p => p.id === projectId)
    if (!foundProject) return

    const { dataDisplay } = foundProject
    const newDataDisplayList = [...(dataDisplay ?? [])]
    if (!newDataDisplayList) return

    const index = newDataDisplayList?.findIndex(dd => dd.id === dataDisplayId)
    if (index === -1) return

    // Set state
    newDataDisplayList[index].title = newTitle
    setProjectAttributes(projectId, { dataDisplay: newDataDisplayList })
  }

  return (
    <header className='flex flex-col items-start gap-1 justify-between'>
      <div className='flex w-full justify-between gap-4'>
        <EditableText
          element='h3'
          className='-translate-x-2'
          defaultValue={DATA_DISPLAY_DEFAULT_TITLE}
          initialText={title}
          setState={setTitle}
        />

        <Select
          initialValue={selectInitialValue}
          options={selectOptions}
          onChange={onSelectChange}
          label={selectLabel}
        />
      </div>

      <Fields />
    </header>
  )
}
