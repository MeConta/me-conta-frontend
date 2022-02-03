import { Story, Meta } from '@storybook/react'
import { useState } from 'react'
import { DayModifiers } from 'react-day-picker'
import { DatePicker, DatePickerProps } from '.'

export default {
  component: DatePicker,
  title: 'Atoms/DatePicker'
} as Meta

export const Default: Story<DatePickerProps> = () => {
  const [selectedDay, setSelectedDay] = useState<Date>()

  const modifiers = {
    past: { before: new Date() }
  }

  const handleDayClick = (day: Date, { past }: DayModifiers) => {
    if (past) return
    setSelectedDay(day)
  }

  return (
    <>
      <DatePicker
        onDayClick={handleDayClick}
        selectedDays={selectedDay}
        disabledDays={modifiers.past}
        modifiers={modifiers}
      />
      {selectedDay?.toString()}
    </>
  )
}
