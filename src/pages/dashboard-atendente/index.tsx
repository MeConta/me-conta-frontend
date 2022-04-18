import { UserType } from 'enums/user-type.enum'
import { authenticatedRoute } from 'utils/authentication/authenticationRoute'
import * as S from '../../styles/pages/dashboards/styles'
import { AvailableDates } from '../../components/molecules/AvaliableDates'
import { AddDates } from '../../components/molecules/AddDates'
import { useEffect, useState } from 'react'
import { ToastType, useToast } from 'services/toast-service/toast-service'
import {
  AgendaService,
  SlotResponseInterface
} from '../../services/agenda-services/agenda-service'
import { api } from '../../services/api/api'
import Loader from '../../components/atoms/Loader'
import { getTokenData } from '../../utils/authentication/getTokenData'

function VolunteerDashboard() {
  const { emit } = useToast()

  const [isLoadingDates, setIsLoadingDates] = useState<boolean>(true)
  const [slotsReserved, setSlotsReserved] = useState<SlotResponseInterface[]>(
    []
  )
  const [datesAlreadySelected, setDatesAlreadySelected] = useState<Date[]>([])

  const agendaService = new AgendaService(api)

  const fetchSlotsReserved = async () => {
    setIsLoadingDates(true)

    const userData = getTokenData()

    if (userData && userData.id) {
      const fetchAgendaSlots = await agendaService.listSlots(userData.id)

      if (fetchAgendaSlots && fetchAgendaSlots.length) {
        setSlotsReserved(fetchAgendaSlots[0].slots)
      }
    }

    setIsLoadingDates(false)
  }

  useEffect(() => {
    fetchSlotsReserved()
  }, [])

  useEffect(() => {
    const datesSelectedAux = slotsReserved.map((date) => {
      return new Date(date.inicio)
    })
    setDatesAlreadySelected(datesSelectedAux)
  }, [slotsReserved])

  const handleOnDelete = (id: number) => {
    setIsLoadingDates(true)

    agendaService
      .deleteSlot(id)
      .then(() => {
        const newDatesReserved: SlotResponseInterface[] = slotsReserved.filter(
          (date) => date.id !== id
        )
        setSlotsReserved(newDatesReserved)
        emit({ type: ToastType.INFO, message: 'Slot eliminado com sucesso' })
        setIsLoadingDates(false)
      })
      .catch(() => {
        setIsLoadingDates(false)
      })
  }

  const handleSaveNewSlots = async (slotsToSave: Date[]) => {
    await agendaService.createSlots(slotsToSave)

    await fetchSlotsReserved()
  }

  return (
    <S.WrapperDashboard>
      <S.SectionTitle>Meus horários cadastrados:</S.SectionTitle>
      {isLoadingDates ? (
        <Loader />
      ) : (
        <AvailableDates dates={slotsReserved} onDelete={handleOnDelete} />
      )}
      <S.SectionTitle>Agendamentos futuros</S.SectionTitle>
      <AddDates
        alreadySelected={datesAlreadySelected}
        handleSave={handleSaveNewSlots}
      />
    </S.WrapperDashboard>
  )
}

export default authenticatedRoute(VolunteerDashboard, {
  allowedRoles: [UserType.ATENDENTE]
})
