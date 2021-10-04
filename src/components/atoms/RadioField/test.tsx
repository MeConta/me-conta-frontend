import { render, screen, waitFor } from '../../../utils/tests/helpers'
import { RadioField } from '.'
import userEvent from '@testing-library/user-event'

describe('<RadioField/>', () => {
  const options = [
    { label: 'test-1', value: 1 },
    { label: 'test-2', value: 2 },
    { label: 'test-3', value: 3 }
  ]

  it('should not change value with text input', async () => {
    render(
      <RadioField
        name="name"
        options={[{ label: 'teste', value: 1 }]}
        data-testid="radio"
        label="radio"
        readOnly
      />
    )
    expect(screen.getByTestId('radio')).toBeInTheDocument()
  })

  it('should render all options', async () => {
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
    const mockChange = jest.fn()
    render(
      <RadioField
        name="name"
        data-testid="radio"
        options={options}
        disabled
        role="radio"
        onChange={mockChange}
      />
    )
    const input = screen.getAllByRole('radio')[0]
    expect(input).toBeDisabled()

    userEvent.click(input)
    await waitFor(() => {
      expect(mockChange).not.toHaveBeenCalled()
    })
  })

  it('should render error the input', () => {
    const errorMessage = 'Error message'
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
