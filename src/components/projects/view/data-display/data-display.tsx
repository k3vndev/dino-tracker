import { DEFAULT_COLOR } from '@consts'
import { DataDisplayContext, type UpdateField, useProjectContext } from '@context'
import { useProjectsStore } from '@store'
import type { CustomField, DataDisplay as DataDisplayType, Project } from '@types'
import { calcAnimationDelay, hueRotate } from '@utils'
import { useCallback, useMemo, useState } from 'react'
import { Daily } from './daily'
import { Static } from './static'

interface Props extends DataDisplayType {
  index: number
}

export const DataDisplay = ({ fieldIds, id, index, ...dataDisplay }: Props) => {
  const projects = useProjectsStore(s => s.projects)
  const setProjectAttributes = useProjectsStore(s => s.setProjectAttributes)
  const [optionIndex, setOptionIndex] = useState(dataDisplay.optionIndex ?? 0)
  const { id: projectId } = useProjectContext()

  const projectIndex = useMemo(() => projects.findIndex(p => p.id === projectId), [projects, projectId])
  const dataDisplayIndex = useMemo(
    () => projects[projectIndex]?.dataDisplay?.findIndex(dd => dd.id === id) ?? -1,
    [projectIndex, id]
  )

  const project: Project | undefined = useMemo(() => projects[projectIndex], [projectIndex, projects])

  // Validate the provided fieldIds against the project's custom fields and ensure they are all of the same type.
  const validatedFields = useMemo((): CustomField[] | null => {
    if (!project || !project.customFields) {
      console.warn(`Project with id ${projectId} not found.`)
      return null
    }

    // Create a set of the provided fieldIds for efficient lookup
    const idsSet = new Set(fieldIds)
    if (idsSet.size === 0) return null

    const result: CustomField[] = []

    // Filter the project's custom fields to find those that match the provided fieldIds.
    for (const field of project.customFields) {
      const fieldIsInFieldIds = idsSet.has(field.id)

      if (fieldIsInFieldIds) {
        result.push(field)
      }
    }

    // If no data is found for the provided ids, return null to avoid rendering an empty component.
    if (result.length === 0) {
      return null
    }

    return result
  }, [fieldIds, project, projectId])

  // Create a map of field id to field data (excluding the id) for easy access when rendering the chart and legend.
  const fieldsMap = useMemo(() => {
    if (!validatedFields) return null

    const mappedFields: Record<string, Omit<CustomField, 'id'>> = {}

    for (const field of validatedFields) {
      const { id: fieldId, ...fieldWithoutId } = field
      mappedFields[fieldId] = fieldWithoutId
    }
    return mappedFields
  }, [validatedFields])

  // Generate a color for each field key, using the field's specified color if available
  const getFieldColor = useCallback(
    (id: string) => {
      if (!fieldsMap || !fieldIds) return DEFAULT_COLOR

      const field = fieldsMap[id]
      if (!field) return DEFAULT_COLOR
      if (field.color) return field.color

      const defaultColor = project?.color || DEFAULT_COLOR
      if (fieldIds.length === 1) return defaultColor

      const HUE_AMOUNT = 30
      const index = fieldIds.indexOf(id)
      if (index < 0) return defaultColor

      const hueValue = (index - (fieldIds.length - 1) / 2) * HUE_AMOUNT
      return hueRotate(defaultColor, hueValue)
    },
    [fieldIds, fieldsMap, project?.color]
  )

  const isStatic = dataDisplay.type === 'static'

  // Function to add or remove a field from the data display configuration
  const updateField: UpdateField = (field, action) => {
    if (dataDisplayIndex === -1) return

    const { dataDisplay } = projects[projectIndex]
    if (!dataDisplay?.length) return

    // Create a new array of data displays with the updated fieldIds for the relevant data display.
    const updatedDataDisplay = [...dataDisplay]

    // Use a Set to ensure we don't add duplicate fieldIds, then convert it back to an array.
    const idsSet = new Set(updatedDataDisplay[dataDisplayIndex].fieldIds)
    idsSet[action](field.id) // Either add or delete the field id based on the action.
    updatedDataDisplay[dataDisplayIndex].fieldIds = Array.from(idsSet)

    // Update the store with the new data display configuration
    setProjectAttributes(projectId, { dataDisplay: updatedDataDisplay })
  }

  const fieldsHaveData = useMemo(
    () =>
      !!validatedFields?.length &&
      validatedFields?.some(
        field =>
          (field.type === 'daily' && field.value.length > 0) ||
          (field.type === 'static' && field.value !== undefined && field.value !== null)
      ),
    [validatedFields]
  )

  return (
    <DataDisplayContext.Provider
      value={{
        fieldIds,
        id,
        projectId,
        fields: validatedFields,
        fieldsMap,
        getFieldColor,
        optionIndex,
        setOptionIndex,
        updateField,
        projectIndex,
        dataDisplayIndex,
        fieldsHaveData,
        ...dataDisplay
      }}
    >
      <article
        className='w-full bg-linear-to-t from-black/80 to-black/95 backdrop-blur-lg border border-white/15 rounded-xl px-5 py-4 group/data-display animation-slide-in-from-bottom'
        style={{ animationDelay: calcAnimationDelay(index, 250, 150) }}
      >
        {isStatic ? <Static /> : <Daily />}
      </article>
    </DataDisplayContext.Provider>
  )
}
