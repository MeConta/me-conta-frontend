import { render, screen } from 'utils/tests/helpers'

import { FormLogin } from '.'

describe('<FormLogin/>', () => {
  it('should render a login form ', async () => {
    const { container } = render(<FormLogin />)

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()

    expect(
      screen.getByRole('link', { name: /esqueceu a senha\?/i })
    ).toBeInTheDocument()

    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()

    expect(container.parentElement).toMatchSnapshot()
  })
})
