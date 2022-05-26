import userEvent from '@testing-library/user-event'

import { act, render, screen, waitFor } from 'utils/tests/helpers'

import { TextField } from '.'
import Popover from '../Popover'

describe('<TextField/>', () => {
  it('should render the input with placeholder, when provided', () => {
    render(
      <TextField
        name="name"
        label="label"
        placeholder="nome completo"
        onChange={() => {}}
      />
    )
    expect(screen.getByPlaceholderText('nome completo')).toBeInTheDocument()
  })

  it('should forward required attribute, when required flag is true', () => {
    render(
      <TextField
        name="name"
        label="label"
        required={true}
        onChange={() => {}}
      />
    )
    expect(
      screen.getByTestId('label').getAttribute('aria-required')
    ).toBeTruthy()
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
    render(
      <TextField label="accessible" name="accessible" onChange={() => {}} />
    )
    const input = screen.getByLabelText('accessible')
    expect(document.body).toHaveFocus()
    userEvent.tab()
    expect(input).toHaveFocus()
  })

  it('should accessible by tab when disabled', () => {
    render(
      <TextField
        label="accessible"
        name="accessible"
        disabled
        onChange={() => {}}
      />
    )
    const input = screen.getByLabelText('accessible')
    expect(document.body).toHaveFocus()
    userEvent.tab()
    expect(input).not.toHaveFocus()
  })

  it('should render popover when it is set', () => {
    render(
      <TextField
        label="accessible"
        name="accessible"
        onChange={() => {}}
        showPopover
        popover={<Popover title="Test title" items={['Item 1', 'Item 2']} />}
      />
    )
    act(() => userEvent.click(screen.getByTestId('textField')))
    expect(screen.getByTestId('popoverContainer')).toBeInTheDocument()
  })
})
