import userEvent from '@testing-library/user-event'
import { fireEvent, render, screen, waitFor, act } from 'utils/tests/helpers'
import { FormLogin } from '.'
import router from '../../../../__mocks__/next/router'
import { api } from '../../../services/api/api'

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

  expect(email).toBeInTheDocument()
  expect(password).toBeInTheDocument()
  expect(submit).toBeInTheDocument()

  userEvent.type(email, 'email@test.com')
  userEvent.type(password, 'P4ssw0rd')

  expect(email).toHaveValue('email@test.com')
  expect(password).toHaveValue('P4ssw0rd')

  await waitFor(() => {
    expect(submit).not.toBeDisabled()
  })

  fireEvent.click(submit)
}

describe('<FormLogin/>', () => {
  const handleErrorMock = jest.fn()

  beforeEach(() => {
    act(() => {
      render(<FormLogin handleError={handleErrorMock} />)
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('when click on entrar button without fields filled should show an error', async () => {
    const button = screen.getByRole('button', { name: 'ENTRAR' })

    userEvent.click(button)

    expect(await screen.findByText(/E-mail é obrigatório/)).toBeInTheDocument()
    expect(await screen.findByText(/A senha é obrigatório/)).toBeInTheDocument()
  })

  it('should show an error in the email field', async () => {
    const email = screen.getByRole('textbox', { name: 'E-mail' })

    userEvent.type(email, 'meuemailcom')

    expect(await screen.findByText(/E-mail inválido/)).toBeInTheDocument()
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

    expect(await screen.findByText(/A senha é obrigatório/)).toBeInTheDocument()
  })

  it('should call login service when filling the form', async () => {
    jest.spyOn(api, 'post').mockImplementation(() => {
      return Promise.resolve({
        data: {
          token: 'XPTO',
          tipo: '0',
          nome: 'John',
          refreshToken: 'XPTO',
          perfilCompleto: true
        }
      })
    })

    fillFormToSubmit()

    await waitFor(() => {
      expect(api.post).toBeCalledTimes(1)
    })
  })

  it('should redirect to dashboard-aluno when the user is a student who has finished registration', async () => {
    jest.spyOn(api, 'post').mockImplementation(() => {
      return Promise.resolve({
        data: {
          token: 'XPTO',
          tipo: '0',
          nome: 'John',
          refreshToken: 'XPTO',
          perfilCompleto: true
        }
      })
    })

    fillFormToSubmit()

    await waitFor(() => {
      expect(router.push).toBeCalledWith('/dashboard-aluno')
    })
  })

  it('should redirect to criar conta when the user has not finished registration', async () => {
    jest.spyOn(api, 'post').mockImplementation(() => {
      return Promise.resolve({
        data: {
          token: 'XPTO',
          tipo: '0',
          nome: 'John',
          refreshToken: 'XPTO',
          perfilCompleto: false
        }
      })
    })

    fillFormToSubmit()

    await waitFor(() => {
      expect(router.push).toBeCalledWith('/criar-conta')
    })
  })

  it('should redirect to dashboard-atendente when user is a volunteer who has finished registration', async () => {
    jest.spyOn(api, 'post').mockImplementation(() => {
      return Promise.resolve({
        data: {
          token: 'XPTO',
          tipo: '2',
          nome: 'John',
          refreshToken: 'XPTO',
          perfilCompleto: true
        }
      })
    })

    fillFormToSubmit()

    await waitFor(() => {
      expect(router.push).toBeCalledWith('/dashboard-atendente')
    })
  })

  it('should redirect to dashboard-supervisor when user is a supervisor', async () => {
    jest.spyOn(api, 'post').mockImplementation(() => {
      return Promise.resolve({
        data: {
          token: 'XPTO',
          tipo: '1',
          nome: 'John',
          refreshToken: 'XPTO',
          perfilCompleto: true
        }
      })
    })

    fillFormToSubmit()

    await waitFor(() => {
      expect(router.push).toBeCalledWith('/dashboard-supervisor')
    })
  })

  it('deve submeter formulário e chamar callback de error', async () => {
    jest.spyOn(api, 'post').mockImplementation(() => Promise.reject())

    fillFormToSubmit()

    await waitFor(() => {
      expect(api.post).toBeCalledTimes(1)
      expect(handleErrorMock).toBeCalled()
    })
  })
})
