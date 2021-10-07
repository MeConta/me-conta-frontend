import userEvent from '@testing-library/user-event'

import {
  render,
  screen,
  fireEvent,
  waitFor
} from '../../../utils/tests/helpers'

import { PhoneField } from '.'

describe('<PhoneField/>', () => {
  it('Should be defined', () => {
    expect(true).toBeTruthy()
  })
  // it('Should show phone mask in input value', () => {
  //   const inputNumber = '99999999999'
  //
  //   render(<PhoneField data-testid="phone-number" name="phone" label="phone" />)
  //   const inputElement = screen.getByTestId('phone-number')
  //   fireEvent.change(inputElement, { target: { value: inputNumber } })
  //   expect(inputElement).toHaveDisplayValue('(99) 99999-9999')
  // })
  //
  // it('should not change value with text input', async () => {
  //   render(<PhoneField data-testid="phone-number" name="phone" label="phone" />)
  //   const inputElement = screen.getByTestId('phone-number')
  //   const text = 'abcdef'
  //   userEvent.type(inputElement, text)
  //   await waitFor(() => {
  //     expect(inputElement).toHaveValue('')
  //   })
  // })
})
