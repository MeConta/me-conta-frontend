import userEvent from '@testing-library/user-event'
import theme from 'styles/theme'
import { render, screen } from '../../../utils/tests/helpers'

import VolunteerProfileModal from './'

const props = {
  isEnabled: true,
  title: 'Tem certeza que deseja aprovar o voluntário(a)?',
  body: 'Um e-mail informando o status será enviado ao voluntário',
  bodyIcon: true,
  confirmationButtonText: 'Sim, Aprovar',
  confirmationButtonColor: theme.colors.darkPastelGreen
}

const onCancelMock = jest.fn()

describe('<VolunteerProfileModal />', () => {
  beforeEach(() => {
    render(
      <VolunteerProfileModal
        isEnabled={props.isEnabled}
        title={props.title}
        body={props.body}
        bodyIcon={props.bodyIcon}
        confirmationButtonText={props.confirmationButtonText}
        confirmationButtonColor={props.confirmationButtonColor}
        onCancel={onCancelMock}
      />
    )
  })

  it('should render VolunteerProfileModal with a title, body and two buttons', () => {
    expect(screen.getByRole('modal')).toBeInTheDocument()
    expect(
      screen.getByText('Tem certeza que deseja aprovar o voluntário(a)?')
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Um e-mail informando o status será enviado ao voluntário'
      )
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Sim, Aprovar' })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancelar' })).toBeInTheDocument()
  })

  it('should close VolunteerProfileModal when the Cancelar button is clicked', () => {
    const cancelButton = screen.getByRole('button', { name: 'Cancelar' })
    userEvent.click(cancelButton)
    expect(onCancelMock).toHaveBeenCalled()
  })
})
