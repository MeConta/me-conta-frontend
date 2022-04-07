import { Story, Meta } from '@storybook/react'

import { AvailableDates, AvailableDatesProps } from '.'

export default {
  component: AvailableDates,
  title: 'Molecules/AvailableDates',
  argTypes: {
    onDelete: { action: 'deleted' }
  }
} as Meta

export const Default: Story<AvailableDatesProps> = (args) => (
  <AvailableDates {...args} />
)

Default.args = {
  dates: [
    {
      id: 1,
      inicio: new Date(2021, 11, 17, 13).toISOString(),
      fim: new Date(2021, 11, 17, 14).toISOString()
    },
    {
      id: 2,
      inicio: new Date(2021, 11, 18, 14).toISOString(),
      fim: new Date(2021, 11, 18, 15).toISOString()
    },
    {
      id: 3,
      inicio: new Date(2021, 11, 19, 9).toISOString(),
      fim: new Date(2021, 11, 19, 10).toISOString()
    },
    {
      id: 4,
      inicio: new Date(2021, 11, 20, 13).toISOString(),
      fim: new Date(2021, 11, 20, 14).toISOString()
    },
    {
      id: 5,
      inicio: new Date(2021, 11, 21, 14).toISOString(),
      fim: new Date(2021, 11, 21, 15).toISOString()
    },
    {
      id: 6,
      inicio: new Date(2021, 11, 22, 8).toISOString(),
      fim: new Date(2021, 11, 22, 9).toISOString()
    },
    {
      id: 7,
      inicio: new Date(2021, 11, 23, 13).toISOString(),
      fim: new Date(2021, 11, 23, 14).toISOString()
    },
    {
      id: 8,
      inicio: new Date(2021, 11, 24, 14).toISOString(),
      fim: new Date(2021, 11, 24, 15).toISOString()
    },
    {
      id: 9,
      inicio: new Date(2021, 11, 25, 8).toISOString(),
      fim: new Date(2021, 11, 25, 9).toISOString()
    },
    {
      id: 10,
      inicio: new Date(2021, 11, 26, 13).toISOString(),
      fim: new Date(2021, 11, 26, 14).toISOString()
    },
    {
      id: 11,
      inicio: new Date(2021, 11, 27, 17).toISOString(),
      fim: new Date(2021, 11, 27, 18).toISOString()
    },
    {
      id: 12,
      inicio: new Date(2021, 11, 28, 14).toISOString(),
      fim: new Date(2021, 11, 28, 15).toISOString()
    },
    {
      id: 13,
      inicio: new Date(2021, 11, 29, 13).toISOString(),
      fim: new Date(2021, 11, 29, 14).toISOString()
    },
    {
      id: 14,
      inicio: new Date(2021, 11, 30, 14).toISOString(),
      fim: new Date(2021, 11, 30, 15).toISOString()
    }
  ]
}
