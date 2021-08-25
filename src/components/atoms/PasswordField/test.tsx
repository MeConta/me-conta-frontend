import userEvent from '@testing-library/user-event'

import { render, screen, waitFor, act } from 'utils/tests/helpers'

import { PasswordField } from '.'

describe('<PasswordField/>', () => {
  it('should render with password icon', () => {
    render(
      <PasswordField label="accessible" name="accessible" type="password" />
    )
    expect(screen.getByLabelText(/mostrar senha/i)).toBeInTheDocument()
  })

  it('should change icon when user click', () => {
    render(
      <PasswordField label="accessible" name="accessible" type="password" />
    )
    act(() => {
      userEvent.click(screen.getByTestId('icon'))
    })
    expect(screen.getByLabelText(/esconder senha/i)).toBeInTheDocument()
    act(() => {
      userEvent.click(screen.getByTestId('icon'))
    })
    expect(screen.getByLabelText(/mostrar senha/i)).toBeInTheDocument()
  })
})
