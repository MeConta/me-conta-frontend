import { Story, Meta } from '@storybook/react'

import { DateTimeCarousel, DateTimeCarouselProps } from '.'

export default {
  component: DateTimeCarousel,
  title: 'Molecules/DateTimeCarousel',
  argTypes: {
    children: {
      type: 'string'
    }
  }
} as Meta

export const Default: Story<DateTimeCarouselProps> = (args) => (
  <DateTimeCarousel {...args} />
)

Default.args = {
  schedules: [
    { date: '06 de Junho de 2022', time: '13:00' },
    { date: '14 de Junho de 2022', time: '14:00' },
    { date: '14 de Junho de 2022', time: '15:00' },
    { date: '15 de Junho de 2022', time: '17:00' }
  ]
}
