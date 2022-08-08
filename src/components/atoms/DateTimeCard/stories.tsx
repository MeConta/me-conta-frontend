import { Story, Meta } from '@storybook/react'
import { DateTimeCard, DateTimeCardProps } from '.'

export default {
  component: DateTimeCard,
  title: 'Atoms/DateTimeCard'
} as Meta

export const Default: Story<DateTimeCardProps> = () => (
  <div>
    <DateTimeCard dateTime={new Date('2022-07-14T18:00:00.000Z')} />
    <DateTimeCard dateTime={new Date('2001-07-02T06:00:00.000Z')} />
  </div>
)
