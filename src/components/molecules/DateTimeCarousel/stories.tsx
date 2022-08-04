import { Story, Meta } from '@storybook/react'
import { date } from 'yup/lib/locale'

import { DateTimeCarousel, DateTimeCarouselProps } from '.'

export default {
  component: DateTimeCarousel,
  title: 'Molecules/DateTimeCarousel',
  argTypes: {
    children: {
      type: 'string'
    }
  },
  decorators: [
    (Story) => (
      <div
        style={{ padding: '3em', backgroundColor: '#F4F7F9', height: '400px' }}
      >
        <Story />
      </div>
    )
  ]
} as Meta

export const Default: Story<DateTimeCarouselProps> = (args) => (
  <DateTimeCarousel {...args} />
)

Default.args = {
  schedules: [
    { date: '01/06/2022', time: '13:00' },
    { date: '02 de Junho de 2022', time: '14:00' },
    { date: '03 de Junho de 2022', time: '15:00' },
    { date: '04 de Junho de 2022', time: '17:00' },
    { date: '05 de Junho de 2022', time: '15:00' },
    { date: '06 de Junho de 2022', time: '17:00' },
    { date: '07 de Junho de 2022', time: '17:00' },
    { date: '08 de Junho de 2022', time: '17:00' },
    { date: '09 de Junho de 2022', time: '17:00' },
    { date: '10 de Junho de 2022', time: '17:00' },
    { date: '11 de Junho de 2022', time: '13:00' },
    { date: '12 de Junho de 2022', time: '14:00' },
    { date: '13 de Junho de 2022', time: '15:00' },
    { date: '14 de Junho de 2022', time: '17:00' },
    { date: '15 de Junho de 2022', time: '15:00' },
    { date: '16 de Junho de 2022', time: '17:00' },
    { date: '17 de Junho de 2022', time: '17:00' },
    { date: '18 de Junho de 2022', time: '17:00' },
    { date: '19 de Junho de 2022', time: '17:00' },
    { date: '20 de Junho de 2022', time: '17:00' },
    { date: '21 de Junho de 2022', time: '13:00' },
    { date: '22 de Junho de 2022', time: '14:00' },
    { date: '23 de Junho de 2022', time: '15:00' },
    { date: '24 de Junho de 2022', time: '17:00' },
    { date: '25 de Junho de 2022', time: '15:00' },
    { date: '26 de Junho de 2022', time: '17:00' },
    { date: '27 de Junho de 2022', time: '17:00' },
    { date: '28 de Junho de 2022', time: '17:00' },
    { date: '29 de Junho de 2022', time: '17:00' },
    { date: '30 de Junho de 2022', time: '17:00' },
    { date: '31 de Junho de 2022', time: '13:00' },
    { date: '32 de Junho de 2022', time: '14:00' },
    { date: '33 de Junho de 2022', time: '15:00' },
    { date: '34 de Junho de 2022', time: '17:00' },
    { date: '35 de Junho de 2022', time: '15:00' },
    { date: '36 de Junho de 2022', time: '17:00' },
    { date: '37 de Junho de 2022', time: '17:00' },
    { date: '38 de Junho de 2022', time: '17:00' },
    { date: '39 de Junho de 2022', time: '17:00' },
    { date: '40 de Junho de 2022', time: '17:00' },
    { date: '41 de Junho de 2022', time: '13:00' },
    { date: '42 de Junho de 2022', time: '14:00' },
    { date: '43 de Junho de 2022', time: '15:00' },
    { date: '44 de Junho de 2022', time: '17:00' },
    { date: '45 de Junho de 2022', time: '15:00' },
    { date: '46 de Junho de 2022', time: '17:00' },
    { date: '47 de Junho de 2022', time: '17:00' },
    { date: '48 de Junho de 2022', time: '17:00' },
    { date: '49 de Junho de 2022', time: '17:00' },
    { date: '50 de Junho de 2022', time: '17:00' },
    { date: '51 de Junho de 2022', time: '13:00' },
    { date: '52 de Junho de 2022', time: '14:00' },
    { date: '53 de Junho de 2022', time: '15:00' },
    { date: '54 de Junho de 2022', time: '17:00' },
    { date: '55 de Junho de 2022', time: '15:00' },
    { date: '56 de Junho de 2022', time: '17:00' },
    { date: '57 de Junho de 2022', time: '17:00' },
    { date: '58 de Junho de 2022', time: '17:00' },
    { date: '59 de Junho de 2022', time: '17:00' },
    { date: '60 de Junho de 2022', time: '17:00' },
    { date: '61 de Junho de 2022', time: '13:00' },
    { date: '62 de Junho de 2022', time: '14:00' },
    { date: '63 de Junho de 2022', time: '15:00' },
    { date: '64 de Junho de 2022', time: '17:00' },
    { date: '65 de Junho de 2022', time: '15:00' },
    { date: '66 de Junho de 2022', time: '17:00' },
    { date: '67 de Junho de 2022', time: '17:00' },
    { date: '68 de Junho de 2022', time: '17:00' },
    { date: '69 de Junho de 2022', time: '17:00' },
    { date: '70 de Junho de 2022', time: '17:00' },
    { date: '71 de Junho de 2022', time: '13:00' },
    { date: '72 de Junho de 2022', time: '14:00' },
    { date: '73 de Junho de 2022', time: '15:00' },
    { date: '74 de Junho de 2022', time: '17:00' },
    { date: '75 de Junho de 2022', time: '15:00' },
    { date: '76 de Junho de 2022', time: '17:00' },
    { date: '77 de Junho de 2022', time: '17:00' },
    { date: '78 de Junho de 2022', time: '17:00' },
    { date: '79 de Junho de 2022', time: '17:00' },
    { date: '80 de Junho de 2022', time: '17:00' },
    { date: '81 de Junho de 2022', time: '13:00' },
    { date: '82 de Junho de 2022', time: '14:00' },
    { date: '83 de Junho de 2022', time: '15:00' },
    { date: '84 de Junho de 2022', time: '17:00' },
    { date: '85 de Junho de 2022', time: '15:00' },
    { date: '86 de Junho de 2022', time: '17:00' },
    { date: '87 de Junho de 2022', time: '17:00' },
    { date: '88 de Junho de 2022', time: '17:00' },
    { date: '89 de Junho de 2022', time: '17:00' },
    { date: '90 de Junho de 2022', time: '17:00' }
  ]
}
