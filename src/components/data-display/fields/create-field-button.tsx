import { Icon } from '@components'
import { useDataDisplayContext } from '@context'
import { useProjectsStore } from '@store'
import type { CustomField } from '@types'
import { useMemo } from 'react'

export const CreateFieldButton = () => {
  const { projectId, type: projectType, fieldIds } = useDataDisplayContext()

  const projects = useProjectsStore(s => s.projects)
  // const setProjectAttributes = useProjectsStore(s => s.setProjectAttributes)

  const potentialFieldsToAdd = useMemo(() => {
    const proj = projects.find(p => p.id === projectId)
    const { customFields } = proj || {}

    if (!customFields || !projectType) return null

    const idsSet = new Set(fieldIds)
    const result: CustomField[] = []

    for (const field of customFields) {
      // For static charts we want to show all the fields, for daily we want to show only the daily ones.
      if (projectType === 'daily' && field.type !== 'daily') {
        continue
      }

      if (!idsSet.has(field.id)) {
        result.push(field)
      }
    }

    return result
  }, [projects, projectId, projectType, fieldIds])

  const handleClick = () => {
    // TODO:
    // - Implement a dropdown or modal to select from potentialFieldsToAdd.
    // - Add the selected field's id to the fieldIds in the context.

    console.log(potentialFieldsToAdd)
  }

  return (
    <button
      className='border border-white/20 rounded-full px-2.5 py-0.5 flex items-center gap-0.5 bg-white/5 button'
      onClick={handleClick}
      title='Create new field'
    >
      <Icon name='plus' className='size-4' />
    </button>
  )
}
