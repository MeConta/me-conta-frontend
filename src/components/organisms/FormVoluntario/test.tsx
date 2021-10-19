import { ISignupService } from 'services/signup-service/signup-service'
import { render, screen } from 'utils/tests/helpers'
import { FormVoluntario } from '.'
import { fireEvent } from '@testing-library/dom'

describe('<FormVoluntario/>', () => {
  const signupServiceMock: ISignupService = {
    initialSignup: jest.fn()
  }

  const getAllElements = () => {
    return {
      nomeCompleto: screen.getByText('Nome Completo'),
      email: screen.getByText('E-mail'),
      telefone: screen.getByText('Telefone'),
      dataNascimento: screen.getByLabelText('Data de nascimento'),
      cidade: screen.getByRole('textbox', {
        name: 'Cidade'
      }),
      estado: screen.getByText('Estado'),
      genero: screen.getByText('Gênero'),
      instituicaoEnsino: screen.getByText('Instituição de ensino'),
      superiorEmAndamento: screen.getByText('Superior em Andamento'),
      superiorCompleto: screen.getByText('Superior Completo'),
      tipoAtendente: screen.getByText('Atendente **'),
      tipoSupervisor: screen.getByText('Supervisor *'),
      semestre: screen.getByText('Semestre'),
      descricao: screen.getByText(
        'Breve descrição sobre você (Será utilizada em sua apresentação)'
      ),
      frentesAtuacao: screen.getByText(
        'Selecione em quais frentes você gostaria de atuar (pode selecionar mais de uma opção):'
      )
    }
  }

  beforeEach(() => {
    render(<FormVoluntario signupService={signupServiceMock} />)
  })

  it('deve renderizar o formulário de atendimento', () => {
    const {
      nomeCompleto,
      email,
      telefone,
      dataNascimento,
      cidade,
      estado,
      genero,
      instituicaoEnsino,
      superiorCompleto,
      superiorEmAndamento,
      tipoAtendente,
      tipoSupervisor,
      descricao
    } = getAllElements()
    expect(dataNascimento).toBeInTheDocument()
    expect(cidade).toBeInTheDocument()
    expect(superiorEmAndamento).toBeInTheDocument()
    expect(superiorCompleto).toBeInTheDocument()
    expect(tipoAtendente).toBeInTheDocument()
    expect(genero).toBeInTheDocument()
    expect(nomeCompleto).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(telefone).toBeInTheDocument()
    expect(estado).toBeInTheDocument()
    expect(instituicaoEnsino).toBeInTheDocument()
    expect(tipoSupervisor).toBeInTheDocument()
    expect(descricao).toBeInTheDocument()
  })

  describe('Atendentes em Geral', () => {
    it('deve renderizar o campo de descricao', () => {
      const { descricao } = getAllElements()
      expect(descricao).toBeInTheDocument()
    })

    it('deve renderizar os campos de seleção de frentes', () => {
      const { frentesAtuacao } = getAllElements()
      expect(frentesAtuacao).toBeInTheDocument()
    })
  })

  describe('Atendente com Superior em Andamento', () => {
    it('deve renderizar o campo de semestre', () => {
      const { semestre, superiorEmAndamento, tipoAtendente } = getAllElements()

      fireEvent.click(tipoAtendente)
      fireEvent.click(superiorEmAndamento)

      expect(semestre).toBeInTheDocument()
    })
  })

  describe('Atendente com Superior Completo', () => {
    beforeEach(() => {
      const { tipoAtendente, superiorCompleto } = getAllElements()
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
})
