import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from 'utils/tests/helpers'

import { TextField } from '.'

describe('<TextField/>', () => {
  it('should render the input with placeholder, when provided', () => {
    render(<TextField name="name" label="label" placeholder="nome completo" />)
    expect(screen.getByPlaceholderText('nome completo')).toBeInTheDocument()
  })

  it('should change value as changed', async () => {
    const mockChange = jest.fn()
    render(<TextField name="name" label="label" onChange={mockChange} />)
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
    render(
      <TextField name="name" label="label" disabled onChange={mockChange} />
    )
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled

    const text = 'texto do teste'
    userEvent.type(input, text)
    await waitFor(() => {
      expect(input).not.toHaveValue(text)
      expect(mockChange).not.toHaveBeenCalled()
    })
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
