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
import { AvailableSlot } from 'domain/availableSlot'
import {
  DateTimeCarousel,
  DateTimeElement
} from 'components/molecules/DateTimeCarousel'
import { VolunteerService } from 'services/volunteers-service/volunteer-service'
import { Volunteer } from 'domain/volunteer'
import VolunteerStatusBanner from 'components/molecules/VolunteerStatusBanner'

function VolunteerDashboard() {
  const [slots, setSlots] = useState<AvailableSlot[] | null>(null)
  const [areAvailablesSlotsLoading, setAreAvailablesSlotsLoading] =
    useState<boolean>(true)
  const volunteerService = new VolunteerService(api)
  const [volunteer, setVolunteer] = useState<Volunteer | null>(null)

  const fetchAvailableSlots = async (id: number) => {
    try {
      if (id) {
        const fetchedSlots = await volunteerService.findAvailableSlotsById(id)

        const convertedSlots = fetchedSlots.map(
          (slot) => new AvailableSlot(slot)
        )

        setSlots(convertedSlots)
        setAreAvailablesSlotsLoading(false)
      }
    } catch (error) {
      setAreAvailablesSlotsLoading(false)
    }
  }

  const fetchVolunteer = async (id: number) => {
    if (id) {
      const fetchedVolunteer = await volunteerService.findById(id)
      setVolunteer(new Volunteer(fetchedVolunteer))
    }
  }

  useEffect(() => {
    const userData = getTokenData()

    if (userData) {
      fetchVolunteer(userData.id)
      fetchAvailableSlots(userData.id)
    }
  }, [])

  const goToMeusHorarios = function () {
    router.push('/atendente/meus-horarios')
  }

  function convertDateTime() {
    return slots ? slots.map((slot) => new DateTimeElement(slot.inicio)) : []
  }

  return (
    <S.WrapperDashboard>
      <Styled.SectionContainer>
        {volunteer && !volunteer?.aprovado && (
          <VolunteerStatusBanner approvalStatus={volunteer?.aprovado} />
        )}
      </Styled.SectionContainer>
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
          <DivContainer>
            <Banner>
              <S.NewUserCard>
                <S.NewUserCardContent>
                  <S.NewUserCardTitle>
                    Meus horários disponíveis
                  </S.NewUserCardTitle>
                  <S.NewUserCardText>
                    <p>
                      Seus horários estão <b>vazios</b>.
                    </p>{' '}
                    <br />
                    Adicione mais horários para continuar obtendo sessões.
                  </S.NewUserCardText>
                  <Button
                    color="secondary"
                    radius="square"
                    size="mediumLarge"
                    onClick={() => goToMeusHorarios()}
                  >
                    <span>INCLUIR HORÁRIOS</span>
                  </Button>
                </S.NewUserCardContent>
              </S.NewUserCard>
            </Banner>
          </DivContainer>
        )}
      </Styled.SectionContainer>
    </S.WrapperDashboard>
  )
}

export default authenticatedRoute(VolunteerDashboard, {
  allowedRoles: [UserType.ATENDENTE]
})
