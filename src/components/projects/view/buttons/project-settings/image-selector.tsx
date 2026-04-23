import { Icon } from '@components'
import { useProjectContext } from '@context'
import { useProjectsStore } from '@store'
import type { IconName } from '@types'
import Image from 'next/image'

export const ImageSelector = () => {
  const { id: projectId, img: projectImg } = useProjectContext()
  const setProjectAttributes = useProjectsStore(s => s.setProjectAttributes)

  const imageSrc = projectImg

  const handleChangeImage = () => {
    // Create a new file input element
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = 'image/*'
    fileInput.click() // Programmatically click the input to open file dialog
    fileInput.style.display = 'none' // Hide the input element

    // Listen for file selection
    fileInput.addEventListener('change', () => {
      const file = fileInput.files?.[0]
      if (file) {
        // Create a URL for the selected file and update the image source
        const newImageSrc = URL.createObjectURL(file)
        setProjectAttributes(projectId, { img: newImageSrc })
      }

      // Clean up the file input element
      fileInput.remove()
    })
  }

  const handleRemoveImage = () => {
    setProjectAttributes(projectId, { img: undefined })
  }

  return (
    <div className='w-full h-30 rounded-lg border border-white/20 overflow-clip relative flex items-center justify-center'>
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
        <Button icon='camera-plus' onClick={handleChangeImage} title='Change cover image' />
        <Button icon='cross' onClick={handleRemoveImage} title='Remove cover image' />
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
