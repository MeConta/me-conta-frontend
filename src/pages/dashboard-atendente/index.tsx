import { UserType } from 'enums/user-type.enum'
import { authenticatedRoute } from 'utils/authentication/authenticationRoute'
import * as S from '../../styles/pages/dashboards/styles'
import { Button } from 'components/atoms/Button'
import * as Styled from '../../styles/pages/dashboards/dashboard-aluno/styles'
import { useRouter } from 'next/router'
import { DivContainer } from 'styles/pages/dashboards/dashboard-atendente/styles'

function VolunteerDashboard() {
  const router = useRouter()

  const goToMeusHorarios = function () {
    router.push('/atendente/meus-horarios')
  }

  return (
    <S.WrapperDashboard>
      <Styled.SectionContainer></Styled.SectionContainer>
      <Styled.SectionContainer>
        <DivContainer>
          <Button
            color="secondary"
            radius="square"
            size="mediumLarge"
            onClick={goToMeusHorarios}
          >
            GERENCIAR HORÁRIOS
          </Button>
        </DivContainer>
      </Styled.SectionContainer>
    </S.WrapperDashboard>
  )
}

export default authenticatedRoute(VolunteerDashboard, {
  allowedRoles: [UserType.ATENDENTE]
})
