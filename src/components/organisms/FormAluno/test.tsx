import { render, screen, waitFor } from 'utils/tests/helpers'
import FormAluno from './index'
import { fireEvent } from '@testing-library/dom'
import React from 'react'
import { ISignupAlunoService } from '../../../services/signup-aluno-service/signup-aluno-service'
import { act } from '@testing-library/react'
import { BackendError } from '../../../types/backend-error'

describe('<FormAluno />', () => {
  const handleSuccessMock = jest.fn()
  const handleErrorMock = jest.fn()
  const signupServiceMock: ISignupAlunoService = {
    alunoSignup: jest.fn()
  }

  const elements = () => {
    return {
      nome: screen.getByLabelText('Nome Completo'),
      email: screen.getByLabelText('E-mail'),
      telefone: screen.getByTestId('phone-number'),
      dataNascimento: screen.getByLabelText('Data de nascimento'),
      cidade: screen.getByLabelText('Cidade'),
      estado: screen.getByLabelText('Estado'),
      genero: screen.getByLabelText('Masculino'),
      escolaridade: screen.getByLabelText('Escolaridade'),
      tipoEscola: screen.getByLabelText('Escola Pública'),
      button: screen.getByRole('button')
    }
  }
  const fillForm = async () => {
    const {
      telefone,
      email,
      dataNascimento,
      cidade,
      estado,
      genero,
      escolaridade,
      tipoEscola,
      button
    } = elements()

    await act(async () => {
      fireEvent.change(telefone, { target: { value: '93934566543' } })
      fireEvent.change(dataNascimento, {
        target: { value: '1992-01-18' }
      })
      fireEvent.change(cidade, { target: { value: 'Araxá' } })
      fireEvent.change(estado, { target: { value: 'MG' } })
      fireEvent.click(genero)
      fireEvent.change(escolaridade, { target: { value: '1' } })
      fireEvent.click(tipoEscola)
    })
    return {
      telefone,
      dataNascimento,
      cidade,
      estado,
      email,
      genero,
      escolaridade,
      tipoEscola,
      button
    }
  }

  beforeEach(() => {
    render(
      <FormAluno
        alunoSignup={signupServiceMock}
        handleSuccess={handleSuccessMock}
        handleError={handleErrorMock}
      />
    )
  })

  beforeEach(async () => {
    jest.spyOn(signupServiceMock, 'alunoSignup').mockResolvedValue()
  })

  it('deve renderizar o formulário de aluno', () => {
    const {
      nome,
      email,
      telefone,
      dataNascimento,
      cidade,
      estado,
      genero,
      escolaridade,
      tipoEscola
    } = elements()

    expect(nome).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(telefone).toBeInTheDocument()
    expect(dataNascimento).toBeInTheDocument()
    expect(cidade).toBeInTheDocument()
    expect(estado).toBeInTheDocument()
    expect(genero).toBeInTheDocument()
    expect(escolaridade).toBeInTheDocument()
    expect(tipoEscola).toBeInTheDocument()
  })

  it('deve chamar o signup service com sucesso', async () => {
    const {
      telefone,
      dataNascimento,
      cidade,
      estado,
      genero,
      escolaridade,
      tipoEscola,
      button
    } = await fillForm()

    await act(async () => {
      fireEvent.click(button)
    })

    expect(telefone).toHaveValue('(93) 93456-6543')
    expect(dataNascimento).toHaveValue('1992-01-18')
    expect(cidade).toHaveValue('Araxá')
    expect(estado).toHaveValue('MG')
    expect(genero).toBeChecked()
    expect(escolaridade).toHaveValue('1')
    expect(tipoEscola).toBeChecked()
    expect(button).toBeEnabled()
    await waitFor(async () => {
      expect(signupServiceMock.alunoSignup).toBeCalledWith(
        {
          telefone: '93934566543',
          dataNascimento: '1992-01-18',
          cidade: 'Araxá',
          estado: 'MG',
          genero: 'M',
          escolaridade: 1,
          tipoEscola: 0
        },
        expect.any(String)
      )
      expect(handleSuccessMock).toBeCalled()
    })
  })

  it('deve falhar ao chamar o signup service', async () => {
    jest.spyOn(signupServiceMock, 'alunoSignup').mockRejectedValue({
      code: 0,
      message: 'MOCKED ERROR'
    } as BackendError)
    const { button } = await fillForm()

    await act(async () => {
      fireEvent.click(button)
    })

    await waitFor(async () => {
      expect(handleErrorMock).toBeCalled()
    })
  })
})
