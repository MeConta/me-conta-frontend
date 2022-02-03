import { Story, Meta } from '@storybook/react'
import { AddDates, AddDatesProps } from '.'

export default {
  component: AddDates,
  title: 'Molecules/AddDates',
  argTypes: {
    handleSave: { action: 'handleSave' }
  }
} as Meta

export const Default: Story<AddDatesProps> = (args) => {
  return <AddDates {...args} />
}

Default.args = {
  alreadySelected: []
}
