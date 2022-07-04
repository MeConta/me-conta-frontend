import { UserType } from 'enums/user-type.enum'
import PerfilVoluntario from 'pages/dashboard-administrador/perfil-voluntario/[id]'
import React from 'react'
import createAuthContextObject from 'utils/tests/createAuthContextObject'
import { act, render, screen } from 'utils/tests/helpers'
import * as AuthorizationContext from '../../../../store/auth-context'
import userEvent from '@testing-library/user-event'
import router from 'next/router'
import theme from 'styles/theme'
import { api } from 'services/api/api'

jest.mock('store/auth-context')

jest.mock('next/router', () => ({
  useRouter: () => ({ push: jest.fn() }),
  push: jest.fn(),
  query: {
    id: '123'
  }
}))

const volunteer = {
  anoFormacao: 2020,
  aprovado: true,
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
  telefone: '34999999999'
}

const genderMap = [
  ['M', 'Masculino'],
  ['F', 'Feminino'],
  ['NB', 'Não Binário'],
  ['ND', 'Não Declarado']
]

async function applyTestSetup(volunteerParameter: any = volunteer) {
  jest
    .spyOn(AuthorizationContext, 'useAuthContext')
    .mockReturnValue(
      createAuthContextObject(true, UserType.ADMINISTRADOR.toString(), true)
    )

  jest.spyOn(api, 'get').mockResolvedValue({ data: volunteerParameter })

  let container = null

  await act(async () => {
    container = render(<PerfilVoluntario />).container
  })

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

  it('should redirect to dashboard admin when click in Voltar ao Dashboard', async () => {
    await applyTestSetup()
    userEvent.click(screen.getByRole('button', { name: /Voltar ao Dashboard/ }))

    expect(router.push).toHaveBeenCalledWith('/dashboard-administrador')
  })

  describe('Link das Sessões', () => {
    it.skip('should render input title for Link das Sessões', async () => {
      await applyTestSetup()
      expect(screen.getByLabelText(/Link das Sessões/)).toBeInTheDocument()
    })
  })

  describe('Dados Pessoais', () => {
    it('should render personal volunteer info', async () => {
      const container = await applyTestSetup()
      expect(screen.getByText(/Dados Pessoais:/)).toBeInTheDocument()
      expect(container).toHaveTextContent(`Nome: ${volunteer.usuario.nome}`)
      expect(container).toHaveTextContent(`Cidade: ${volunteer.cidade}`)
      expect(container).toHaveTextContent(`E-mail: ${volunteer.usuario.email}`)
      expect(container).toHaveTextContent(`Telefone: ${volunteer.telefone}`)
      expect(container).toHaveTextContent(`Estado: ${volunteer.UF}`)
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
      const aprovarButton = screen.getByRole('button', { name: /REPROVAR/ })
      expect(aprovarButton).toBeInTheDocument()
    })
  })
})
