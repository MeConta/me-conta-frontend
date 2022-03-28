import { UserType } from 'enums/user-type.enum'
import { authenticatedRoute } from 'utils/authentication/authenticationRoute'
import * as S from '../../styles/pages/dashboards/styles'

function DashboardAdministrador() {
  return <S.WrapperDashboard>Dashboard - Administrador</S.WrapperDashboard>
}

export default authenticatedRoute(DashboardAdministrador, {
  allowedRoles: [UserType.ADMINISTRADOR]
})
