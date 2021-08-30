import { render, screen, waitFor } from '../../../utils/tests/helpers'

import { CheckboxField } from '.'
import { act } from 'react-test-renderer'
import userEvent from '@testing-library/user-event'
import { RadioField } from '../RadioField'

describe('<CheckboxField/>', () => {
  it('should not change value with text input', async () => {
    render(<CheckboxField data-testid="checkbox" label="checkbox" />)
    expect(screen.getByTestId('checkbox')).toBeInTheDocument()
  })

  it('should change value when clicked', () => {
    render(
      <CheckboxField data-testid="checkbox" label="checkbox" name="checkbox" />
    )
    act(() => {
      userEvent.click(screen.getByTestId('checkbox'))
    })
    expect(screen.getByLabelText(/checkbox/i)).toBeChecked()
  })

  it('should disable input with disabled propriety', async () => {
    const mockChange = jest.fn()
    render(
      <CheckboxField
        name="checkbox"
        data-testid="checkbox"
        disabled
        onChange={mockChange}
      />
    )
    const input = screen.getByTestId('checkbox')
    expect(input).toBeDisabled()

    userEvent.click(input)
    await waitFor(() => {
      expect(mockChange).not.toHaveBeenCalled()
    })
  })

  it('should render error the input', () => {
    const errorMessage = 'Error message'
    const { container } = render(
      <CheckboxField
        name="checkbox"
        data-testid="checkbox"
        error={errorMessage}
      />
    )
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })
})
