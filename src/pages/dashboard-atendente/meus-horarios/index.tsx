import { AddDates } from 'components/molecules/AddDates'
import { UserType } from 'enums/user-type.enum'
import { AgendaService } from 'services/agenda-services/agenda-service'
import { api } from 'services/api/api'
import { authenticatedRoute } from 'utils/authentication/authenticationRoute'
import { ToastType, useToast } from 'services/toast-service/toast-service'

function MeusHorarios() {
  const agendaService = new AgendaService(api)
  const { emit } = useToast()

  const handleSaveNewSlots = async (slotsToSave: Date[]) => {
    try {
      await agendaService.createSlots(slotsToSave)
      showMessageFeedback('Horários salvos com sucesso!', ToastType.SUCCESS)
    } catch (error) {
      showMessageFeedback(
        'Erro ao salvar o horário. Por favor, tente novamente.',
        ToastType.ERROR
      )
    }
  }

  const handleDeleteChip = async (id: number) => {
    try {
      await agendaService.deleteSlot(id)
      showMessageFeedback('Horário excluído com sucesso!', ToastType.SUCCESS)
    } catch (error) {
      showMessageFeedback(
        'Erro ao excluir o horário. Por favor, tente novamente.',
        ToastType.ERROR
      )
    }
  }

  function showMessageFeedback(messageInput: string, messageType: ToastType) {
    emit({
      type: messageType,
      message: messageInput
    })
  }

  return (
    <>
      <AddDates
        alreadySelected={[]}
        handleSave={handleSaveNewSlots}
        handleDeleteChip={handleDeleteChip}
      />
    </>
  )
}

export default authenticatedRoute(MeusHorarios, {
  allowedRoles: [UserType.ATENDENTE]
})
