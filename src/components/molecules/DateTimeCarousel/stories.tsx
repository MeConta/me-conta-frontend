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
    { dateTime: new Date('2022-06-01T18:00:00.000Z') },
    { dateTime: new Date('2022-06-02T18:00:00.000Z') },
    { dateTime: new Date('2022-06-03T18:00:00.000Z') },
    { dateTime: new Date('2022-06-04T18:00:00.000Z') },
    { dateTime: new Date('2022-06-05T18:00:00.000Z') },
    { dateTime: new Date('2022-06-06T18:00:00.000Z') },
    { dateTime: new Date('2022-06-07T18:00:00.000Z') },
    { dateTime: new Date('2022-06-08T18:00:00.000Z') },
    { dateTime: new Date('2022-06-09T18:00:00.000Z') },
    { dateTime: new Date('2022-06-10T18:00:00.000Z') },
    { dateTime: new Date('2022-06-11T18:00:00.000Z') },
    { dateTime: new Date('2022-06-12T18:00:00.000Z') },
    { dateTime: new Date('2022-06-13T18:00:00.000Z') },
    { dateTime: new Date('2022-06-14T18:00:00.000Z') },
    { dateTime: new Date('2022-06-15T18:00:00.000Z') },
    { dateTime: new Date('2022-06-16T18:00:00.000Z') },
    { dateTime: new Date('2022-06-17T18:00:00.000Z') },
    { dateTime: new Date('2022-06-18T18:00:00.000Z') },
    { dateTime: new Date('2022-06-19T18:00:00.000Z') },
    { dateTime: new Date('2022-06-20T18:00:00.000Z') },
    { dateTime: new Date('2022-06-21T18:00:00.000Z') },
    { dateTime: new Date('2022-06-22T18:00:00.000Z') },
    { dateTime: new Date('2022-06-23T18:00:00.000Z') },
    { dateTime: new Date('2022-06-24T18:00:00.000Z') },
    { dateTime: new Date('2022-06-25T18:00:00.000Z') },
    { dateTime: new Date('2022-06-26T18:00:00.000Z') },
    { dateTime: new Date('2022-06-27T18:00:00.000Z') },
    { dateTime: new Date('2022-06-28T18:00:00.000Z') },
    { dateTime: new Date('2022-06-29T18:00:00.000Z') },
    { dateTime: new Date('2022-06-30T18:00:00.000Z') },
    { dateTime: new Date('2022-07-01T18:00:00.000Z') },
    { dateTime: new Date('2022-07-02T18:00:00.000Z') },
    { dateTime: new Date('2022-07-03T18:00:00.000Z') },
    { dateTime: new Date('2022-07-04T18:00:00.000Z') },
    { dateTime: new Date('2022-07-05T18:00:00.000Z') },
    { dateTime: new Date('2022-07-06T18:00:00.000Z') },
    { dateTime: new Date('2022-07-07T18:00:00.000Z') },
    { dateTime: new Date('2022-07-08T18:00:00.000Z') },
    { dateTime: new Date('2022-07-09T18:00:00.000Z') },
    { dateTime: new Date('2022-07-10T18:00:00.000Z') },
    { dateTime: new Date('2022-07-11T18:00:00.000Z') },
    { dateTime: new Date('2022-07-12T18:00:00.000Z') },
    { dateTime: new Date('2022-07-13T18:00:00.000Z') },
    { dateTime: new Date('2022-07-14T18:00:00.000Z') },
    { dateTime: new Date('2022-07-15T18:00:00.000Z') },
    { dateTime: new Date('2022-07-16T18:00:00.000Z') },
    { dateTime: new Date('2022-07-17T18:00:00.000Z') },
    { dateTime: new Date('2022-07-18T18:00:00.000Z') },
    { dateTime: new Date('2022-07-19T18:00:00.000Z') },
    { dateTime: new Date('2022-07-20T18:00:00.000Z') },
    { dateTime: new Date('2022-07-21T18:00:00.000Z') },
    { dateTime: new Date('2022-07-22T18:00:00.000Z') },
    { dateTime: new Date('2022-07-23T18:00:00.000Z') },
    { dateTime: new Date('2022-07-24T18:00:00.000Z') },
    { dateTime: new Date('2022-07-25T18:00:00.000Z') },
    { dateTime: new Date('2022-07-26T18:00:00.000Z') },
    { dateTime: new Date('2022-07-27T18:00:00.000Z') },
    { dateTime: new Date('2022-07-28T18:00:00.000Z') },
    { dateTime: new Date('2022-07-29T18:00:00.000Z') },
    { dateTime: new Date('2022-07-30T18:00:00.000Z') },
    { dateTime: new Date('2022-08-01T18:00:00.000Z') },
    { dateTime: new Date('2022-08-02T18:00:00.000Z') },
    { dateTime: new Date('2022-08-03T18:00:00.000Z') },
    { dateTime: new Date('2022-08-04T18:00:00.000Z') },
    { dateTime: new Date('2022-08-05T18:00:00.000Z') },
    { dateTime: new Date('2022-08-06T18:00:00.000Z') },
    { dateTime: new Date('2022-08-07T18:00:00.000Z') },
    { dateTime: new Date('2022-08-08T18:00:00.000Z') },
    { dateTime: new Date('2022-08-09T18:00:00.000Z') },
    { dateTime: new Date('2022-08-10T18:00:00.000Z') },
    { dateTime: new Date('2022-08-11T18:00:00.000Z') },
    { dateTime: new Date('2022-08-12T18:00:00.000Z') },
    { dateTime: new Date('2022-08-13T18:00:00.000Z') },
    { dateTime: new Date('2022-08-14T18:00:00.000Z') },
    { dateTime: new Date('2022-08-15T18:00:00.000Z') },
    { dateTime: new Date('2022-08-16T18:00:00.000Z') },
    { dateTime: new Date('2022-08-17T18:00:00.000Z') },
    { dateTime: new Date('2022-08-18T18:00:00.000Z') },
    { dateTime: new Date('2022-08-19T18:00:00.000Z') },
    { dateTime: new Date('2022-08-20T18:00:00.000Z') },
    { dateTime: new Date('2022-08-21T18:00:00.000Z') },
    { dateTime: new Date('2022-08-22T18:00:00.000Z') },
    { dateTime: new Date('2022-08-23T18:00:00.000Z') },
    { dateTime: new Date('2022-08-24T18:00:00.000Z') },
    { dateTime: new Date('2022-08-25T18:00:00.000Z') },
    { dateTime: new Date('2022-08-26T18:00:00.000Z') },
    { dateTime: new Date('2022-08-27T18:00:00.000Z') },
    { dateTime: new Date('2022-08-28T18:00:00.000Z') },
    { dateTime: new Date('2022-08-29T18:00:00.000Z') },
    { dateTime: new Date('2022-08-30T18:00:00.000Z') }
  ]
}
