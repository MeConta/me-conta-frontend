import { render, screen } from '../../../utils/tests/helpers'
import Dialog from '.'

describe('<Dialog />', () => {
  it('should render with a title and logo', () => {
    render(<Dialog title={'Título'} />)
    expect(screen.getByText('Título')).toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('should render with a decorated title', () => {
    const { container } = render(
      <Dialog
        titleInfo={{
          preText: 'Título',
          boldText: 'em destaque',
          posText: 'pós text'
        }}
      />
    )

    expect(container.querySelector('p')).toHaveTextContent(
      'Título em destaque pós text'
    )
    expect(container.querySelector('b')).toHaveTextContent('em destaque')
  })
})
