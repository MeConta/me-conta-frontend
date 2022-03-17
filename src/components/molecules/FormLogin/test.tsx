import userEvent from '@testing-library/user-event'
import { UserType } from 'enums/user-type.enum'
import {
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor
} from 'utils/tests/helpers'
import { FormLogin } from '.'
import router from '../../../../__mocks__/next/router'
import { IAuthService } from '../../../services/auth-services/auth-service'

jest.mock('services/auth-services/auth-service', () => {
  const useAuthService = () => {
    return {
      storeSessionData: () => {},
      session: {
        nome: 'John Doe'
      }
    }
  }
  return { useAuthService }
})

const preencherFormularioParaSubmeter = async () => {
  const email = screen.getByRole('textbox', { name: 'E-mail' })
  const password = screen.getByRole('password', { name: 'Senha' })
  const submit = screen.getByRole('button')

  await userEvent.type(email, 'email@teste.com')
  await userEvent.type(password, 'S3nh@valid@')
  await fireEvent.click(submit)
}

describe('<FormLogin/>', () => {
  let renderResult: RenderResult
  const authServiceMock: IAuthService = {
    login: jest.fn()
  }
  const handleErrorMock = jest.fn()

  beforeEach(() => {
    renderResult = render(
      <FormLogin authService={authServiceMock} handleError={handleErrorMock} />
    )
  })

  it('deve renderizar todos os elementos do formulário', () => {
    expect(screen.getByRole('textbox', { name: 'E-mail' })).toBeInTheDocument()
    expect(screen.getByRole('password', { name: 'Senha' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()

    expect(renderResult.container.parentElement).toMatchSnapshot()
  })

  it('deve exibir error de email inválido', async () => {
    const email = screen.getByRole('textbox', { name: 'E-mail' })
    const submit = screen.getByRole('button')

    await userEvent.type(email, 'meuemailcom')
    await fireEvent.click(submit)

    await waitFor(() => {
      expect(screen.getByText(/E-mail inválido/)).toBeInTheDocument()
    })
  })

  it('deve chamar o serviço de login', async () => {
    await preencherFormularioParaSubmeter()

    jest.spyOn(authServiceMock, 'login').mockImplementation(() => {
      return Promise.resolve({
        token: 'XPTO',
        tipo: UserType.ALUNO,
        nome: 'John'
      })
    })

    await waitFor(() => {
      expect(authServiceMock.login).toBeCalled()
    })
  })

  it('deve redirecionar para dashboard de aluno', async () => {
    await preencherFormularioParaSubmeter()

    jest
      .spyOn(authServiceMock, 'login')
      .mockImplementation(() =>
        Promise.resolve({ token: 'XPTO', tipo: UserType.ALUNO, nome: 'John' })
      )

    await waitFor(() => {
      expect(router.push).toBeCalledWith('/dashboard')
    })
  })

  it('deve redirecionar para dashboard de atendente', async () => {
    await preencherFormularioParaSubmeter()

    jest.spyOn(authServiceMock, 'login').mockImplementation(() =>
      Promise.resolve({
        token: 'XPTO',
        tipo: UserType.ATENDENTE,
        nome: 'John'
      })
    )

    await waitFor(() => {
      expect(router.push).toBeCalledWith('/dashboard-atendente')
    })
  })

  it('deve redirecionar para dashboard de supervisor', async () => {
    await preencherFormularioParaSubmeter()

    jest.spyOn(authServiceMock, 'login').mockImplementation(() =>
      Promise.resolve({
        token: 'XPTO',
        tipo: UserType.SUPERVISOR,
        nome: 'John'
      })
    )

    await waitFor(() => {
      expect(router.push).toBeCalledWith('/dashboard-supervisor')
    })
  })

  it('deve submeter formulário e chamar callback de error', async () => {
    await preencherFormularioParaSubmeter()

    jest
      .spyOn(authServiceMock, 'login')
      .mockImplementation(() => Promise.reject())

    await waitFor(() => {
      expect(authServiceMock.login).toBeCalled()
      expect(handleErrorMock).toBeCalled()
    })
  })
})
