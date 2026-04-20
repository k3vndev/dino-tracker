import { EditableText } from '@components/projects/view'
import { DATA_DISPLAY_DEFAULT_TITLE } from '@consts'
import { useDataDisplayContext } from '@context'
import { useProjectsStore } from '@store'
import { Fields } from '../fields/fields-section'
import { Select } from '../select'
import { MoreDropdown } from './more-dropdown'

interface Props {
  selectOptions: string[]
  onSelectChange: (value: number) => void
  selectInitialValue?: number
  selectLabel: string
}

export const Header = ({ selectOptions, onSelectChange, selectInitialValue = 0, selectLabel }: Props) => {
  const { title, projectId, dataDisplayIndex, projectIndex } = useDataDisplayContext()
  const setProjectAttributes = useProjectsStore(s => s.setProjectAttributes)
  const projects = useProjectsStore(s => s.projects)

  const setTitle = (newTitle: string) => {
    const foundProject = projects[projectIndex]
    if (!foundProject) return

    const { dataDisplay } = foundProject
    const newDataDisplayList = [...(dataDisplay ?? [])]
    if (!newDataDisplayList) return

    if (dataDisplayIndex === -1) return

    // Set state
    newDataDisplayList[dataDisplayIndex].title = newTitle
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

        <div className='flex items-center gap-2'>
          <Select
            initialValue={selectInitialValue}
            options={selectOptions}
            onChange={onSelectChange}
            label={selectLabel}
          />
          <MoreDropdown />
        </div>
      </div>

      <Fields />
    </header>
  )
}
