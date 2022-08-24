import { AddDates } from 'components/molecules/AddDates'
import { UserType } from 'enums/user-type.enum'
import { AgendaService } from 'services/agenda-services/agenda-service'
import { api } from 'services/api/api'
import { authenticatedRoute } from 'utils/authentication/authenticationRoute'

function MeusHorarios() {
  const agendaService = new AgendaService(api)

  const handleSaveNewSlots = async (slotsToSave: Date[]) => {
    await agendaService.createSlots(slotsToSave)
  }

  return (
    <>
      <AddDates alreadySelected={[]} handleSave={handleSaveNewSlots} />
    </>
  )
}

export default authenticatedRoute(MeusHorarios, {
  allowedRoles: [UserType.ATENDENTE]
})
