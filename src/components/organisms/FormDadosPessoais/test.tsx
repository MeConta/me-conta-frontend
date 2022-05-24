import { render, screen } from 'utils/tests/helpers'
import { cleanup } from '@testing-library/react'
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
  const valoresIniciais = {
    telefone: '4645646456',
    dataNascimento: '2000-12-05',
    cidade: 'Recife',
    UF: 'PE',
    genero: 'NB'
  }

  const dadosPessoaisDefault = {
    telefone: '',
    genero: 'ND',
    UF: '',
    dataNascimento: '',
    cidade: ''
  }

  const elements = () => {
    return {
      telefone: screen.getByTestId('phone-number'),
      dataNascimento: screen.getByLabelText('Data de nascimento'),
      cidade: screen.getByLabelText('Cidade'),
      UF: screen.getByLabelText('Estado'),
      genero: screen.getByLabelText('Masculino'),
      generoNaoDeclarado: screen.getByLabelText(/Prefiro não Declarar/i),
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
        setDadosPessoais={mockSetDados}
        setNextStep={mockSetNextStep}
        valoresIniciais={dadosPessoaisDefault}
      />
    )
  })

  beforeEach(async () => {
    jest.spyOn(signupServiceMock, 'alunoSignup').mockResolvedValue()
  })

  it('deve renderizar o formulário de dados pessoais', () => {
    const { telefone, dataNascimento, cidade, UF, generoNaoDeclarado } =
      elements()

    expect(telefone).toBeInTheDocument()
    expect(dataNascimento).toBeInTheDocument()
    expect(cidade).toBeInTheDocument()
    expect(UF).toBeInTheDocument()
    expect(generoNaoDeclarado).toBeChecked()
  })

  it('deve renderizar o formulário de dados pessoais com os dados iniciais pré preenchidos', () => {
    cleanup()

    render(
      <FormDadosPessoais
        setDadosPessoais={mockSetDados}
        setNextStep={mockSetNextStep}
        valoresIniciais={valoresIniciais}
      />
    )
    const { telefone, dataNascimento, cidade, UF } = elements()
    const radioGeneroNaoBinario = screen.getByRole('radio', {
      name: /Não Binário/
    })

    expect(telefone).toHaveValue('(46) 4564-6456')
    expect(dataNascimento).toHaveValue(valoresIniciais.dataNascimento)
    expect(cidade).toHaveValue(valoresIniciais.cidade)
    expect(UF).toHaveValue(valoresIniciais.UF)
    expect(radioGeneroNaoBinario).toBeChecked()
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

  describe('número de telefone inválido', () => {
    it('deve exibir mensagem de erro para telefone celular inválido', async () => {
      const { buttonProximoPasso, telefone } = elements()
      userEvent.type(telefone, '110123456789')

      userEvent.click(buttonProximoPasso)

      expect(await screen.findByText(/Telefone inválido/)).toBeInTheDocument()
    })

    it('deve exibir mensagem de erro para telefone celular correto, com DDD inválido', async () => {
      const { buttonProximoPasso, telefone } = elements()
      userEvent.type(telefone, '02984562356')

      userEvent.click(buttonProximoPasso)

      expect(await screen.findByText(/Telefone inválido/)).toBeInTheDocument()
    })

    it('deve exibir mensagem de erro para telefone residencial com DDD inválido', async () => {
      const { buttonProximoPasso, telefone } = elements()
      userEvent.type(telefone, '0133122626')

      userEvent.click(buttonProximoPasso)

      expect(await screen.findByText(/Telefone inválido/)).toBeInTheDocument()
    })
  })

  it('deve armazenar os valores preenchidos, chamando setDadosPessoais', async () => {
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

  it('deve chamar o passo seguinte do cadastro ao clicar no botão próximo passo', async () => {
    const { buttonProximoPasso } = elements()
    await act(async () => {
      userEvent.click(buttonProximoPasso)
    })

    expect(mockSetNextStep).toHaveBeenCalledWith(
      PassosCadastro.DADOS_ACADEMICOS
    )
  })
})
