import { UserType } from 'enums/user-type.enum'
import { authenticatedRoute } from '../../../utils/authentication/authenticationRoute'
import * as S from '../../../styles/pages/dashboards/styles'
import { TitleContainer } from '../../../styles/pages/dashboards/dashboard-administrador/perfil-voluntario/styles'
import { Button } from 'components/atoms/Button'
import router from 'next/router'
import { ArrowLeft } from 'styled-icons/bootstrap'

function PerfilVoluntario() {
  const goBack = function () {
    router.push('/dashboard-administrador')
  }

  return (
    <S.WrapperDashboard>
      <TitleContainer>
        <S.Title> Perfil - Voluntário </S.Title>
        <Button onClick={goBack} btnStyle="link" prefixIcon={<ArrowLeft />}>
          Voltar ao Dashboard
        </Button>
      </TitleContainer>
      <S.ContainerDashboard></S.ContainerDashboard>
    </S.WrapperDashboard>
  )
}
export default authenticatedRoute(PerfilVoluntario, {
  allowedRoles: [UserType.ADMINISTRADOR]
})
