import { DropdownSelect, type DropdownSelectItem, Icon } from '@components'

export const MoreDropdown = () => {
  const options: DropdownSelectItem[] = [
    {
      label: 'Move up',
      icon: 'arrow',
      className: '[&_.icon]:-rotate-90'
    },
    {
      label: 'Move down',
      icon: 'arrow',
      className: '[&_.icon]:rotate-90'
    },
    {
      label: 'Delete',
      icon: 'trash'
    }
  ]

  const handleValueChange = (value: string) => {}

  return (
    <div className='relative w-fit'>
      <button className='button'>
        <Icon name='dots-vertical' className='size-6' />
      </button>

      <DropdownSelect
        items={options}
        onValueChange={handleValueChange}
        className={{ content: 'w-fit', group: 'w-full', item: 'w-full' }}
      />
    </div>
  )
}
