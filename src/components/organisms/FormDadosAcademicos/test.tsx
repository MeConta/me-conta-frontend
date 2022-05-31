/* eslint-disable no-unused-vars */
import { render, act, screen, waitFor } from '../../../utils/tests/helpers'
import FormDadosAcademicos from '.'
import userEvent from '@testing-library/user-event'
import { fireEvent } from '@testing-library/dom'
import { PassosCadastro } from 'enums/passos-cadastro.enum'
import moment from 'moment'
import { ISignupVoluntarioService } from 'services/signup-voluntario-service/signup-voluntario-service'
import { ERRORS } from './validation'
import { UserType } from 'enums/user-type.enum'
import { DadosPessoaisValues } from 'types/dados-cadastro'
import ESituacaoCurso from './situacao-curso'
import { AreaAtuacao } from './area-atuacao.enum'
import { BackendError } from 'types/backend-error'
import { AuthServiceProps } from 'store/auth-context'

describe('<FormDadosAcademicos />', () => {
  const setCurrentStepMock = jest.fn()
  const handleErrorMock = jest.fn()
  const handleSuccessMock = jest.fn()
  const setPreviousValuesMock = jest.fn()
  const authContextMock: AuthServiceProps = {
    setCompleteProfile: jest.fn(),
    authService: { validarHash: jest.fn(), logout: jest.fn() },
    isLoggedIn: false,
    session: {
      name: '',
      type: '',
      token: '',
      refreshToken: '',
      completeProfile: false
    },
    handleLogin: jest.fn(),
    handleLogout: jest.fn()
  }

  const dadosPessoais: DadosPessoaisValues = {
    telefone: '1554845456',
    dataNascimento: '2022-10-10',
    UF: 'RS',
    cidade: 'Cidade',
    genero: 'M'
  }

  const signupServiceMock: ISignupVoluntarioService = {
    voluntarioSignUp: jest.fn()
  }

  const initialValues = {
    instituicao: '',
    anoFormacao: +moment().format('YYYY'),
    semestre: 1,
    nivelDeFormacao: '1',
    especializacoes: '',
    bio: '',
    crp: '',
    areaAtuacao: '',
    abordagem: '',
    frentes: []
  }

  const elements = () => {
    return {
      instituicao: screen.getByLabelText('Instituição de Ensino'),
      superiorEmAndamento: screen.getByRole('radio', {
        name: 'Superior em Andamento'
      }),
      superiorCompleto: screen.getByRole('radio', {
        name: 'Superior Completo'
      }),
      semestre: screen.getByRole('spinbutton', { name: /semestre/i }),

      frentesAtuacao: screen.getByText('Sessões de acolhimento dos estudantes'),
      descricao: screen.getByRole('textbox', {
        name: /breve descrição sobre você/i
      }),
      crp: screen.getByLabelText('CRP'),
      especializacoes: screen.getByLabelText(/Possui especialização\?/),
      areaAtuacao: screen.getByLabelText('Área de Atuação'),
      abordagem: screen.getByLabelText('Abordagem psicoterápica'),
      buttonFinalizarCadastro: screen.getByRole('button', {
        name: /Finalizar Cadastro/i
      }),
      buttonVoltar: screen.getByRole('button', { name: /Voltar/ })
    }
  }

  const fillForm = async (situacaoCurso: ESituacaoCurso) => {
    const {
      instituicao,
      semestre,
      frentesAtuacao,
      descricao,
      superiorEmAndamento,
      superiorCompleto,
      crp,
      areaAtuacao,
      especializacoes,
      abordagem
    } = elements()
    if (situacaoCurso === ESituacaoCurso.COMPLETO) {
      await act(async () =>
        userEvent.click(
          screen.getByRole('radio', { name: 'Superior Completo' })
        )
      )
    }

    await act(async () => {
      fireEvent.change(semestre, { target: { value: 8 } })
    })

    userEvent.type(instituicao, 'UFRJ')
    userEvent.type(descricao, 'Teste')

    if (situacaoCurso === ESituacaoCurso.COMPLETO) {
      await act(async () => {
        fireEvent.change(crp, { target: { value: '78987987' } })
        userEvent.type(especializacoes, 'terapia')
        userEvent.type(abordagem, 'abordagem')
        fireEvent.change(areaAtuacao, {
          target: { value: AreaAtuacao.PSICOLOGO }
        })
        fireEvent.change(
          screen.getByRole('spinbutton', {
            name: /Ano de Conclusão/i
          }),
          { target: { value: 2015 } }
        )
      })
    }

    userEvent.click(screen.getByRole('checkbox', { name: /acolhimento/ }))
    userEvent.click(screen.getByRole('checkbox', { name: /rotina/ }))

    return {
      instituicao,
      semestre,
      frentesAtuacao,
      descricao,
      superiorEmAndamento,
      superiorCompleto
    }
  }

  beforeEach(() => {
    render(
      <FormDadosAcademicos
        signupVoluntarioService={signupServiceMock}
        setCurrentStep={setCurrentStepMock}
        handleSuccess={handleSuccessMock}
        handleError={handleErrorMock}
        setPreviousValues={setPreviousValuesMock}
        previousValues={undefined}
        dadosPessoais={dadosPessoais}
        authContext={authContextMock}
      />
    )
  })

  it('deve renderizar FormDadosAcademicos, com a opção de Superior em Andamento selecionada por padrão', () => {
    const {
      instituicao,
      semestre,
      superiorCompleto,
      superiorEmAndamento,
      frentesAtuacao,
      descricao
    } = elements()

    expect(instituicao).toBeInTheDocument()
    expect(semestre).toBeInTheDocument()
    expect(superiorCompleto).toBeInTheDocument()
    expect(superiorEmAndamento).toBeChecked()
    expect(frentesAtuacao).toBeInTheDocument()
    expect(descricao).toBeInTheDocument()
  })

  it('deve exibir campos para nível de formação Superior Completo', () => {
    const { superiorCompleto, crp, especializacoes, areaAtuacao, abordagem } =
      elements()

    userEvent.click(superiorCompleto)
    expect(crp).toBeVisible()
    expect(especializacoes).toBeVisible()
    expect(areaAtuacao).toBeVisible()
    expect(abordagem).toBeVisible()
  })

  it('deve exibir erros ao tentar submeter campos obrigatórios vazios', async () => {
    const { buttonFinalizarCadastro, superiorCompleto } = elements()

    userEvent.click(superiorCompleto)

    const anoFormacao = screen.getByRole('spinbutton', {
      name: /Ano de Conclusão/i
    })

    userEvent.type(anoFormacao, '{selectall}{backspace}')

    await act(async () => {
      userEvent.click(buttonFinalizarCadastro)
    })

    expect(screen.getByText(ERRORS.REQUIRED_BIO))
    expect(screen.getByText(ERRORS.REQUIRED_CRP))
    expect(screen.getByText(ERRORS.REQUIRED_EDUCATION))
    expect(screen.getByText(ERRORS.REQUIRED_FIELD))
    expect(screen.getByText(ERRORS.REQUIRED_FRONTS))
    expect(screen.getByText(ERRORS.REQUIRED_GRADUATION_YEAR))
  })

  it('deve chamar o passo anterior do cadastro ao clicar no botão Voltar', async () => {
    const { buttonVoltar } = elements()

    await act(async () => {
      userEvent.click(buttonVoltar)
    })

    expect(setCurrentStepMock).toHaveBeenCalledWith(
      PassosCadastro.DADOS_PESSOAIS
    )
  })

  it('deve salvar informações já preenchidas, ao clicar no botão Voltar', async () => {
    const { buttonVoltar } = elements()
    await fillForm(ESituacaoCurso.ANDAMENTO)

    await act(async () => {
      userEvent.click(buttonVoltar)
    })

    expect(setPreviousValuesMock).toHaveBeenCalledWith({
      ...initialValues,
      instituicao: 'UFRJ',
      semestre: '8',
      frentes: [0, 1],
      bio: 'Teste'
    })
  })

  describe('deve submeter o formulário com os dados preenchidos', () => {
    it('atendente com curso superior em andamento', async () => {
      const { buttonFinalizarCadastro } = elements()

      await act(async () => {
        userEvent.click(buttonFinalizarCadastro)
      })

      await waitFor(async () => {
        expect(signupServiceMock.voluntarioSignUp).toHaveBeenCalledWith(
          {
            ...dadosPessoais,
            semestre: 8,
            instituicao: 'UFRJ',
            frentes: [0, 1],
            formado: false,
            bio: 'Teste',
            tipo: UserType.ATENDENTE
          },
          expect.any(String)
        )
        expect(handleSuccessMock).toBeCalled()
      })
    })

    it('atendente com curso superior completo', async () => {
      const { buttonFinalizarCadastro } = elements()

      await fillForm(ESituacaoCurso.COMPLETO)

      await act(async () => {
        userEvent.click(buttonFinalizarCadastro)
      })

      await waitFor(async () => {
        expect(signupServiceMock.voluntarioSignUp).toHaveBeenCalledWith(
          {
            ...dadosPessoais,
            especializacoes: 'terapia',
            crp: '78987987',
            instituicao: 'UFRJ',
            frentes: [0, 1],
            formado: true,
            anoFormacao: 2015,
            areaAtuacao: AreaAtuacao.PSICOLOGO,
            bio: 'Teste',
            tipo: UserType.ATENDENTE,
            abordagem: 'abordagem'
          },
          expect.any(String)
        )
        expect(handleSuccessMock).toBeCalled()
      })
    })

    it('deve chamar função que lida com um erro após falha na requisição', async () => {
      const error = {
        code: 0,
        message: 'MOCKED ERROR'
      } as BackendError

      jest.spyOn(signupServiceMock, 'voluntarioSignUp').mockRejectedValue(error)
      const { buttonFinalizarCadastro } = elements()

      await fillForm(ESituacaoCurso.COMPLETO)

      await act(async () => {
        fireEvent.click(buttonFinalizarCadastro)
      })

      await waitFor(async () => {
        expect(handleErrorMock).toBeCalledWith(error)
      })
    })

    it('deve setar flag de perfil completo, ao concluir o cadastro', async () => {
      const { buttonFinalizarCadastro } = elements()
      await fillForm(ESituacaoCurso.COMPLETO)

      await act(async () => {
        fireEvent.click(buttonFinalizarCadastro)
      })

      await waitFor(async () => {
        expect(authContextMock.setCompleteProfile).toHaveBeenCalledWith(true)
      })
    })
  })
})
