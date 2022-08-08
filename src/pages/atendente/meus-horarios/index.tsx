import { UserType } from 'enums/user-type.enum'
import { authenticatedRoute } from 'utils/authentication/authenticationRoute'

function MeusHorarios() {
  return <></>
}

export default authenticatedRoute(MeusHorarios, {
  allowedRoles: [UserType.ATENDENTE]
})
