import { UserType } from 'enums/user-type.enum'
import { authenticatedRoute } from '../../../utils/authentication/authenticationRoute'
import * as S from '../../../styles/pages/dashboards/styles'

function PerfilVoluntario() {
  return (
    <S.WrapperDashboard>
      <S.Title> Perfil - Voluntário </S.Title>
      <S.ContainerDashboard></S.ContainerDashboard>
    </S.WrapperDashboard>
  )
}
export default authenticatedRoute(PerfilVoluntario, {
  allowedRoles: [UserType.ADMINISTRADOR]
})
