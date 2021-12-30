import { Story, Meta } from '@storybook/react'

import { DateSelect, DateSelectProps } from '.'

export default {
  component: DateSelect,
  title: 'Molecules/DateSelect',
  argTypes: {
    onChange: { action: 'changed', control: false }
  }
} as Meta

export const Default: Story<DateSelectProps> = (args) => (
  <DateSelect {...args} />
)
