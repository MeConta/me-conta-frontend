import userEvent from '@testing-library/user-event'
import { UserType } from 'enums/user-type.enum'
import {
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor,
  act
} from 'utils/tests/helpers'
import { FormLogin } from '.'
import router from '../../../../__mocks__/next/router'
import { IAuthService } from '../../../services/auth-services/auth-service'

jest.mock('store/auth-context', () => {
  const useAuthContext = () => {
    return {
      handleLogin: jest.fn(),
      session: {
        nome: 'John Doe'
      }
    }
  }
  return { useAuthContext }
})

const fillFormToSubmit = async () => {
  const email = screen.getByRole('textbox', { name: 'E-mail' })
  const password = screen.getByRole('password', { name: 'Senha' })
  const submit = screen.getByRole('button', { name: 'ENTRAR' })

  fireEvent.input(email, {
    target: {
      value: 'email@teste.com'
    }
  })

  fireEvent.input(password, {
    target: {
      value: 'S3nh@valid@'
    }
  })

  await waitFor(() => {
    expect(submit).not.toBeDisabled()
  })

  fireEvent.click(submit)
}

describe('<FormLogin/>', () => {
  let renderResult: RenderResult
  const authServiceMock: IAuthService = {
    logout: jest.fn(),
    login: jest.fn()
  }
  const handleErrorMock = jest.fn()

  beforeEach(() => {
    renderResult = act(() => {
      render(
        <FormLogin
          authService={authServiceMock}
          handleError={handleErrorMock}
        />
      )
    })
  })

  it('should render the login form fields', () => {
    expect(screen.getByRole('textbox', { name: 'E-mail' })).toBeInTheDocument()
    expect(screen.getByRole('password', { name: 'Senha' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
  })

  it('should show an error in the email field', async () => {
    const email = screen.getByRole('textbox', { name: 'E-mail' })

    userEvent.type(email, 'meuemailcom')

    await waitFor(() => {
      expect(screen.getByText(/E-mail inválido/)).toBeInTheDocument()
    })
  })

  it('should show an error in the password field', async () => {
    const password = screen.getByRole('password', { name: 'Senha' })

    fireEvent.input(password, {
      target: {
        value: 'testPassword'
      }
    })
    fireEvent.input(password, {
      target: {
        value: ''
      }
    })

    await waitFor(() => {
      expect(screen.getByText(/A senha é obrigatório/)).toBeInTheDocument()
    })
  })

  it('should call login service when filling the form', async () => {
    jest.spyOn(authServiceMock, 'login').mockImplementation(() => {
      return Promise.resolve({
        token: 'XPTO',
        tipo: UserType.ALUNO,
        nome: 'John',
        refreshToken: 'XPTO'
      })
    })

    await fillFormToSubmit()

    await waitFor(() => {
      expect(authServiceMock.login).toBeCalledTimes(1)
    })
  })

  it('should redirect to dashboard-aluno when the user is a student', async () => {
    jest.spyOn(authServiceMock, 'login').mockImplementation(() => {
      return Promise.resolve({
        token: 'XPTO',
        tipo: UserType.ALUNO,
        nome: 'John',
        refreshToken: 'XPTO'
      })
    })

    await fillFormToSubmit()

    await waitFor(() => {
      expect(router.push).toBeCalledWith('/dashboard-aluno')
    })
  })

  it('should redirect to dashboard-atendente when user is a volunteer', async () => {
    jest.spyOn(authServiceMock, 'login').mockImplementation(() => {
      return Promise.resolve({
        token: 'XPTO',
        tipo: UserType.ATENDENTE,
        nome: 'John',
        refreshToken: 'XPTO'
      })
    })

    await fillFormToSubmit()

    await waitFor(() => {
      expect(router.push).toBeCalledWith('/dashboard-atendente')
    })
  })

  it('should redirect to dashboard-supervisor when user is a supervisor', async () => {
    jest.spyOn(authServiceMock, 'login').mockImplementation(() => {
      return Promise.resolve({
        token: 'XPTO',
        tipo: UserType.SUPERVISOR,
        nome: 'John',
        refreshToken: 'XPTO'
      })
    })

    await fillFormToSubmit()

    await waitFor(() => {
      expect(router.push).toBeCalledWith('/dashboard-supervisor')
    })
  })

  it('deve submeter formulário e chamar callback de error', async () => {
    jest
      .spyOn(authServiceMock, 'login')
      .mockImplementation(() => Promise.reject())

    await fillFormToSubmit()

    await waitFor(() => {
      expect(authServiceMock.login).toBeCalled()
      expect(handleErrorMock).toBeCalled()
    })
  })
})
