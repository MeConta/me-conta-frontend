import { UserType } from 'enums/user-type.enum'
import { authenticatedRoute } from 'utils/authentication/authenticationRoute'
import * as S from '../../styles/pages/dashboards/styles'
import * as F from '../../styles/pages/dashboards/dashboard-administrador/styles'

function DashboardAdministrador() {
  return (
    <S.WrapperDashboard>
      <F.WrapperFilter>
        <F.ButtonFilter>Em aberto</F.ButtonFilter>
        <F.ButtonFilter>Aprovados</F.ButtonFilter>
        <F.ButtonFilter>Reprovados</F.ButtonFilter>
        <F.ButtonFilter>Todos</F.ButtonFilter>
      </F.WrapperFilter>
    </S.WrapperDashboard>
  )
}

export default authenticatedRoute(DashboardAdministrador, {
  allowedRoles: [UserType.ADMINISTRADOR]
})
