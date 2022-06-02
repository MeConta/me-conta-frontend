import userEvent from '@testing-library/user-event'
import React from 'react'
import { render, screen, waitFor } from 'utils/tests/helpers'
import { FormCadastro, TYPES } from '.'
import { fireEvent } from '@testing-library/dom'
import {
  getSignupError,
  ISignupService,
  SignupError
} from '../../../services/signup-service/signup-service'
import { UserType } from 'enums/user-type.enum'

jest.mock('store/auth-context', () => {
  const useAuthContext = () => {
    return {
      handleLogin: jest.fn()
    }
  }
  return { useAuthContext }
})

describe('<FormCadastro/>', () => {
  const signupServiceMock: ISignupService = {
    initialSignup: jest.fn()
  }
  const handleSuccessMock = jest.fn()
  const handleErrorMock = jest.fn()
  const setTipoDeUsuarioMock = jest.fn()
  const VALID_PASSWORD = '!@#A8SAD!@#AaASASD'

  const elements = () => {
    return {
      name: screen.getByRole('textbox', { name: 'Nome Completo' }),
      email: screen.getByRole('textbox', { name: 'E-mail' }),
      password: screen.getByRole('password', { name: 'Senha' }),
      confirm: screen.getByRole('password', { name: 'Confirmar Senha' }),
      studentOption: screen.getByLabelText(TYPES.ALUNO.label),
      volunteerOption: screen.getByLabelText(TYPES.ATENDENTE.label),
      buttonCadastrar: screen.getByRole('button', { name: 'Cadastrar' }),
      termsConfirm: screen.getByRole('checkbox')
    }
  }

  const fillForm = () => {
    const {
      name,
      email,
      password,
      confirm,
      studentOption,
      buttonCadastrar,
      termsConfirm
    } = elements()

    userEvent.type(name, 'Nome Completo')
    userEvent.type(email, 'teste@teste.com')
    userEvent.type(password, VALID_PASSWORD)
    userEvent.type(confirm, VALID_PASSWORD)
    fireEvent.click(studentOption)
    fireEvent.click(termsConfirm)
    fireEvent.click(buttonCadastrar)
  }

  beforeEach(() => {
    render(
      <FormCadastro
        signupService={signupServiceMock}
        handleSuccess={handleSuccessMock}
        handleError={handleErrorMock}
        setTipoDeUsuario={setTipoDeUsuarioMock}
      />
    )
  })

  beforeEach(async () => {
    jest.spyOn(signupServiceMock, 'initialSignup').mockResolvedValue({
      token: 'MOCKED_TOKEN',
      refreshToken: 'REFRESH_TOKEN'
    })
  })

  it('render the register form', async () => {
    const { name, email, password, confirm, studentOption, volunteerOption } =
      elements()

    expect(name).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(password).toBeInTheDocument()
    expect(confirm).toBeInTheDocument()
    expect(studentOption).toBeInTheDocument()
    expect(volunteerOption).toBeInTheDocument()
  })

  it('when inserting an empty name', async () => {
    const { buttonCadastrar } = elements()
    fireEvent.click(buttonCadastrar)
    await waitFor(() => {
      expect(screen.getByText(/Nome é obrigatório/)).toBeInTheDocument()
    })
  })
  it('when inserting an incomplete name', async () => {
    const { name, buttonCadastrar } = elements()
    userEvent.type(name, 'Nome')
    fireEvent.click(buttonCadastrar)
    await waitFor(() => {
      expect(
        screen.getByText(/Por favor, informe seu nome completo/)
      ).toBeInTheDocument()
    })
  })
  it('when inserting an invalid email', async () => {
    const { email, buttonCadastrar } = elements()
    userEvent.type(email, 'email')
    fireEvent.click(buttonCadastrar)

    await waitFor(() => {
      expect(screen.getByText(/E-mail inválido/)).toBeInTheDocument()
    })
  })
  it('when inserting a weak password', async () => {
    const { password, buttonCadastrar } = elements()
    userEvent.type(password, 'senha')
    fireEvent.click(buttonCadastrar)

    await waitFor(() => {
      expect(
        screen.getByText(/A senha deve atender aos requisitos mínimos/)
      ).toBeInTheDocument()
    })
  })
  it('when inserting 2 different passwords in the "password" and "repeat password" field', async () => {
    const { password, confirm, buttonCadastrar } = elements()

    userEvent.type(password, 'senha')
    userEvent.type(confirm, 'not-senha')
    fireEvent.click(buttonCadastrar)

    await waitFor(() => {
      expect(screen.getByText(/As senhas devem ser iguais/)).toBeInTheDocument()
    })
  })
  it('when filling correctly the form', async () => {
    await fillForm()

    await waitFor(() => {
      expect(signupServiceMock.initialSignup).toBeCalledWith({
        nome: 'Nome Completo',
        email: 'teste@teste.com',
        senha: VALID_PASSWORD,
        tipo: UserType.ALUNO
      })
      expect(handleSuccessMock).toBeCalled()
    })
  })
  it('when the call to the service return an error', async () => {
    jest
      .spyOn(signupServiceMock, 'initialSignup')
      .mockImplementation(() =>
        Promise.reject(getSignupError(SignupError.DUPLICATED))
      )

    await fillForm()

    await waitFor(() => {
      expect(handleErrorMock).toBeCalled()
    })
  })
})
