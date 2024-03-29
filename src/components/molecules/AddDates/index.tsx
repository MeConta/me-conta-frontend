import { useEffect, useState } from 'react'
import { DayModifiers } from 'react-day-picker'
import * as S from './styles'
import { DatePicker } from '../../atoms/DatePicker'
import { Button } from '../../atoms/Button'
import router from 'next/router'
import { ArrowLeft, InfoCircle } from 'styled-icons/bootstrap'
import { SelectField } from '../../atoms/SelectField/index'
import Chip from 'components/atoms/Chip'
import theme from 'styles/theme'
import { api } from 'services/api/api'
import { VolunteerService } from '../../../services/volunteers-service/volunteer-service'
import { getTokenData } from '../../../utils/authentication/getTokenData'
import { Tooltip } from '../../atoms/Tooltip'
import { sortSlotsByTime } from '../../../utils/order/helpers'

export type AddDatesProps = {
  alreadySelected: Date[]
  handleSave: Function
  handleDeleteChip: Function
}

const volunteerService = new VolunteerService(api)

const userData = getTokenData()

export function AddDates({
  alreadySelected = [],
  handleSave,
  handleDeleteChip
}: AddDatesProps) {
  const [selectedDay, setSelectedDay] = useState<Date>()
  const [availableSlots, setAvailableSlots] = useState<Date[]>([])
  const [selectedSlots, setSelectedSlots] = useState<Date[]>([])
  const [chipSlots, setChipSlots] = useState<Date[]>([])
  const [savedChip, setSavedChip] = useState<any>([])

  const modifiers = {
    past: { before: new Date() }
  }

  const handleFindAvailableSlotById = async (selectedDay: Date) => {
    if (userData) {
      const findAvailableSlots = await volunteerService.findAvailableSlotsById(
        userData.id,
        selectedDay
      )
      const sortedAvailableSlolts = sortSlotsByTime(findAvailableSlots)
      setSavedChip(sortedAvailableSlolts)

      const availableDate = findAvailableSlots.map(
        (item: any) => new Date(item.inicio)
      )
      setChipSlots(availableDate)
    }
  }

  useEffect(() => {
    if (selectedDay) {
      setTimeout(() => {
        handleFindAvailableSlotById(selectedDay)
      }, 500)
    }
  }, [selectedDay, selectedSlots])

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
      const filteredOptions = filterSlots(getSlots(day), [
        ...alreadySelected,
        ...chipSlots
      ])
      setAvailableSlots(filteredOptions)
    }

    fillSelectOptions(selectedDay)
  }, [selectedSlots, selectedDay, alreadySelected, chipSlots])

  const handleDayClick = (day: Date, { past }: DayModifiers) => {
    if (past) return
    setSelectedDay(day)
    setSelectedSlots([])
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

    setChipSlots([...chipSlots, date])
    setSelectedSlots([...selectedSlots, date])
  }

  const handleDelete = async (chip: any) => {
    const newSavedChip = savedChip.filter((item: any) => item !== chip)

    if (savedChip.filter((item: any) => item.id === chip.id)) {
      handleDeleteChip(chip.id)
      setSavedChip(newSavedChip)
    }
  }

  const handleClose = (time: Date) => {
    const newList = selectedSlots.filter((item) => item !== time)
    const newChipList = chipSlots.filter((item) => item !== time)
    setSelectedSlots(newList)
    setChipSlots(newChipList)
  }

  const handleSaveSlots = () => {
    handleSave(selectedSlots)
    setSelectedSlots([])
  }

  const goBack = async function () {
    await router.push('/dashboard-atendente')
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
                <SelectField
                  labelField=""
                  options={availableSlots.map((time) => {
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
              ) : (
                <div>Não existem mais horarios disponíveis nesse dia.</div>
              )}
              <div className="slots">
                {savedChip.map((chip: any, i: any) => (
                  <Chip
                    key={i}
                    text={new Date(chip.inicio).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                    isClosable
                    onClose={() => handleDelete(chip)}
                    backgroundColor={theme.colors.darkPastelGreen}
                    textColor={'white'}
                  />
                ))}
              </div>
              <div className="slots">
                {selectedSlots.map((time, i) => (
                  <Chip
                    key={i}
                    text={time.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                    isClosable
                    onClose={() => handleClose(time)}
                    backgroundColor={'white'}
                    textColor={'black'}
                  />
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
