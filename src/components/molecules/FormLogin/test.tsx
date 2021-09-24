import { render, screen } from 'utils/tests/helpers'

import { FormLogin } from '.'
import { AuthService } from '../../../services/auth-services/auth-service'
import { fireEvent, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

describe('<FormLogin/>', () => {
  it('should render a login form ', async () => {
    const { container } = render(<FormLogin />)

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()

    expect(
      screen.getByRole('link', { name: /esqueceu a senha\?/i })
    ).toBeInTheDocument()

    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()

    expect(container.parentElement).toMatchSnapshot()
  })
  it('should call AuthService.login', async () => {
    const authServiceMock: AuthService = {
      login: jest.fn()
    }

    const { container } = render(<FormLogin authService={authServiceMock} />)

    const email = screen.getByRole('textbox', { name: 'E-mail' })
    const password = screen.getByRole('password', { name: 'Password' })
    const submit = screen.getByRole('button')

    await userEvent.type(email, 'email@teste.com')
    await userEvent.type(password, 'S3nh@valid@')
    await fireEvent.click(submit)

    await waitFor(() => {
      expect(authServiceMock.login).toBeCalled()
    })
  })
})
