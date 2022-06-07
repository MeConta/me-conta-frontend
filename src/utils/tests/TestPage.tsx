import { UserType } from 'enums/user-type.enum'
import { authenticatedRoute } from '../authentication/authenticationRoute'

function TestPage() {
  return <p>Página Padrão</p>
}

export default authenticatedRoute(TestPage, {
  allowedRoles: [UserType.ALUNO]
})
