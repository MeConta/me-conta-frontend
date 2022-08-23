import { useEffect, useState } from 'react'
import { DayModifiers } from 'react-day-picker'
import { Close } from 'styled-icons/evil'

import * as S from './styles'
import { DatePicker } from '../../atoms/DatePicker'
import { Button } from '../../atoms/Button'
import router from 'next/router'
import { ArrowLeft, InfoCircle } from 'styled-icons/bootstrap'
import { SelectField } from '../../atoms/SelectField/index'
import Tooltip from 'components/atoms/Tooltip'
import { ToastType, useToast } from 'services/toast-service/toast-service'

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
  const { emit } = useToast()

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
    const startOfDay = new Date(day.getTime()).setHours(8, 0, 0, 0)
    return new Array(25).fill(undefined).map((_time, i) => {
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

  function showSuccessFeedback(messageInput: string) {
    emit({
      type: ToastType.SUCCESS,
      message: messageInput
    })
  }

  const successSaveMessage = 'Horários salvos com sucesso!'

  const handleSaveSlots = () => {
    handleSave(selectedSlots)
    //showSuccessFeedback(successSaveMessage) // SUCESS-TOAST
    setSelectedSlots([])
  }

  const goBack = async function () {
    await router.push('/dashboard-atendente')
  }

  const renderSelectTimeField = () => {
    return (
      <SelectField
        labelField=""
        options={availableSlots.map((time, i) => {
          return {
            value: time.getTime(),
            label: time.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            })
          }
        })}
        name=""
        onChange={(e) => handleSelectChange(e.target.value)}
        defaultSelect="Selecionar hora"
        value=""
      />
    )
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
            <div>
              <div id="title-tooltip">
                <h4 className="card-header">Selecione os horários</h4>
                <Tooltip text="Fuso horário: Brasília (BRT). As sessões possuem 1h de duração.">
                  <InfoCircle
                    style={{ marginBottom: '2rem', marginLeft: '1rem' }}
                    data-testid="tooltip"
                    width={15}
                    height={15}
                  ></InfoCircle>
                </Tooltip>
              </div>
              {availableSlots.length > 0 ? (
                renderSelectTimeField()
              ) : (
                <div>Não existem mais horarios disponíveis nesse dia.</div>
              )}
              <div className="slots">
                {selectedSlots.map((time, i) => (
                  <div className="slot" key={i}>
                    <div className="slot-time">
                      {time.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    <button
                      className="delete"
                      onClick={() => handleDelete(time)}
                    >
                      <Close />
                    </button>
                  </div>
                ))}
              </div>
              {selectedSlots.length > 0 && (
                <Button
                  className="save"
                  color="secondary"
                  radius="square"
                  size="medium"
                  textTransform="uppercase"
                  onClick={handleSaveSlots}
                >
                  Salvar
                </Button>
              )}
            </div>
            <Button onClick={goBack} btnStyle="link" prefixIcon={<ArrowLeft />}>
              Voltar ao Dashboard
            </Button>
          </div>
        )}
      </div>
    </S.Wrapper>
  )
}
