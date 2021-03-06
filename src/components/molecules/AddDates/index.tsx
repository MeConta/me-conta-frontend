import { useEffect, useState } from 'react'
import { DayModifiers } from 'react-day-picker'
import { Close } from 'styled-icons/evil'

import * as S from './styles'
import { DatePicker } from '../../atoms/DatePicker'
import { Button } from '../../atoms/Button'

export type AddDatesProps = {
  alreadySelected: Date[]
  handleSave: Function
}

export function AddDates({ alreadySelected = [], handleSave }: AddDatesProps) {
  const [selectedDay, setSelectedDay] = useState<Date>()
  const [availableSlots, setAvailableSlots] = useState<Date[]>([])
  const [selectedSlots, setSelectedSlots] = useState<Date[]>([])
  const modifiers = {
    past: { before: new Date() }
  }

  useEffect(() => {
    const filterSlots = (timeList: Date[], selectedAlready: Date[]): Date[] => {
      return timeList.filter((time) => {
        if (time.getTime() < new Date().getTime()) return false
        if ([...selectedAlready, ...selectedSlots].length < 1) return true
        return ![...selectedAlready, ...selectedSlots].some((selected) =>
          verifySlotsOverlap(
            selected,
            addOneHourInDate(selected),
            time,
            addOneHourInDate(time)
          )
        )
      })
    }

    const fillSelectOptions = (day: Date = new Date()) => {
      const filteredOptions = filterSlots(getSlots(day), alreadySelected)
      setAvailableSlots(filteredOptions)
    }

    fillSelectOptions(selectedDay)
  }, [selectedSlots, selectedDay, alreadySelected])

  const handleDayClick = (day: Date, { past }: DayModifiers) => {
    if (past) return
    setSelectedDay(day)
  }

  const verifySlotsOverlap = (
    firstSlotStart: Date,
    firstSlotEnd: Date,
    secondSlotStart: Date,
    secondSlotEnd: Date
  ) => firstSlotStart < secondSlotEnd && firstSlotEnd > secondSlotStart

  const addOneHourInDate = (date: Date) => new Date(date.getTime() + 3600000)

  const getSlots = (day: Date) => {
    const startOfDay = new Date(day.getTime()).setHours(0, 0, 0, 0)
    return new Array(48).fill(undefined).map((_time, i) => {
      return new Date(startOfDay + 1800000 * i)
    })
  }

  const handleSelectChange = (time: string) => {
    const date = new Date(parseInt(time))

    setSelectedSlots([...selectedSlots, date])
  }

  const handleDelete = (time: Date) => {
    const newList = selectedSlots.filter((item) => item !== time)
    setSelectedSlots(newList)
  }

  const handleSaveSlots = () => {
    handleSave(selectedSlots)

    setSelectedSlots([])
  }

  return (
    <S.Wrapper>
      <div className="card">
        <div className="select-day-container">
          <h4 className="card-header">Selecione a data</h4>
          <DatePicker
            locale="pt-br"
            onDayClick={handleDayClick}
            selectedDays={selectedDay}
            disabledDays={modifiers.past}
            modifiers={modifiers}
          />
        </div>
        {selectedDay && (
          <div className="select-time-container">
            <h4 className="card-header">Seleciona o hor??rio</h4>
            <div className="slots">
              {selectedSlots.map((time, i) => (
                <div className="slot" key={i}>
                  <div className="slot-date">{time.toLocaleDateString()}</div>
                  <div className="slot-time">
                    {time.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  <button className="delete" onClick={() => handleDelete(time)}>
                    <Close />
                  </button>
                </div>
              ))}
              {availableSlots.length > 0 ? (
                <select
                  className="select-field"
                  value=""
                  onChange={(e) => handleSelectChange(e.target.value)}
                >
                  <option value="" disabled>
                    Selecionar hora
                  </option>
                  {availableSlots.map((time, i) => (
                    <option key={i} value={time.getTime()}>
                      {time.toLocaleString()}
                    </option>
                  ))}
                </select>
              ) : (
                <div>N??o existem mais horarios dispon??veis nesse dia.</div>
              )}
            </div>
          </div>
        )}
      </div>
      <Button
        className="save"
        color="secondary"
        radius="square"
        size="medium"
        onClick={handleSaveSlots}
      >
        Salvar
      </Button>
    </S.Wrapper>
  )
}
