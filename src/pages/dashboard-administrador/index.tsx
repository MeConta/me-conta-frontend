import { UserType } from 'enums/user-type.enum'
import { authenticatedRoute } from 'utils/authentication/authenticationRoute'
import * as S from '../../styles/pages/dashboards/styles'
import Filter from '../../components/molecules/Filter'

const attendantStatus = ['Em aberto', 'Aprovados', 'Reprovados', 'Todos']

function DashboardAdministrador() {
  return (
    <S.WrapperDashboard>
      <S.Title> Lista de Voluntários </S.Title>
      <Filter filterOptions={attendantStatus} handleClick={() => {}} />
    </S.WrapperDashboard>
  )
}

export default authenticatedRoute(DashboardAdministrador, {
  allowedRoles: [UserType.ADMINISTRADOR]
})
