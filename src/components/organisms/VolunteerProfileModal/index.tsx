import Modal from '../../molecules/Modal'

interface VolunteerProfileModalProps {
  isEnabled: boolean
  title: string
  body: string
  bodyIcon?: boolean
  confirmationButtonText: string
  confirmationButtonColor: string
  onCancel: VoidFunction
}

export default function VolunteerProfileModal({
  isEnabled,
  title,
  body,
  bodyIcon = false,
  confirmationButtonText,
  confirmationButtonColor,
  onCancel
}: VolunteerProfileModalProps) {
  return (
    <Modal isEnabled={isEnabled} funcCloseButton={onCancel}>
      <h1>{title}</h1>
      <p>{body}</p>
      <button title="Cancelar" onClick={() => onCancel()}>
        Cancelar
      </button>
      <button title={confirmationButtonText}>{confirmationButtonText}</button>
    </Modal>
  )
}
