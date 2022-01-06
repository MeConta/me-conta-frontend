import { Story, Meta } from '@storybook/react'

import { DateSelect, DateSelectProps } from '.'
import { DateInfo } from './dateInfo'

export default {
  component: DateSelect,
  title: 'Molecules/DateSelect',
  argTypes: {
    onChange: { action: 'changed' }
  }
} as Meta

export const Default: Story<DateSelectProps> = (args) => (
  <DateSelect {...args} />
)

Default.args = {
  availability: DateInfo
}
