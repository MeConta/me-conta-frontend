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
import toggles from '../../utils/toggles/toggles'
import { Button } from 'components/atoms/Button'
import illustration from '../../assets/illustrations/me-conta-card-illustration.svg'
import Image from 'next/image'
import * as Styled from '../../styles/pages/dashboards/dashboard-aluno/styles'
import { useRouter } from 'next/router'

function VolunteerDashboard() {
  const { emit } = useToast()
  const router = useRouter()

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
        const validSlots = fetchAgendaSlots[0].slots.filter(
          (slot) => new Date(slot.inicio) > new Date()
        )
        setSlotsReserved(validSlots)
      }
    }

    setIsLoadingDates(false)
  }

  useEffect(() => {
    if (toggles.enableDashboardAtendente) fetchSlotsReserved()
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
        emit({ type: ToastType.SUCCESS, message: 'Slot eliminado com sucesso' })
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

  const goToLandingPage = function () {
    router.push('/')
  }

  return toggles.enableDashboardAtendente ? (
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
  ) : (
    <S.WrapperDashboard>
      <Styled.SectionContainer>
        <S.NewUserCard>
          <S.NewUserCardContent>
            <S.NewUserCardTitle>
              Bem vindo(a) ao <b>Me Conta</b>!
            </S.NewUserCardTitle>
            <S.NewUserCardText>
              Nossa equipe irá analisar seu perfil e entrará em{' '}
              <strong>contato por e-mail</strong> em breve.
            </S.NewUserCardText>
            <Button
              color="secondary"
              radius="square"
              size="mediumLarge"
              onClick={goToLandingPage}
            >
              VOLTAR À PÁGINA INICIAL
            </Button>
          </S.NewUserCardContent>
          <S.NewUserCardIllustration>
            <S.IllustrationBackground />
            <Image
              id="illustration"
              alt="Illustration"
              src={illustration}
              width={220}
            />
          </S.NewUserCardIllustration>
        </S.NewUserCard>
      </Styled.SectionContainer>
    </S.WrapperDashboard>
  )
}

export default authenticatedRoute(VolunteerDashboard, {
  allowedRoles: [UserType.ATENDENTE]
})
