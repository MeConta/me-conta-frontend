import { render, screen, waitFor, act } from '../../../utils/tests/helpers'
import userEvent from '@testing-library/user-event'

import { CheckboxField } from '.'

const mockChange = jest.fn()

describe('<CheckboxField/>', () => {
  it('should not change value with text input', async () => {
    render(
      <CheckboxField
        data-testid="checkbox"
        label="label"
        onChange={mockChange}
      />
    )
    expect(screen.getByTestId('checkbox')).toBeInTheDocument()
  })

  it('should change value when clicked', () => {
    render(
      <CheckboxField
        data-testid="checkbox"
        label="label"
        name="checkbox"
        onChange={mockChange}
      />
    )
    act(() => {
      userEvent.click(screen.getByTestId('checkbox'))
    })
    expect(screen.getByLabelText(/label/i)).toBeChecked()
  })

  it('should disable input with disabled propriety', async () => {
    const mockChangeNotCalled = jest.fn()
    render(
      <CheckboxField
        name="checkbox"
        data-testid="checkbox"
        disabled
        onChange={mockChangeNotCalled}
      />
    )
    const input = screen.getByTestId('checkbox')
    expect(input).toBeDisabled()

    userEvent.click(input)
    await waitFor(() => {
      expect(mockChangeNotCalled).not.toHaveBeenCalled()
    })
  })

  it('should render error the input', () => {
    const errorMessage = 'Error message'
    const { container } = render(
      <CheckboxField
        name="checkbox"
        data-testid="checkbox"
        error={errorMessage}
        onChange={mockChange}
      />
    )
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should forward the required flag to the label', () => {
    render(
      <CheckboxField
        label="label"
        name="checkbox"
        required
        onChange={mockChange}
      />
    )
    expect(screen.getByTestId('label')).toHaveAttribute('aria-required', 'true')
  })
})
