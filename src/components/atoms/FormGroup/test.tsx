import userEvent from '@testing-library/user-event'

import { act, render, screen } from 'utils/tests/helpers'

import { FormGroup } from '.'
import Popover from '../Popover'

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

  it('should render popover when it is set', () => {
    render(
      <FormGroup
        label="accessible"
        name="accessible"
        error="accessible"
        popover={<Popover title="Test title" items={['Item 1', 'Item 2']} />}
        showPopover
      >
        <input id="nome" data-testid="inputField" />
      </FormGroup>
    )
    act(() => userEvent.click(screen.getByTestId('inputField')))
    expect(screen.getByTestId('popoverContainer')).toBeInTheDocument()
  })

  it('should render extraContent when it is set', () => {
    render(
      <FormGroup
        label="accessible"
        name="accessible"
        extraContent={<p>10/200</p>}
        showPopover
      >
        <input id="nome" data-testid="inputField" />
      </FormGroup>
    )
    expect(screen.getByText('10/200')).toBeInTheDocument()
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
