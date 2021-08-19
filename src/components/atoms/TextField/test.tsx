import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from 'utils/tests/helpers'
import { TextInput } from '.'

describe('<Input/>', () => {
  it('should render the input with defined style', () => {
    renderWithTheme(<TextInput />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveStyle({
      'background-color': '#FFFFFF',
      border: '1px solid #848A8C',
      'border-radius': '0.7rem',
      padding: '0.8rem 5.6rem'
    })
  })

  it('should render the input with a label, when provided', () => {
    renderWithTheme(<TextInput label="Nome completo" name="nome" />)
    expect(screen.getByLabelText('Nome completo')).toBeInTheDocument()
  })

  it('should render the input without the label, when not provided', () => {
    renderWithTheme(<TextInput />)
    expect(screen.queryByLabelText('qualquer coisa')).not.toBeInTheDocument()
  })

  it('should render the input with placeholder, when provided', () => {
    renderWithTheme(<TextInput placeholder="nome completo" />)
    expect(screen.getByPlaceholderText('nome completo')).toBeInTheDocument()
  })

  it('should change value as changed', async () => {
    const mockChange = jest.fn()
    renderWithTheme(<TextInput inputChange={mockChange} />)
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
    renderWithTheme(<TextInput disabled inputChange={mockChange} />)
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
    const { container } = renderWithTheme(<TextInput error={errorMessage} />)
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should accessible by tab', () => {
    renderWithTheme(<TextInput label="accessible" name="accessible" />)
    const input = screen.getByLabelText('accessible')
    expect(document.body).toHaveFocus()
    userEvent.tab()
    expect(input).toHaveFocus()
  })

  it('should accessible by tab when disabled', () => {
    renderWithTheme(<TextInput label="accessible" name="accessible" disabled />)
    const input = screen.getByLabelText('accessible')
    expect(document.body).toHaveFocus()
    userEvent.tab()
    expect(input).not.toHaveFocus()
  })
})
