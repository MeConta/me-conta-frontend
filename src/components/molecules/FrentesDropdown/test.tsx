import { render, screen } from 'utils/tests/helpers'

import FrentesDropdown from '.'

describe('<FrentesDropdown />', () => {
  it('deve renderizar o dropdown com o valor padrao e descricao', () => {
    render(<FrentesDropdown onSelectItem={(item) => {}} />)

    expect(screen.getByText('Especilidade:')).toBeInTheDocument()
  })
})
