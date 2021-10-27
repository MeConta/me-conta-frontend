import userEvent from '@testing-library/user-event'
import React from 'react'
import { render, screen, waitFor } from 'utils/tests/helpers'
import { FormVoluntario } from '.'
import { fireEvent } from '@testing-library/dom'
import { ISignupVoluntarioService } from 'services/signup-voluntario-service/signup-voluntario-service'
import { act } from 'react-test-renderer'
import moment from 'moment'

describe('<FormVoluntario/>', () => {
  const handleSuccessMock = jest.fn()
  const handleErrorMock = jest.fn()

  const signupServiceMock: ISignupVoluntarioService = {
    voluntarioSignUp: jest.fn()
  }

  beforeEach(() => {
    render(<FormVoluntario signupVoluntarioService={signupServiceMock} />)
  })

  const Elements = () => {
    return {
      nomeCompleto: screen.getByText('Nome Completo'),
      email: screen.getByText('E-mail'),
      telefone: screen.getByLabelText('Telefone'),
      dataNascimento: screen.getByLabelText('Data de nascimento'),
      cidade: screen.getByRole('textbox', {
        name: 'Cidade'
      }),
      UF: screen.getByLabelText('Estado'),
      genero: screen.getByLabelText('Masculino'),
      instituicaoEnsino: screen.getByLabelText('Instituição de ensino'),
      superiorEmAndamento: screen.getByText('Superior em Andamento'),
      superiorCompleto: screen.getByText('Superior Completo'),
      tipoAtendente: screen.getByRole('radio', { name: /atendente \*\*/i }),
      tipoSupervisor: screen.getByText('Supervisor *'),
      semestre: screen.getByRole('spinbutton', { name: /semestre/i }),
      frentesAtuacao: screen.getByText('Sessões de acolhimento dos estudantes'),
      descricao: screen.getByRole('textbox', {
        name: /breve descrição sobre você \(será utilizada em sua apresentação\)/i
      }),
      button: screen.getByRole('button', { name: /cadastrar/i })
    }
  }

  const fillForm = async () => {
    const {
      telefone,
      dataNascimento,
      cidade,
      UF,
      genero,
      instituicaoEnsino,
      semestre,
      frentesAtuacao,
      descricao,
      superiorEmAndamento,
      superiorCompleto,
      tipoAtendente,
      button
    } = Elements()

    await act(async () => {
      fireEvent.change(telefone, { target: { value: '93934566543' } })
      fireEvent.change(dataNascimento, {
        target: { value: '1992-01-18' }
      })
      fireEvent.change(cidade, { target: { value: 'Araxá' } })
      fireEvent.change(UF, { target: { value: 'MG' } })
      fireEvent.click(genero)
      fireEvent.change(instituicaoEnsino, { target: { value: 'UFRJ' } })
      fireEvent.change(semestre, { target: { value: 1 } })
      fireEvent.click(frentesAtuacao)
      fireEvent.change(descricao, { target: { value: 'Teste' } })
    })
    return {
      telefone,
      dataNascimento,
      cidade,
      UF,
      genero,
      instituicaoEnsino,
      semestre,
      frentesAtuacao,
      descricao,
      superiorEmAndamento,
      superiorCompleto,
      tipoAtendente,
      button
    }
  }

  it('deve renderizar o formulário de atendimento', () => {
    const {
      nomeCompleto,
      email,
      telefone,
      dataNascimento,
      cidade,
      UF,
      genero,
      instituicaoEnsino,
      superiorCompleto,
      superiorEmAndamento,
      tipoAtendente,
      tipoSupervisor,
      descricao
    } = Elements()
    expect(dataNascimento).toBeInTheDocument()
    expect(cidade).toBeInTheDocument()
    expect(superiorEmAndamento).toBeInTheDocument()
    expect(superiorCompleto).toBeInTheDocument()
    expect(tipoAtendente).toBeInTheDocument()
    expect(genero).toBeInTheDocument()
    expect(nomeCompleto).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(telefone).toBeInTheDocument()
    expect(UF).toBeInTheDocument()
    expect(instituicaoEnsino).toBeInTheDocument()
    expect(tipoSupervisor).toBeInTheDocument()
    expect(descricao).toBeInTheDocument()
  })

  describe('Atendentes em Geral', () => {
    it('deve renderizar o campo de descricao', () => {
      const { descricao } = Elements()
      expect(descricao).toBeInTheDocument()
    })

    it('deve renderizar os campos de seleção de frentes', () => {
      const { frentesAtuacao } = Elements()
      expect(frentesAtuacao).toBeInTheDocument()
    })
  })

  describe('Atendente com Superior em Andamento', () => {
    it('deve renderizar o campo de semestre', () => {
      const { semestre, superiorEmAndamento, tipoAtendente } = Elements()

      fireEvent.click(tipoAtendente)
      fireEvent.click(superiorEmAndamento)

      expect(semestre).toBeInTheDocument()
    })
  })

  describe('Atendente com Superior Completo', () => {
    beforeEach(() => {
      const { tipoAtendente, superiorCompleto } = Elements()
      fireEvent.click(tipoAtendente)
      fireEvent.click(superiorCompleto)
    })

    it('deve renderizar o campo de CRP', () => {
      expect(screen.getByLabelText('CRP')).toBeInTheDocument()
    })

    it('deve renderizar o campo de Ano de Conclusão', () => {
      expect(screen.getByLabelText('Ano de conclusão')).toBeInTheDocument()
    })
  })

  describe('Tipo Supervisor', () => {
    beforeEach(() => {
      const { tipoSupervisor } = Elements()
      fireEvent.click(tipoSupervisor)
    })

    it('deve renderizar o campo de CRP', () => {
      expect(screen.getByLabelText('CRP')).toBeInTheDocument()
    })

    it('deve renderizar o campo Area de atuação', () => {
      expect(screen.getByLabelText('Área de Atuação')).toBeInTheDocument()
    })
  })

  describe('Deve enviar o formulario corretamente', () => {
    it('Deve verificar se os campos foram preenchidos', async () => {
      const {
        telefone,
        dataNascimento,
        cidade,
        UF,
        genero,
        instituicaoEnsino,
        tipoAtendente,
        button
      } = await fillForm()
      expect(telefone).toHaveValue('(93) 93456-6543')
      expect(dataNascimento).toHaveValue('1992-01-18')
      expect(cidade).toHaveValue('Araxá')
      expect(UF).toHaveValue('MG')
      expect(genero).toBeChecked()
      expect(instituicaoEnsino).toHaveValue('UFRJ')
      expect(tipoAtendente).toBeChecked()
      expect(button).toBeEnabled()
    })

    it('Deve enviar o formulario com sucesso', async () => {
      const { button } = await fillForm()

      await act(async () => {
        fireEvent.click(button)
      })

      await waitFor(async () => {
        expect(signupServiceMock.voluntarioSignUp).toBeCalledWith(
          {
            telefone: '93934566543',
            dataNascimento: '1992-01-18',
            cidade: 'Araxá',
            UF: 'MG',
            especializacoes: null,
            crp: '',
            genero: 'M',
            instituicao: 'UFRJ',
            frentes: [0],
            formado: false,
            anoFormacao: +moment().format('YYYY'),
            semestre: 1,
            areaAtuacao: null,
            bio: 'Teste',
            tipo: 2
          },
          expect.any(String)
        )
        // expect(handleSuccessMock).toBeCalled()
      })
    })
  })
})