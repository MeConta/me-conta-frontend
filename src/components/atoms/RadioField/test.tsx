import { render, screen, waitFor } from '../../../utils/tests/helpers'
import { RadioField } from '.'
import userEvent from '@testing-library/user-event'

describe('<RadioField/>', () => {
  const options = [
    { label: 'test-1', value: 1 },
    { label: 'test-2', value: 2 },
    { label: 'test-3', value: 3 }
  ]

  const mockChange = jest.fn()

  it('should not change value with text input', async () => {
    render(
      <RadioField
        name="name"
        options={[{ label: 'teste', value: 1 }]}
        data-testid="radio"
        label="radio-label"
        readOnly
        onChange={mockChange}
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
        label="radio-label"
        readOnly
        onChange={mockChange}
      />
    )
    const elements = screen.getAllByTestId('radio')
    expect(elements.length).toBe(options.length)
  })

  it('should render option label with text between parentheses in bold', async () => {
    const boldOptions = [
      { label: 'teste (aluno)', value: 0 },
      { label: 'teste (atendente voluntário)', value: 1 },
      { label: 'teste 3', value: 1 }
    ]

    const { container } = render(
      <RadioField
        name="name"
        options={boldOptions}
        data-testid="radio"
        label="radio-label"
        readOnly
        onChange={mockChange}
      />
    )

    const boldTexts = container.querySelectorAll('b')
    expect(boldTexts).toHaveLength(2)
    expect(boldTexts[0]).toHaveTextContent('(aluno)')
    expect(boldTexts[1]).toHaveTextContent('(atendente voluntário)')
  })

  it('should disable input with disabled propriety', async () => {
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
        onChange={mockChange}
      />
    )
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should forward the required flag to the label', () => {
    render(
      <RadioField
        name="name"
        label="label"
        options={options}
        required
        role="radio"
        onChange={mockChange}
      />
    )
    expect(screen.getByTestId('label')).toHaveAttribute('aria-required', 'true')
  })
})
