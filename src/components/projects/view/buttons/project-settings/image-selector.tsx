import { Icon } from '@components'
import { useProjectContext } from '@context'
import { useProjectsStore } from '@store'
import type { IconName } from '@types'
import Image from 'next/image'
import { type DragEvent, useRef, useState } from 'react'

export const ImageSelector = () => {
  const { id: projectId, img: projectImg } = useProjectContext()
  const setProjectAttributes = useProjectsStore(s => s.setProjectAttributes)
  const [isDraggingImage, setIsDraggingImage] = useState(false)
  const dragDepth = useRef(0)

  const imageSrc = projectImg

  const updateProjectImage = (file: File) => {
    if (!file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = () => {
      setProjectAttributes(projectId, { img: reader.result as string })
    }
    reader.readAsDataURL(file)
  }

  const isImageDragEvent = (e: DragEvent<HTMLDivElement>) =>
    Array.from(e.dataTransfer.items).some(item => item.kind === 'file' && item.type.startsWith('image/'))

  const handleChangeImage = () => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = 'image/*'

    fileInput.addEventListener('change', () => {
      const file = fileInput.files?.[0]
      if (file) updateProjectImage(file)

      fileInput.remove()
    })

    fileInput.click()
  }

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    if (!isImageDragEvent(e)) return

    dragDepth.current += 1
    setIsDraggingImage(true)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    if (!isImageDragEvent(e)) return

    e.dataTransfer.dropEffect = 'copy'
    setIsDraggingImage(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    if (!isImageDragEvent(e)) return

    dragDepth.current -= 1

    if (dragDepth.current <= 0) {
      dragDepth.current = 0
      setIsDraggingImage(false)
    }
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    dragDepth.current = 0
    setIsDraggingImage(false)

    const file = Array.from(event.dataTransfer.files).find(file => file.type.startsWith('image/'))
    if (file) updateProjectImage(file)
  }

  const handleRemoveImage = () => {
    setProjectAttributes(projectId, { img: undefined })
  }

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`w-full h-30 rounded-lg overflow-clip relative flex items-center justify-center ${
        isDraggingImage ? 'border border-dashed border-white/50' : 'border border-white/20'
      }`}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt='Cover image selected for the project'
          width={400}
          height={100}
          className='w-full max-h-full object-cover blur-[2px] opacity-50 absolute top-0 left-0 -z-10'
        />
      ) : (
        <div className='size-full absolute top-0 left-0 -z-10 bg-black/50' />
      )}

      <div className='flex items-center justify-center gap-4'>
        {isDraggingImage ? (
          <span className='text-white/80 text-xl font-medium animate-bounce'>Drop it here!</span>
        ) : (
          <>
            <Button icon='camera-plus' onClick={handleChangeImage} title='Change cover image' />
            <Button icon='cross' onClick={handleRemoveImage} title='Remove cover image' />
          </>
        )}
      </div>
    </div>
  )
}

interface Props {
  icon: IconName
  onClick: () => void
  title: string
}

const Button = ({ icon, onClick, title }: Props) => (
  <button
    type='button'
    onClick={onClick}
    title={title}
    className='bg-black/75 p-3 rounded-full border border-white/10 hover:bg-white/20 button'
  >
    <Icon name={icon} className='size-8' />
  </button>
)
