import { ISignupVoluntarioService } from 'services/signup-voluntario-service/signup-voluntario-service'
import { render, screen, waitFor } from 'utils/tests/helpers'
import { FormVoluntario } from '.'
import { act } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'

describe('<FormVoluntario/>', () => {
  const handleSuccessMock = jest.fn()
  const signupServiceMock: ISignupVoluntarioService = {
    voluntarioSignUp: jest.fn()
  }

  const Elements = () => {
    return {
      nomeCompleto: screen.getByText('Nome Completo'),
      email: screen.getByText('E-mail'),
      telefone: screen.getByLabelText('Telefone'),
      dataNascimento: screen.getByLabelText('Data de nascimento'),
      cidade: screen.getByRole('textbox', {
        name: 'Cidade'
      }),
      estado: screen.getByLabelText('Estado'),
      genero: screen.getByLabelText('Masculino'),
      instituicaoEnsino: screen.getByLabelText('Instituição de ensino'),
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
      ),
      button: screen.getByRole('button')
    }
  }

  const fillForm = async () => {
    const {
      telefone,
      dataNascimento,
      cidade,
      estado,
      genero,
      instituicaoEnsino,
      button
    } = Elements()

    await act(async () => {
      fireEvent.change(telefone, { target: { value: '93934566543' } })
      fireEvent.change(dataNascimento, {
        target: { value: '1992-01-18' }
      })
      fireEvent.change(cidade, { target: { value: 'Araxá' } })
      fireEvent.change(estado, { target: { value: 'MG' } })
      fireEvent.click(genero)
      fireEvent.change(instituicaoEnsino, { target: { value: 'UFRJ' } })
    })
    return {
      telefone,
      dataNascimento,
      cidade,
      estado,
      genero,
      instituicaoEnsino,
      button
    }
  }

  beforeEach(() => {
    render(<FormVoluntario signupVoluntarioService={signupServiceMock} />)
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
    expect(estado).toBeInTheDocument()
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
        estado,
        genero,
        instituicaoEnsino,
        button
      } = await fillForm()
      expect(telefone).toHaveValue('(93) 93456-6543')
      expect(dataNascimento).toHaveValue('1992-01-18')
      expect(cidade).toHaveValue('Araxá')
      expect(estado).toHaveValue('MG')
      expect(genero).toBeChecked()
      expect(instituicaoEnsino).toHaveValue('UFRJ')
      // expect(button).toBeEnabled()
    })

    // it('Deve enviar o formulario com sucesso', async () => {
    //   const { button } = await fillForm()

    //   await act(async () => {
    //     fireEvent.click(button)
    //   })

    //   await waitFor(async () => {
    //     expect(signupServiceMock.voluntarioSignUp).toBeCalledWith(
    //       {
    //         telefone: '93934566543',
    //         dataNascimento: '1992-01-18',
    //         cidade: 'Araxá',
    //         estado: 'MG',
    //         genero: 'M',
    //         instituicao: 'UFRJ',
    //         frentes: 1,
    //         formado: 0,
    //         anoFormacao: 2005,
    //         semestre: 2,
    //         especializacoes: 'teste',
    //         areaAtuacao: 'teste',
    //         crp: '1234567',
    //         bio: 'bio do test'
    //       },
    //       expect.any(String)
    //     )
    //     expect(handleSuccessMock).toBeCalled()
    //   })
    // })
  })
})
