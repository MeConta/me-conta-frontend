import { render, screen, waitFor } from '../../../utils/tests/helpers'
import { RadioField } from '.'
import userEvent from '@testing-library/user-event'

describe('<RadioField/>', () => {
  it('should not change value with text input', async () => {
    render(
      <RadioField
        name="name"
        options={['teste']}
        data-testid="radio"
        label="radio"
        readOnly
      />
    )
    expect(screen.getByTestId('radio')).toBeInTheDocument()
  })

  it('should render all options', async () => {
    const options = ['test-1', 'test-2', 'test-3']
    render(
      <RadioField
        name="name"
        options={options}
        data-testid="radio"
        label="radio"
        readOnly
      />
    )
    const elements = screen.getAllByTestId('radio')
    expect(elements.length).toBe(options.length)
  })

  it('should disable input with disabled propriety', async () => {
    const options = ['test-1', 'test-2', 'test-3']
    const mockChange = jest.fn()
    render(
      <RadioField
        name="name"
        data-testid="radio"
        options={options}
        disabled
        onChange={mockChange}
      />
    )
    const input = screen.getByDisplayValue(options[0])
    expect(input).toBeDisabled()

    userEvent.click(input)
    await waitFor(() => {
      expect(mockChange).not.toHaveBeenCalled()
    })
  })

  it('should render error the input', () => {
    const errorMessage = 'Error message'
    const options = ['test-1', 'test-2', 'test-3']
    const { container } = render(
      <RadioField
        name="name"
        data-testid="radio"
        options={options}
        error={errorMessage}
        readOnly
      />
    )
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })
})
