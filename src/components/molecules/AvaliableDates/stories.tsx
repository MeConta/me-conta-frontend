import { Story, Meta } from '@storybook/react'

import { AvaliableTimes, AvaliableTimesProps } from '.'

export default {
  component: AvaliableTimes,
  title: 'Molecules/AvaliableTimes',
  argTypes: {
    onDelete: { action: 'deleted' }
  }
} as Meta

export const Default: Story<AvaliableTimesProps> = (args) => (
  <AvaliableTimes {...args} />
)

Default.args = {
  dates: [
    {
      date: new Date(2021, 11, 17, 13),
      deletable: true
    },
    {
      date: new Date(2021, 11, 18, 14),
      deletable: true
    },
    {
      date: new Date(2021, 11, 19, 9),
      deletable: true
    },
    {
      date: new Date(2021, 11, 20, 13),
      deletable: true
    },
    {
      date: new Date(2021, 11, 21, 14),
      deletable: false
    },
    {
      date: new Date(2021, 11, 22, 8),
      deletable: true
    },
    {
      date: new Date(2021, 11, 23, 13),
      deletable: true
    },
    {
      date: new Date(2021, 11, 24, 14),
      deletable: false
    },
    {
      date: new Date(2021, 11, 25, 8),
      deletable: true
    },
    {
      date: new Date(2021, 11, 26, 13),
      deletable: true
    },
    {
      date: new Date(2021, 11, 27, 17),
      deletable: true
    },
    {
      date: new Date(2021, 11, 28, 14),
      deletable: true
    },
    {
      date: new Date(2021, 11, 29, 13),
      deletable: true
    },
    {
      date: new Date(2021, 11, 30, 14),
      deletable: true
    }
  ]
}
