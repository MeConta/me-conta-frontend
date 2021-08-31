import { render, screen } from 'utils/tests/helpers'

import { SelectField } from '.'

describe('<SelectField/>', () => {
  it('should render the input with a label, when provided', () => {
    const onChangeMocked = jest.fn()
    render(
      <SelectField
        options={[{ value: 'teste', label: 'teste' }]}
        label="Nome completo"
        onChange={onChangeMocked}
        name="nome"
      />
    )
    expect(screen.getByLabelText('Nome completo')).toBeInTheDocument()
  })

  // it('should render the input without the label, when not provided', () => {
  //   render(<SelectField />)
  //   expect(screen.queryByLabelText('qualquer coisa')).not.toBeInTheDocument()
  // })

  // it('should render the input with placeholder, when provided', () => {
  //   render(<SelectField placeholder="nome completo" />)
  //   expect(screen.getByPlaceholderText('nome completo')).toBeInTheDocument()
  // })

  // it('should change value as changed', async () => {
  //   const mockChange = jest.fn()
  //   render(<SelectField onChange={mockChange} />)
  //   const input = screen.getByRole('textbox')
  //   const text = 'texto do teste'
  //   userEvent.type(input, text)
  //   await waitFor(() => {
  //     expect(input).toHaveValue(text)
  //     expect(mockChange).toHaveBeenCalledTimes(text.length)
  //   })
  // })

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

  // it('should render error the input', () => {
  //   const errorMessage = 'Error message'
  //   const { container } = render(<SelectField error={errorMessage} />)
  //   expect(screen.getByText(errorMessage)).toBeInTheDocument()
  //   expect(container.firstChild).toMatchSnapshot()
  // })

  // it('should accessible by tab', () => {
  //   render(<SelectField label="accessible" name="accessible" />)
  //   const input = screen.getByLabelText('accessible')
  //   expect(document.body).toHaveFocus()
  //   userEvent.tab()
  //   expect(input).toHaveFocus()
  // })

  // it('should accessible by tab when disabled', () => {
  //   render(<SelectField label="accessible" name="accessible" disabled />)
  //   const input = screen.getByLabelText('accessible')
  //   expect(document.body).toHaveFocus()
  //   userEvent.tab()
  //   expect(input).not.toHaveFocus()
  // })
})
