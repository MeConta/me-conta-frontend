import userEvent from '@testing-library/user-event'
import { fireEvent, render, screen, waitFor } from 'utils/tests/helpers'

import { SelectField } from '.'

describe('<SelectField/>', () => {
  const mockChange = jest.fn()
  // Rever Teste
  it('should change value as changed', async () => {
    render(
      <SelectField
        name="select"
        labelField="select"
        options={[{ value: 'value', label: 'label' }]}
        onChange={mockChange}
        data-testid="select-id"
      />
    )
    const selectElement = screen.getByTestId('select-id')
    fireEvent.change(selectElement, { target: { value: 'value' } })
    expect(selectElement).toHaveValue('value')
  })

  // it('If disabled should not change value', async () => {
  //   const mockChange = jest.fn()
  //   render(<SelectField disabled onChange={mockChange} />)
  //   const input = screen.getByRole('textbox')
  //   expect(input).toBeDisabled

  //   const text = 'texto do teste'
  //   userEvent.type(input, text)
  //   await waitFor(() => {
  //     expect(input).not.toHaveValue(text)
  //     expect(mockChange).not.toHaveBeenCalled()
  //   })
  // })

  it('should accessible by tab', () => {
    render(
      <SelectField
        options={[{ value: 'value', label: 'label' }]}
        labelField="accessible"
        name="accessible"
        onChange={mockChange}
      />
    )
    const selectElement = screen.getByLabelText('accessible')
    expect(document.body).toHaveFocus()
    userEvent.tab()
    expect(selectElement).toHaveFocus()
  })

  it('should not accessible by tab when disabled', () => {
    render(
      <SelectField
        options={[{ value: 'value', label: 'label' }]}
        labelField="accessible"
        name="accessible"
        onChange={mockChange}
        disabled
      />
    )
    const input = screen.getByLabelText('accessible')
    expect(document.body).toHaveFocus()
    userEvent.tab()
    expect(input).not.toHaveFocus()
  })
})
