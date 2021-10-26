import { render, screen } from 'utils/tests/helpers'

import { FormLogin } from '.'
import { IAuthService } from '../../../services/auth-services/auth-service'
import { fireEvent, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

const authServiceMock: IAuthService = {
  login: jest.fn()
}

describe('<FormLogin/>', () => {
  it('should render a login form ', async () => {
    const { container } = render(<FormLogin authService={authServiceMock} />)

    expect(screen.getByRole('textbox', { name: 'E-mail' })).toBeInTheDocument()
    expect(screen.getByRole('password', { name: 'Senha' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()

    expect(container.parentElement).toMatchSnapshot()
  })
  it('should call AuthService.login', async () => {
    const { container } = render(<FormLogin authService={authServiceMock} />)

    const email = screen.getByRole('textbox', { name: 'E-mail' })
    const password = screen.getByRole('password', { name: 'Senha' })
    const submit = screen.getByRole('button')

    await userEvent.type(email, 'email@teste.com')
    await userEvent.type(password, 'S3nh@valid@')
    await fireEvent.click(submit)

    await waitFor(() => {
      expect(authServiceMock.login).toBeCalled()
    })
  })
})
