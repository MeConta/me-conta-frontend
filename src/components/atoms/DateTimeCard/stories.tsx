import { Story, Meta } from '@storybook/react'
import { DateTimeCard, DateTimeCardProps } from '.'

export default {
  component: DateTimeCard,
  title: 'Atoms/DateTimeCard'
} as Meta

export const Default: Story<DateTimeCardProps> = (args) => (
  <DateTimeCard {...args} />
)

Default.args = {
  date: '14 de julho de 2022',
  time: '18:00'
}
