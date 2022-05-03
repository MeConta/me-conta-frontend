import { render, screen, waitFor } from 'utils/tests/helpers'
import FormDadosEscolares from './index'
import { fireEvent } from '@testing-library/dom'
import React from 'react'
import { ISignupAlunoService } from '../../../services/signup-aluno-service/signup-aluno-service'
import { act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PassosCadastro } from 'enums/passos-cadastro.enum'
import { DadosPessoaisValues } from 'types/dados-cadastro'

describe('<FormDadosEscolares />', () => {
  const signupServiceMock: ISignupAlunoService = {
    alunoSignup: jest.fn()
  }
  const handleSuccessMock = jest.fn()
  const handleErrorMock = jest.fn()
  const setPreviousStepMock = jest.fn()
  const dadosPessoais: DadosPessoaisValues = {
    telefone: '1554845456',
    dataNascimento: '2022-10-10',
    UF: 'RS',
    cidade: 'Cidade',
    genero: 'M'
  }

  const elements = () => {
    return {
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
      buttonConcluirCadastro: screen.getByRole('button', {
        name: /concluir meu cadastro/i
      }),
      buttonVoltar: screen.getByRole('button', { name: /Voltar/ })
    }
  }
  const fillForm = async () => {
    const {
      escolaridade,
      tipoEscola,
      necessidades,
      expectativas,
      tratamentos
    } = elements()

    await act(async () => {
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
      escolaridade,
      necessidades,
      expectativas,
      tratamentos,
      tipoEscola
    }
  }

  beforeEach(() => {
    render(
      <FormDadosEscolares
        alunoSignup={signupServiceMock}
        handleError={handleErrorMock}
        handleSuccess={handleSuccessMock}
        dadosPessoais={dadosPessoais}
        setPreviousStep={setPreviousStepMock}
      />
    )
  })

  beforeEach(async () => {
    jest.spyOn(signupServiceMock, 'alunoSignup').mockResolvedValue()
  })

  it('deve renderizar o formulário de dados escolares', () => {
    const {
      escolaridade,
      necessidades,
      expectativas,
      tratamentos,
      tipoEscola
    } = elements()

    expect(screen.getByText(/dados escolares/i)).toBeInTheDocument()
    expect(escolaridade).toBeInTheDocument()
    expect(necessidades).toBeInTheDocument()

    expect(expectativas).toBeInTheDocument()
    expect(tratamentos).toBeInTheDocument()
    expect(tipoEscola).toBeInTheDocument()
  })

  it('deve exibir mensagens de erro ao tentar submeter campos obrigatórios vazios', async () => {
    const { buttonConcluirCadastro } = elements()

    userEvent.click(buttonConcluirCadastro)

    expect(
      await screen.findByText(/Escolaridade é obrigatória/)
    ).toBeInTheDocument()
  })

  it('deve realizar requisição passando os dados pessoais junto aos dados escolares', async () => {
    const { buttonConcluirCadastro } = elements()
    const {
      escolaridade,
      necessidades,
      expectativas,
      tratamentos,
      tipoEscola
    } = await fillForm()

    await act(async () => {
      fireEvent.click(buttonConcluirCadastro)
    })

    expect(escolaridade).toHaveValue('1')
    expect(tipoEscola).toBeChecked()
    expect(necessidades).toHaveValue('Necessidades do aluno')
    expect(expectativas).toHaveValue('Expectativas do aluno')
    expect(tratamentos).toHaveValue('Tratamentos do aluno')

    await waitFor(async () => {
      expect(signupServiceMock.alunoSignup).toBeCalledWith(
        {
          ...dadosPessoais,
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

  it('deve chamar o passo anterior do cadastro ao clicar no botão Voltar', () => {
    const { buttonVoltar } = elements()
    userEvent.click(buttonVoltar)

    expect(setPreviousStepMock).toHaveBeenCalledWith(
      PassosCadastro.DADOS_PESSOAIS
    )
  })
})
