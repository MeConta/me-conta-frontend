import { Story, Meta } from '@storybook/react'
import { DateTimeCard, DateTimeCardProps } from '.'

export default {
  component: DateTimeCard,
  title: 'Atoms/DateTimeCard'
} as Meta

export const Default: Story<DateTimeCardProps> = (args) => (
  <DateTimeCard {...args} />
)

const dateTimeExample = new Date('2022-07-14T18:00:00.000Z')

Default.args = {
  dateTime: dateTimeExample
}
