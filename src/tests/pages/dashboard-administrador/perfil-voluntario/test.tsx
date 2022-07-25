import { UserType } from 'enums/user-type.enum'
import PerfilVoluntario from 'pages/dashboard-administrador/perfil-voluntario/[id]'
import React from 'react'
import createAuthContextObject from 'utils/tests/createAuthContextObject'
import { act, screen, waitFor, render } from 'utils/tests/helpers'
import * as AuthorizationContext from '../../../../store/auth-context'
import userEvent from '@testing-library/user-event'
import router from 'next/router'
import theme from 'styles/theme'
import { api } from 'services/api/api'
import { NivelFormacao } from '../../../../domain/nivel-formacao'
import { VolunteerService } from 'services/volunteers-service/volunteer-service'
import { useToast } from 'services/toast-service/toast-service'

const approveVolunteerMock = jest
  .spyOn(VolunteerService.prototype, 'approve')
  .mockImplementation(jest.fn(() => Promise.resolve()))

const rejectVolunteerMock = jest
  .spyOn(VolunteerService.prototype, 'reject')
  .mockImplementation(jest.fn(() => Promise.resolve()))

jest.mock('next/router', () => ({
  useRouter: () => ({ push: jest.fn() }),
  push: jest.fn(),
  query: {
    id: '123'
  }
}))

const spyOnBeforeUnload = jest.fn()
window.addEventListener = spyOnBeforeUnload

const volunteer = {
  anoFormacao: 2020,
  aprovado: null,
  areaAtuacao: 'professor',
  bio: 'string',
  crp: 'string',
  especializacoes: 'string',
  formado: true,
  frentes: [1],
  instituicao: 'string',
  semestre: 0,
  usuario: {
    tipo: '1',
    id: 0,
    dataTermos: '2022-06-30T18:37:03.964Z',
    email: 'teste@teste.com',
    nome: 'string'
  },
  abordagem: 'string',
  genero: '',
  cidade: 'Guarujá',
  UF: 'São Paulo',
  telefone: '34999999999',
  link: ''
}

const genderMap = [
  ['M', 'Masculino'],
  ['F', 'Feminino'],
  ['NB', 'Não Binário'],
  ['ND', 'Não Declarado']
]

const educationLevelMap = [
  [
    NivelFormacao.SUPERIOR_COMPLETO.value,
    NivelFormacao.SUPERIOR_COMPLETO.label
  ],
  [
    NivelFormacao.SUPERIOR_EM_ANDAMENTO.value,
    NivelFormacao.SUPERIOR_EM_ANDAMENTO.label
  ]
]

const SESSION_LINK = 'https://teste.com.br'

async function applyTestSetup(
  volunteerParameter: any = volunteer,
  shouldAwait: boolean = true
) {
  jest.clearAllMocks()

  jest
    .spyOn(AuthorizationContext, 'useAuthContext')
    .mockReturnValue(
      createAuthContextObject(true, UserType.ADMINISTRADOR.toString(), true)
    )

  jest.spyOn(api, 'get').mockResolvedValue({ data: volunteerParameter })
  jest.spyOn(api, 'patch').mockResolvedValue({})

  let container = null

  if (shouldAwait) {
    await act(async () => {
      container = render(<PerfilVoluntario />).container
    })
  } else {
    container = render(<PerfilVoluntario />).container
  }

  return container
}

describe('Perfil Voluntário', () => {
  it('should render title Perfil Voluntário', async () => {
    await applyTestSetup()
    expect(screen.getByText(/Perfil - Voluntário/)).toBeInTheDocument()
  })

  it('should render button link to return to admin Dashboard', async () => {
    await applyTestSetup()
    expect(
      screen.getByRole('button', { name: /Voltar ao Dashboard/ })
    ).toBeInTheDocument()
  })

  describe('Voltar ao dashboard', () => {
    it('should redirect to dashboard admin when click in Voltar ao Dashboard without changes in link session field', async () => {
      await applyTestSetup()
      userEvent.click(
        screen.getByRole('button', { name: /Voltar ao Dashboard/ })
      )

      expect(router.push).toHaveBeenCalledWith('/dashboard-administrador')
    })
  })

  describe('Link das Sessões', () => {
    it('should render input title for Link das Sessões', async () => {
      await applyTestSetup()
      const inputElement = screen.getByRole('textbox', {
        name: /Link das Sessões/
      })
      expect(inputElement).toBeInTheDocument()
    })

    it('should render placeholder text for Link das Sessões', async () => {
      await applyTestSetup()
      const inputElement = screen.getByPlaceholderText(
        /Insira aqui o link para as sessões/
      )
      expect(inputElement).toBeInTheDocument()
    })

    it('should render save link button if Volunteer is approved', async () => {
      await applyTestSetup({ ...volunteer, aprovado: true })
      expect(
        screen.getByRole('button', { name: /Salvar Link/i })
      ).toBeInTheDocument()
    })

    it('should not render save link button if Volunteer is not approved', async () => {
      await applyTestSetup({ ...volunteer, aprovado: false })
      expect(
        screen.queryByRole('button', { name: /Salvar Link/i })
      ).not.toBeInTheDocument()
    })

    it('should render disable button', async () => {
      await applyTestSetup({ ...volunteer, aprovado: true })
      expect(
        screen.getByRole('button', { name: /Salvar Link/i })
      ).toBeDisabled()
    })

    it('should render enable button when field value link changed', async () => {
      await applyTestSetup({ ...volunteer, aprovado: true })
      const sessionLinkInput = screen.getByRole('textbox')
      userEvent.type(sessionLinkInput, SESSION_LINK)

      expect(screen.getByRole('button', { name: /Salvar Link/i })).toBeEnabled()
    })

    it('should render toast with successful message when new session link is saved', async () => {
      await applyTestSetup({ ...volunteer, aprovado: true })
      const saveLink = screen.getByRole('button', { name: /Salvar Link/i })
      const sessionLinkInput = screen.getByRole('textbox')

      userEvent.type(sessionLinkInput, SESSION_LINK)
      userEvent.click(saveLink)
      expect(saveLink).toBeDisabled()

      await waitFor(() => {
        expect(useToast().emit).toHaveBeenCalledWith({
          type: 'success',
          message: 'Link das Sessões salvo com sucesso'
        })
      })
    })

    it('should trigger onbeforeunload event when session link is changed', async () => {
      await applyTestSetup()
      const sessionLinkInput = screen.getByRole('textbox')

      userEvent.type(sessionLinkInput, SESSION_LINK)

      expect(spyOnBeforeUnload).toHaveBeenCalledWith(
        'beforeunload',
        expect.anything()
      )
    })
  })

  describe('Dados Pessoais', () => {
    it('should render personal volunteer info', async () => {
      const container = await applyTestSetup()
      expect(screen.getByText(/Dados Pessoais:/)).toBeInTheDocument()
      expect(container).toHaveTextContent(`Nome: ${volunteer.usuario.nome}`)
      expect(container).toHaveTextContent(`Cidade: ${volunteer.cidade}`)
      expect(container).toHaveTextContent(`E-mail: ${volunteer.usuario.email}`)
    })

    it('should render formatted phone number', async () => {
      const container = await applyTestSetup({
        ...volunteer,
        telefone: '34123456789'
      })

      expect(container).toHaveTextContent(`Telefone: (34) 12345-6789`)
    })

    it('should render unabbreviated state name', async () => {
      const container = await applyTestSetup({
        ...volunteer,
        UF: 'MA'
      })

      expect(container).toHaveTextContent(`Estado: Maranhão`)
    })

    it.each(genderMap)(
      'given gender %p should render label %p',
      async (genderType, genderLabel) => {
        const container = await applyTestSetup({
          ...volunteer,
          genero: genderType
        })

        expect(container).toHaveTextContent(`Gênero: ${genderLabel}`)
      }
    )
  })

  describe('Dados Acadêmicos', () => {
    it('should render academic volunteer info', async () => {
      const container = await applyTestSetup()
      expect(screen.getByText(/Dados Acadêmicos:/)).toBeInTheDocument()
      expect(container).toHaveTextContent(
        `Instituição de Ensino: ${volunteer.instituicao}`
      )
      expect(container).toHaveTextContent(
        `Breve descrição sobre você: ${volunteer.bio}`
      )
    })

    it.each(educationLevelMap)(
      'given education level %p should render label %p',
      async (educationLevel, educationLabel) => {
        const container = await applyTestSetup({
          ...volunteer,
          formado: educationLevel
        })

        expect(container).toHaveTextContent(
          `Nível de Formação: ${educationLabel}`
        )
      }
    )

    it('given volunteer has graduated should render graduation year', async () => {
      const anoFormacao = 2017
      const container = await applyTestSetup({
        ...volunteer,
        formado: true,
        anoFormacao: anoFormacao
      })

      expect(container).toHaveTextContent(`Ano de conclusão: ${anoFormacao}`)

      expect(container).not.toHaveTextContent(`Semestre: ${volunteer.semestre}`)
    })

    it('given volunteer has not graduated yet should render voluteer college semester', async () => {
      const semestre = 2
      const container = await applyTestSetup({
        ...volunteer,
        formado: false,
        semestre: semestre
      })

      expect(container).toHaveTextContent(`Semestre: ${semestre}`)

      expect(container).not.toHaveTextContent(
        `Ano de conclusão: ${volunteer.anoFormacao}`
      )
    })

    it("should render the voluteer's services (Acolhimento, Orientação Vocacional, Coaching de Estudos)", async () => {
      const container = await applyTestSetup({
        ...volunteer,
        frentes: [0, 1, 2]
      })

      expect(container).toHaveTextContent('Áreas que gostaria de atuar:')
      expect(screen.getByText(/Acolhimento/i)).toBeInTheDocument()
      expect(screen.getByText(/Orientação Vocacional/i)).toBeInTheDocument()
      expect(screen.getByText(/Coaching de Estudos/i)).toBeInTheDocument()
    })
  })

  describe('Aprovar and Reprovar buttons', () => {
    it('should render Aprovar button', async () => {
      await applyTestSetup()
      const aprovarButton = screen.getByRole('button', { name: /APROVAR/ })
      expect(aprovarButton).toBeInTheDocument()
      expect(aprovarButton).toHaveStyle(
        `background-color: ${theme.colors.darkPastelGreen}`
      )
    })

    it('should render Reprovar button', async () => {
      await applyTestSetup()
      const reprovarButton = screen.getByRole('button', { name: /REPROVAR/ })
      expect(reprovarButton).toBeInTheDocument()
    })

    it('should render error message when I click in "Aprovar" and the link input is empty', async () => {
      await applyTestSetup()

      const aprovarButton = screen.getByRole('button', { name: /APROVAR/ })

      userEvent.click(aprovarButton)
      expect(screen.getByText(/Campo obrigatório/)).toBeInTheDocument()
    })

    it('should NOT render error message when I click in "Aprovar" and the link input is filled', async () => {
      await applyTestSetup()

      const aprovarButton = screen.getByRole('button', { name: /APROVAR/ })
      const sessionLinkInput = screen.getByRole('textbox')

      userEvent.type(sessionLinkInput, 'https://teste.com.br')
      userEvent.click(aprovarButton)

      expect(screen.queryByText(/Campo obrigatório/)).not.toBeInTheDocument()
    })

    it('should show modal when link session is filled and user clicks in "Aprovar" button', async () => {
      await applyTestSetup()

      const aprovarButton = screen.getByRole('button', { name: /APROVAR/ })
      const sessionLinkInput = screen.getByRole('textbox')

      userEvent.type(sessionLinkInput, 'https://teste.com.br')

      userEvent.click(aprovarButton)

      expect(screen.getByRole('modal')).toBeInTheDocument()
    })

    it('should render error message when I click in "Sim, Aprovar" and the link input is invalid', async () => {
      await applyTestSetup()
      approveVolunteerMock.mockImplementationOnce(
        jest.fn(() =>
          Promise.reject({
            response: {
              data: {
                statusCode: 400,
                message: ['Link inválido'],
                error: 'Bad Request'
              }
            }
          })
        )
      )

      const sessionLinkInput = screen.getByRole('textbox')

      userEvent.type(sessionLinkInput, 'linkinvalido')
      userEvent.click(screen.getByRole('button', { name: /APROVAR/ }))
      const aprovarButton = screen.getByRole('button', { name: /Sim, Aprovar/ })

      userEvent.click(aprovarButton)
      expect(await screen.findByText(/Link inválido/)).toBeInTheDocument()
    })

    it('should call approve volunteer service when I click in "Sim, Aprovar" in the Modal, and the link input is filled', async () => {
      const VOLUNTEER_ID = 123
      await applyTestSetup({
        ...volunteer,
        usuario: { ...volunteer?.usuario, id: VOLUNTEER_ID }
      })

      const sessionLinkInput = screen.getByRole('textbox')

      userEvent.type(sessionLinkInput, SESSION_LINK)

      userEvent.click(screen.getByRole('button', { name: /APROVAR/ }))

      const aprovarButton = screen.getByRole('button', { name: /Sim, Aprovar/ })
      userEvent.click(aprovarButton)

      expect(approveVolunteerMock).toHaveBeenCalledWith(
        VOLUNTEER_ID,
        SESSION_LINK
      )
    })

    it('should redirect to dashboard admin when sucessfully approve volunteer', async () => {
      await applyTestSetup()
      const aprovarButton = screen.getByRole('button', { name: /APROVAR/ })
      const sessionLinkInput = screen.getByRole('textbox')

      userEvent.type(sessionLinkInput, SESSION_LINK)
      userEvent.click(aprovarButton)
      userEvent.click(screen.getByRole('button', { name: /Sim, Aprovar/ }))

      expect(await router.push).toHaveBeenCalledWith('/dashboard-administrador')
    })

    it('should render toast with successful message when approve volunteer', async () => {
      await applyTestSetup()
      const aprovarButton = screen.getByRole('button', { name: /APROVAR/ })
      const sessionLinkInput = screen.getByRole('textbox')

      userEvent.type(sessionLinkInput, SESSION_LINK)
      userEvent.click(aprovarButton)

      userEvent.click(screen.getByRole('button', { name: /Sim, Aprovar/ }))

      await waitFor(() => {
        expect(useToast().emit).toHaveBeenCalledWith({
          type: 'success',
          message: 'Alteração feita com sucesso'
        })
      })
    })

    it('should show modal when user clicks in "Reprovar" button', async () => {
      await applyTestSetup()

      const reprovarButton = screen.getByRole('button', { name: /REPROVAR/ })

      userEvent.click(reprovarButton)

      expect(screen.getByRole('modal')).toBeInTheDocument()
    })

    it('should call reject volunteer service when I click in "Sim, Reprovar"', async () => {
      const VOLUNTEER_ID = 123
      await applyTestSetup({
        ...volunteer,
        usuario: { ...volunteer?.usuario, id: VOLUNTEER_ID }
      })

      userEvent.click(screen.getByRole('button', { name: /REPROVAR/ }))

      const reprovarButton = screen.getByRole('button', {
        name: /Sim, Reprovar/
      })

      userEvent.click(reprovarButton)

      expect(rejectVolunteerMock).toHaveBeenCalledWith(VOLUNTEER_ID)
    })

    it('should redirect to dashboard admin when sucessfully reject volunteer', async () => {
      await applyTestSetup()

      userEvent.click(screen.getByRole('button', { name: /REPROVAR/ }))

      const reprovarButton = screen.getByRole('button', {
        name: /Sim, Reprovar/
      })

      userEvent.click(reprovarButton)

      expect(await router.push).toHaveBeenCalledWith('/dashboard-administrador')
    })

    it('should render toast with successful message when reject volunteer', async () => {
      await applyTestSetup()

      userEvent.click(screen.getByRole('button', { name: /REPROVAR/ }))

      const reprovarButton = screen.getByRole('button', {
        name: /Sim, Reprovar/
      })

      userEvent.click(reprovarButton)

      await waitFor(() => {
        expect(useToast().emit).toHaveBeenCalledWith({
          type: 'success',
          message: 'Alteração feita com sucesso'
        })
      })
    })

    it('should not render APROVAR and REPROVAR buttons when volunteer is already approved', async () => {
      await applyTestSetup({ ...volunteer, aprovado: true })

      expect(
        screen.queryByRole('button', { name: /APROVAR/ })
      ).not.toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: /REPROVAR/ })
      ).not.toBeInTheDocument()
    })

    it('should not render APROVAR and REPROVAR buttons when volunteer is already rejected', async () => {
      await applyTestSetup({ ...volunteer, aprovado: false })

      expect(
        screen.queryByRole('button', { name: /APROVAR/ })
      ).not.toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: /REPROVAR/ })
      ).not.toBeInTheDocument()
    })
  })

  describe('Page Loader', () => {
    it('should render loader while volunteer data is being fetched', async () => {
      await applyTestSetup(volunteer, false)

      expect(screen.getByTestId('loader')).toBeInTheDocument()
    })
  })

  describe('Go back dashboard modal', () => {
    it('should show modal when link session changes but it is not saved and user clicks in Voltar ao Dashboard', async () => {
      await applyTestSetup({ ...volunteer, aprovado: true })
      const sessionLinkInput = screen.getByRole('textbox')
      userEvent.type(sessionLinkInput, SESSION_LINK)
      userEvent.click(
        screen.getByRole('button', { name: /Voltar ao Dashboard/ })
      )
      expect(screen.getByRole('modal')).toBeInTheDocument()
    })
    it('should close modal when clicks Cancelar', async () => {
      await applyTestSetup({ ...volunteer, aprovado: true })
      const sessionLinkInput = screen.getByRole('textbox')
      userEvent.type(sessionLinkInput, SESSION_LINK)
      userEvent.click(
        screen.getByRole('button', { name: /Voltar ao Dashboard/ })
      )
      userEvent.click(screen.getByRole('button', { name: /Cancelar/ }))
      expect(screen.queryByRole('modal')).not.toBeInTheDocument()
    })
    it('should redirect to Admin Dashboard when clicks in Sair', async () => {
      await applyTestSetup({ ...volunteer, aprovado: true })
      const sessionLinkInput = screen.getByRole('textbox')
      userEvent.type(sessionLinkInput, SESSION_LINK)
      userEvent.click(
        screen.getByRole('button', { name: /Voltar ao Dashboard/ })
      )
      userEvent.click(screen.getByRole('button', { name: /Sair/ }))
      expect(router.push).toHaveBeenCalledWith('/dashboard-administrador')
    })
  })
})
