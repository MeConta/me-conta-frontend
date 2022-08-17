import { AddDates } from 'components/molecules/AddDates'
import { UserType } from 'enums/user-type.enum'
import { authenticatedRoute } from 'utils/authentication/authenticationRoute'

function MeusHorarios() {
  return (
    <>
      <AddDates alreadySelected={[]} handleSave={() => {}} />
    </>
  )
}

export default authenticatedRoute(MeusHorarios, {
  allowedRoles: [UserType.ATENDENTE]
})
