import userEvent from '@testing-library/user-event'

import { render, screen, waitFor, act } from 'utils/tests/helpers'

import { TextField } from '.'

describe('<TextField/>', () => {
  it('should render the input with a label, when provided', () => {
    render(<TextField label="Nome completo" name="nome" />)
    expect(screen.getByLabelText('Nome completo')).toBeInTheDocument()
  })

  it('should render the input without the label, when not provided', () => {
    render(<TextField />)
    expect(screen.queryByLabelText('qualquer coisa')).not.toBeInTheDocument()
  })

  it('should render the input with placeholder, when provided', () => {
    render(<TextField placeholder="nome completo" />)
    expect(screen.getByPlaceholderText('nome completo')).toBeInTheDocument()
  })

  it('should change value as changed', async () => {
    const mockChange = jest.fn()
    render(<TextField onChange={mockChange} />)
    const input = screen.getByRole('textbox')
    const text = 'texto do teste'
    userEvent.type(input, text)
    await waitFor(() => {
      expect(input).toHaveValue(text)
      expect(mockChange).toHaveBeenCalledTimes(text.length)
    })
  })

  it('If disabled should not change value', async () => {
    const mockChange = jest.fn()
    render(<TextField disabled onChange={mockChange} />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled

    const text = 'texto do teste'
    userEvent.type(input, text)
    await waitFor(() => {
      expect(input).not.toHaveValue(text)
      expect(mockChange).not.toHaveBeenCalled()
    })
  })

  it('should render error the input', () => {
    const errorMessage = 'Error message'
    const { container } = render(<TextField error={errorMessage} />)
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should accessible by tab', () => {
    render(<TextField label="accessible" name="accessible" />)
    const input = screen.getByLabelText('accessible')
    expect(document.body).toHaveFocus()
    userEvent.tab()
    expect(input).toHaveFocus()
  })

  it('should accessible by tab when disabled', () => {
    render(<TextField label="accessible" name="accessible" disabled />)
    const input = screen.getByLabelText('accessible')
    expect(document.body).toHaveFocus()
    userEvent.tab()
    expect(input).not.toHaveFocus()
  })
})
