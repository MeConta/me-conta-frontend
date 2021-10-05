import { toast } from 'react-toastify'
import { act, render, RenderResult, screen } from 'utils/tests/helpers'
import { Toast } from '.'

jest.useFakeTimers()

describe('<Toast />', () => {
  let renderResult: RenderResult
  beforeEach(() => {
    renderResult = render(<Toast />)
  })
  it('deve renderizar o toastContainer', () => {
    expect(renderResult.container.firstChild).toHaveClass('Toastify')
  })
  it('deve exibir o toast', () => {
    act(() => {
      toast('test')
      jest.runAllTimers()
    })
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
