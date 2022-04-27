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

  const elements = () => {
    return {
      name: screen.getByRole('textbox', { name: 'Nome' }),
      email: screen.getByRole('textbox', { name: 'E-mail' }),
      password: screen.getByRole('password', { name: 'Senha' }),
      confirm: screen.getByRole('password', { name: 'Confirmar Senha' }),
      studentOption: screen.getByLabelText(TYPES.ALUNO.label),
      volunteerOption: screen.getByLabelText(TYPES.ATENDENTE.label),
      button: screen.getByRole('button'),
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
      button,
      termsConfirm
    } = elements()

    userEvent.type(name, 'Nome')
    userEvent.type(email, 'teste@teste.com')
    userEvent.type(password, '!@#ASD!@#AASASD')
    userEvent.type(confirm, '!@#ASD!@#AASASD')
    fireEvent.click(studentOption)
    fireEvent.click(termsConfirm)
    fireEvent.click(button)
  }

  beforeEach(() => {
    render(
      <FormCadastro
        signupService={signupServiceMock}
        handleSuccess={handleSuccessMock}
        handleError={handleErrorMock}
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
    const { button } = elements()
    fireEvent.click(button)
    await waitFor(() => {
      expect(screen.getByText(/Nome é obrigatório/)).toBeInTheDocument()
    })
  })
  it('when inserting an invalid email', async () => {
    const { email, button } = elements()
    userEvent.type(email, 'email')
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText(/E-mail inválido/)).toBeInTheDocument()
    })
  })
  it('when inserting a weak password', async () => {
    const { password, button } = elements()
    userEvent.type(password, 'senha')
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText(/A senha deve ser forte/)).toBeInTheDocument()
    })
  })
  it('when inserting 2 different passwords in the "password" and "repeat password" field', async () => {
    const { password, confirm, button } = elements()

    userEvent.type(password, 'senha')
    userEvent.type(confirm, 'not-senha')
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText(/As senhas devem ser iguais/)).toBeInTheDocument()
    })
  })
  it('when filling correctly the form', async () => {
    await fillForm()

    await waitFor(() => {
      expect(signupServiceMock.initialSignup).toBeCalledWith({
        nome: 'Nome',
        email: 'teste@teste.com',
        senha: '!@#ASD!@#AASASD',
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
