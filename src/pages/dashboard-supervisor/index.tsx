import * as S from '../../styles/pages/dashboards/styles'
import { authenticatedRoute } from '../../utils/authentication/authenticationRoute'
import { UserType } from 'enums/user-type.enum'

function DashboardSupervisor() {
  return <S.WrapperDashboard>Dashboard - Supervisor</S.WrapperDashboard>
}

export default authenticatedRoute(DashboardSupervisor, {
  allowedRoles: [UserType.SUPERVISOR]
})
