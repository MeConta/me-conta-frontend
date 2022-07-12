import { render, screen } from '../../../utils/tests/helpers'
import userEvent from '@testing-library/user-event'
import CloseButton from '.'

describe('<CloseButton />', () => {
  it('should close the dialog after clicking in close button', async () => {
    render(<CloseButton />)

    expect(screen.getByTestId('close')).toBeInTheDocument()
    expect(screen.getByTestId('close')).toHaveStyle(
      `
            background-color: transparent;
            border: none;
            cursor: pointer;
            `
    )
  })
})
