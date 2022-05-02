import { render, screen } from 'utils/tests/helpers'
import FormDadosPessoais from './index'
import { fireEvent } from '@testing-library/dom'
import React from 'react'
import { ISignupAlunoService } from '../../../services/signup-aluno-service/signup-aluno-service'
import { act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PassosCadastro } from 'enums/passos-cadastro.enum'

describe('<FormDadosPessoais />', () => {
  const mockSetDados = jest.fn()
  const mockSetNextStep = jest.fn()
  const signupServiceMock: ISignupAlunoService = {
    alunoSignup: jest.fn()
  }

  const elements = () => {
    return {
      telefone: screen.getByTestId('phone-number'),
      dataNascimento: screen.getByLabelText('Data de nascimento'),
      cidade: screen.getByLabelText('Cidade'),
      UF: screen.getByLabelText('Estado'),
      genero: screen.getByLabelText('Masculino'),
      buttonProximoPasso: screen.getByRole('button', {
        name: /próximo passo/i
      })
    }
  }
  const fillForm = async () => {
    const { telefone, dataNascimento, cidade, UF, genero } = elements()

    await act(async () => {
      fireEvent.change(telefone, { target: { value: '93934566543' } })
      fireEvent.change(dataNascimento, {
        target: { value: '1992-01-18' }
      })
      fireEvent.change(cidade, { target: { value: 'Araxá' } })
      fireEvent.change(UF, { target: { value: 'MG' } })
      fireEvent.click(genero)
    })
    return {
      telefone,
      dataNascimento,
      cidade,
      UF
    }
  }

  beforeEach(() => {
    render(
      <FormDadosPessoais
        setDadosRegistro={mockSetDados}
        setNextStep={mockSetNextStep}
      />
    )
  })

  beforeEach(async () => {
    jest.spyOn(signupServiceMock, 'alunoSignup').mockResolvedValue()
  })

  it('deve renderizar o formulário de dados pessoais', () => {
    const { telefone, dataNascimento, cidade, UF, genero } = elements()

    expect(screen.getByText(/dados pessoais/i)).toBeInTheDocument()
    expect(telefone).toBeInTheDocument()
    expect(dataNascimento).toBeInTheDocument()

    expect(cidade).toBeInTheDocument()
    expect(UF).toBeInTheDocument()
    expect(genero).toBeInTheDocument()
  })

  it('deve exibir mensagens de erro ao tentar submeter campos obrigatórios vazios', async () => {
    const { buttonProximoPasso } = elements()

    userEvent.click(buttonProximoPasso)

    expect(
      await screen.findByText(/Telefone é obrigatório/)
    ).toBeInTheDocument()
    expect(
      await screen.findByText(/Data de nascimento inválida/)
    ).toBeInTheDocument()
    expect(await screen.findByText(/Estado é obrigatório/)).toBeInTheDocument()
    expect(await screen.findByText(/Cidade é obrigatório/)).toBeInTheDocument()
  })

  it('deve chamar armazenar os valores dados preenchidos, chamando setDadosRegistro', async () => {
    const { buttonProximoPasso } = elements()
    const { telefone, dataNascimento, cidade, UF } = await fillForm()

    await act(async () => {
      fireEvent.click(buttonProximoPasso)
    })

    expect(telefone).toHaveValue('(93) 93456-6543')
    expect(dataNascimento).toHaveValue('1992-01-18')
    expect(cidade).toHaveValue('Araxá')
    expect(UF).toHaveValue('MG')

    expect(mockSetDados).toBeCalledWith({
      telefone: '93934566543',
      dataNascimento: '1992-01-18',
      cidade: 'Araxá',
      UF: 'MG',
      genero: 'M'
    })
  })

  it('deve chamar o passo seguinte ao clicar no botão próximo passo', () => {
    const { buttonProximoPasso } = elements()
    userEvent.click(buttonProximoPasso)

    expect(mockSetNextStep).toHaveBeenCalledWith(
      PassosCadastro.DADOS_ACADEMICOS
    )
  })
})
