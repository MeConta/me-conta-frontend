import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from 'utils/tests/helpers'

import { FormGroup } from '.'

describe('<FormGroup/>', () => {
  it('should render the input with a label, when provided', () => {
    render(
      <FormGroup label="qualquer-label" name="nome">
        <input id="nome" />
      </FormGroup>
    )
    expect(screen.getByLabelText('qualquer-label')).toBeInTheDocument()
  })

  it('should render error input', () => {
    const errorMessage = 'Error message'
    const { container } = render(
      <FormGroup label="qualquer-label" name="nome" error={errorMessage}>
        <input id="nome" />
      </FormGroup>
    )
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })

  // it('should accessible by tab', () => {
  //   render(<FormGroup label="accessible" name="accessible" />)
  //   const input = screen.getByLabelText('accessible')
  //   expect(document.body).toHaveFocus()
  //   userEvent.tab()
  //   expect(input).toHaveFocus()
  // })

  // it('should accessible by tab when disabled', () => {
  //   render(<FormGroup label="accessible" name="accessible" disabled />)
  //   const input = screen.getByLabelText('accessible')
  //   expect(document.body).toHaveFocus()
  //   userEvent.tab()
  //   expect(input).not.toHaveFocus()
  // })
})
