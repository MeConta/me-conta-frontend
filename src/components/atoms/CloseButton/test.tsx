import { render, screen } from '../../../utils/tests/helpers'
import CloseButton from '.'

describe('<CloseButton />', () => {
  const onclickSpy = jest.fn()
  it('should render close button', async () => {
    render(<CloseButton onClick={onclickSpy} />)

    expect(screen.getByTestId('close')).toBeInTheDocument()
    expect(screen.getByTestId('close')).toHaveStyle(
      `
            background-color: transparent;
            border: none;
            cursor: pointer;
            `
    )
  })

  it('should call function when button is clicked', async () => {
    render(<CloseButton onClick={onclickSpy} />)

    screen.getByTestId('close').click()
    expect(onclickSpy).toHaveBeenCalled()
  })
})
