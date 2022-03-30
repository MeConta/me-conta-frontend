import { UserType } from 'enums/user-type.enum'
import { authenticatedRoute } from 'utils/authentication/authenticationRoute'
import * as S from '../../styles/pages/dashboards/styles'

function DashboardAtendente() {
  return <S.WrapperDashboard>Dashboard - Atendente</S.WrapperDashboard>
}

export default authenticatedRoute(DashboardAtendente, {
  allowedRoles: [UserType.ATENDENTE]
})
