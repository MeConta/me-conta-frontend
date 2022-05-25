import userEvent from '@testing-library/user-event'

import { render, screen, act } from 'utils/tests/helpers'

import { PasswordField } from '.'

describe('<PasswordField/>', () => {
  it('should render with password icon', () => {
    render(
      <PasswordField
        label="accessible"
        name="accessible"
        type="password"
        onChange={() => {}}
      />
    )
    expect(screen.getByLabelText(/mostrar senha/i)).toBeInTheDocument()
  })

  it('should change icon when user click', () => {
    render(
      <PasswordField
        label="accessible"
        name="accessible"
        type="password"
        onChange={() => {}}
      />
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

  it('should render popover when it is set', () => {
    render(
      <PasswordField
        label="accessible"
        name="accessible"
        onChange={() => {}}
        showPopover
      ></PasswordField>
    )
    act(() => userEvent.click(screen.getByTestId('passwordField')))
    expect(screen.getByTestId('popoverContainer')).toBeInTheDocument()
  })

  it('should render default text on popover when is not provided', () => {
    render(
      <PasswordField
        label="accessible"
        name="accessible"
        onChange={() => {}}
        showPopover
      ></PasswordField>
    )
    act(() => userEvent.click(screen.getByTestId('passwordField')))
    const popoverPropsDefault = {
      title: 'A senha deve conter pelo menos:',
      items: [
        '8-20 caracteres',
        '1 número',
        '1 letra maiúscula',
        '1 letra minúscula',
        '1 caracter especial (ex: !, @, #, $)'
      ]
    }
    expect(screen.getByText(popoverPropsDefault.title)).toBeInTheDocument()
    popoverPropsDefault.items.forEach((item) =>
      expect(screen.getByText(item)).toBeInTheDocument()
    )
  })

  it('should render the provided text on popover', () => {
    const popoverProps = {
      title: 'Test 123',
      items: ['Item 1', 'Item 2', 'Item 3']
    }
    render(
      <PasswordField
        label="accessible"
        name="accessible"
        onChange={() => {}}
        showPopover
        popoverProps={popoverProps}
      ></PasswordField>
    )
    act(() => userEvent.click(screen.getByTestId('passwordField')))
    expect(screen.getByText(popoverProps.title)).toBeInTheDocument()
    popoverProps.items.forEach((item) =>
      expect(screen.getByText(item)).toBeInTheDocument()
    )
  })
})
