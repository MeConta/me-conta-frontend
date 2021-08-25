import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from 'utils/tests/helpers'

import { TextInput } from '.'

describe('<TextInput/>', () => {
  it('should render the input with a label, when provided', () => {
    render(<TextInput label="Nome completo" name="nome" />)
    expect(screen.getByLabelText('Nome completo')).toBeInTheDocument()
  })

  it('should render the input without the label, when not provided', () => {
    render(<TextInput />)
    expect(screen.queryByLabelText('qualquer coisa')).not.toBeInTheDocument()
  })

  it('should render the input with placeholder, when provided', () => {
    render(<TextInput placeholder="nome completo" />)
    expect(screen.getByPlaceholderText('nome completo')).toBeInTheDocument()
  })

  it('should change value as changed', async () => {
    const mockChange = jest.fn()
    render(<TextInput inputChange={mockChange} />)
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
    render(<TextInput disabled inputChange={mockChange} />)
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
    const { container } = render(<TextInput error={errorMessage} />)
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should accessible by tab', () => {
    render(<TextInput label="accessible" name="accessible" />)
    const input = screen.getByLabelText('accessible')
    expect(document.body).toHaveFocus()
    userEvent.tab()
    expect(input).toHaveFocus()
  })

  it('should accessible by tab when disabled', () => {
    render(<TextInput label="accessible" name="accessible" disabled />)
    const input = screen.getByLabelText('accessible')
    expect(document.body).toHaveFocus()
    userEvent.tab()
    expect(input).not.toHaveFocus()
  })

  it('should render with password icon', () => {
    render(
      <TextInput label="accessible" name="accessible" hasIcon type="password" />
    )
    expect(screen.getByTestId('fillIcon')).toBeInTheDocument()
  })

  it('should change icon when user click', () => {
    render(
      <TextInput label="accessible" name="accessible" hasIcon type="password" />
    )
    const fillIcon = screen.getByTestId('fillIcon')
    userEvent.click(fillIcon)
    const slashIcon = screen.getByTestId('slashIcon')
    expect(fillIcon).not.toBeInTheDocument()
    expect(slashIcon).toBeInTheDocument()
    userEvent.click(slashIcon)
    expect(slashIcon).not.toBeInTheDocument()
  })
})
