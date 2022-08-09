import { UserType } from 'enums/user-type.enum'
import { authenticatedRoute } from 'utils/authentication/authenticationRoute'
import * as S from '../../styles/pages/dashboards/styles'
import { Button } from 'components/atoms/Button'
import Loader from 'components/atoms/Loader'
import * as Styled from '../../styles/pages/dashboards/dashboard-aluno/styles'
import router from 'next/router'
import { useEffect, useState } from 'react'
import { DivContainer } from 'styles/pages/dashboards/dashboard-atendente/styles'
import Banner from 'components/atoms/Banner'

function VolunteerDashboard() {
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [areAvailablesSlotsLoading, setAreAvailablesSlotsLoading] =
    useState<boolean>(true)
  const goToMeusHorarios = function () {
    router.push('/atendente/meus-horarios')
  }

  const fetchAvailableSlots = async () => {
    //pra test enquanto não tem a implementação do serviço
    setAvailableSlots(['teste', 'Precisa mudar'])
    setAreAvailablesSlotsLoading(false)
  }

  useEffect(() => {
    fetchAvailableSlots()
  }, [])

  return (
    <S.WrapperDashboard>
      <Styled.SectionContainer></Styled.SectionContainer>
      <Styled.SectionContainer>
        {areAvailablesSlotsLoading && (
          <S.SectionContainer>
            <Loader />
          </S.SectionContainer>
        )}

        {availableSlots?.length > 0 && !areAvailablesSlotsLoading && (
          <Styled.SectionContainer>
            <S.SecondLevelTitle>
              Meus horários disponíveis na semana
            </S.SecondLevelTitle>
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

        {availableSlots?.length === 0 && !areAvailablesSlotsLoading && (
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
