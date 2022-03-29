import { toast } from 'react-toastify'
import { act, render, RenderResult, screen } from 'utils/tests/helpers'
import { Toast } from '.'

jest.useFakeTimers()

describe('<Toast />', () => {
  let renderResult: RenderResult
  beforeEach(() => {
    renderResult = render(<Toast />)
  })
  it('should render TestContainer', () => {
    expect(renderResult.container.firstChild).toHaveClass('Toastify')
  })
  it('should show a Toast', () => {
    act(() => {
      toast('test')
      jest.runAllTimers()
    })
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
