import { UserType } from 'enums/user-type.enum'
import { authenticatedRoute } from 'utils/authentication/authenticationRoute'
import * as S from '../../styles/pages/dashboards/styles'
import { Button } from 'components/atoms/Button'
import Loader from 'components/atoms/Loader'
import * as Styled from '../../styles/pages/dashboards/dashboard-aluno/styles'
import { useEffect, useState } from 'react'
import Banner from 'components/atoms/Banner'
import { getTokenData } from '../../utils/authentication/getTokenData'
import router from 'next/router'
import { api } from 'services/api/api'
import {
  DivContainer,
  DivContainerCarousel
} from 'styles/pages/dashboards/dashboard-atendente/styles'
import { VolunteerService } from 'services/volunteers-service/volunteer-service'
import { AvailableSlot } from 'domain/availableSlot'
import {
  DateTimeCarousel,
  DateTimeElement
} from 'components/molecules/DateTimeCarousel'

function VolunteerDashboard() {
  const [slots, setSlots] = useState<AvailableSlot[] | null>(null)
  const [areAvailablesSlotsLoading, setAreAvailablesSlotsLoading] =
    useState<boolean>(true)

  const volunteerService = new VolunteerService(api)

  const fetchAvailableSlots = async () => {
    try {
      const userData = getTokenData()

      if (userData && userData.id) {
        const fetchedSlots = await volunteerService.findAvailableSlotsById(
          userData.id
        )

        const convertedSlots = fetchedSlots.map(
          (slot) => new AvailableSlot(slot)
        )

        setSlots(convertedSlots)
        setAreAvailablesSlotsLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAvailableSlots()
  }, [])

  const goToMeusHorarios = function () {
    router.push('/atendente/meus-horarios')
  }

  function convertDateTime() {
    return slots ? slots.map((slot) => new DateTimeElement(slot.inicio)) : []
  }

  return (
    <S.WrapperDashboard>
      <Styled.SectionContainer></Styled.SectionContainer>
      <Styled.SectionContainer>
        {areAvailablesSlotsLoading && (
          <S.SectionContainer>
            <Loader />
          </S.SectionContainer>
        )}

        {slots && slots?.length > 0 && !areAvailablesSlotsLoading && (
          <Styled.SectionContainer>
            <S.SecondLevelTitle>
              Meus horários disponíveis na semana
            </S.SecondLevelTitle>

            <DivContainerCarousel>
              {slots && <DateTimeCarousel schedules={convertDateTime()} />}
            </DivContainerCarousel>

            <DivContainer>
              <Button
                color="secondary"
                radius="square"
                size="mediumLarge"
                onClick={() => goToMeusHorarios()}
              >
                GERENCIAR HORÁRIOS
              </Button>
            </DivContainer>
          </Styled.SectionContainer>
        )}

        {slots?.length === 0 && !areAvailablesSlotsLoading && (
          <S.SecondLevelTitle>
            <Banner>
              <h1>Meus horários disponíveis</h1>
              <p>
                Seus horários estão vazios. Adicione mais horários para
                continuar obtendo sessões.
              </p>
              <button>INCLUIR MAIS HORÁRIOS</button>
            </Banner>
          </S.SecondLevelTitle>
        )}
      </Styled.SectionContainer>
    </S.WrapperDashboard>
  )
}

export default authenticatedRoute(VolunteerDashboard, {
  allowedRoles: [UserType.ATENDENTE]
})
