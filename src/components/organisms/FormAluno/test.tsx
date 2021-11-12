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
      UF: screen.getByLabelText('Estado'),
      genero: screen.getByLabelText('Masculino'),
      escolaridade: screen.getByLabelText('Escolaridade'),
      tipoEscola: screen.getByLabelText('Escola Pública'),
      necessidades: screen.getByLabelText(
        'Quais são suas necessidades no momento?'
      ),
      expectativas: screen.getByLabelText(
        'O que você espera de nosso serviço?'
      ),
      tratamentos: screen.getByLabelText(
        'Você já fez algum tipo de tratamento psicológico?'
      ),
      button: screen.getByRole('button')
    }
  }
  const fillForm = async () => {
    const {
      telefone,
      email,
      dataNascimento,
      cidade,
      UF,
      genero,
      escolaridade,
      tipoEscola,
      necessidades,
      expectativas,
      tratamentos,
      button
    } = elements()

    await act(async () => {
      fireEvent.change(telefone, { target: { value: '93934566543' } })
      fireEvent.change(dataNascimento, {
        target: { value: '1992-01-18' }
      })
      fireEvent.change(cidade, { target: { value: 'Araxá' } })
      fireEvent.change(UF, { target: { value: 'MG' } })
      fireEvent.click(genero)
      fireEvent.change(escolaridade, { target: { value: '1' } })
      fireEvent.change(necessidades, {
        target: { value: 'Necessidades do aluno' }
      })
      fireEvent.change(expectativas, {
        target: { value: 'Expectativas do aluno' }
      })
      fireEvent.change(tratamentos, {
        target: { value: 'Tratamentos do aluno' }
      })
      fireEvent.click(tipoEscola)
    })
    return {
      telefone,
      dataNascimento,
      cidade,
      UF,
      email,
      genero,
      escolaridade,
      tipoEscola,
      necessidades,
      expectativas,
      tratamentos,
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
      UF,
      genero,
      escolaridade,
      tipoEscola,
      necessidades,
      expectativas,
      tratamentos
    } = elements()

    expect(nome).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(telefone).toBeInTheDocument()
    expect(dataNascimento).toBeInTheDocument()
    expect(cidade).toBeInTheDocument()
    expect(UF).toBeInTheDocument()
    expect(genero).toBeInTheDocument()
    expect(escolaridade).toBeInTheDocument()
    expect(tipoEscola).toBeInTheDocument()
    expect(necessidades).toBeInTheDocument()
    expect(expectativas).toBeInTheDocument()
    expect(tratamentos).toBeInTheDocument()
  })

  it('deve chamar o signup service com sucesso', async () => {
    const {
      telefone,
      dataNascimento,
      cidade,
      UF,
      genero,
      escolaridade,
      tipoEscola,
      necessidades,
      expectativas,
      tratamentos,
      button
    } = await fillForm()

    await act(async () => {
      fireEvent.click(button)
    })

    expect(telefone).toHaveValue('(93) 93456-6543')
    expect(dataNascimento).toHaveValue('1992-01-18')
    expect(cidade).toHaveValue('Araxá')
    expect(UF).toHaveValue('MG')
    expect(genero).toBeChecked()
    expect(escolaridade).toHaveValue('1')
    expect(tipoEscola).toBeChecked()
    expect(necessidades).toHaveValue('Necessidades do aluno')
    expect(expectativas).toHaveValue('Expectativas do aluno')
    expect(tratamentos).toHaveValue('Tratamentos do aluno')
    expect(button).toBeEnabled()
    await waitFor(async () => {
      expect(signupServiceMock.alunoSignup).toBeCalledWith(
        {
          telefone: '93934566543',
          dataNascimento: '1992-01-18',
          cidade: 'Araxá',
          UF: 'MG',
          genero: 'M',
          escolaridade: 1,
          tipoEscola: 0,
          necessidades: 'Necessidades do aluno',
          expectativas: 'Expectativas do aluno',
          tratamentos: 'Tratamentos do aluno'
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
