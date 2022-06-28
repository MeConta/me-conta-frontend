import PerfilVoluntario from 'pages/dashboard-administrador/perfil-voluntario/[id]'
import React from 'react'
import { render, screen } from 'utils/tests/helpers'

describe('Perfil Voluntário', () => {
  it('should render title Perfil Voluntário', () => {
    render(<PerfilVoluntario />)

    expect(screen.getByText(/Perfil - Voluntário/)).toBeInTheDocument()
  })
})
