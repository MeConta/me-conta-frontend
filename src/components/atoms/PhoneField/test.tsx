import userEvent from '@testing-library/user-event'
import { formatPhoneNumber } from 'utils/format-string'

import { render, screen, waitFor, act, fireEvent } from 'utils/tests/helpers'

import { PhoneField } from '.'

describe('<PhoneField/>', () => {
  it('Should show phone mask in input value', () => {
    const inputNumber = '99999999999'

    render(<PhoneField data-testid="phone-number" label="phone" />)
    const inputElement = screen.getAllByTestId('phone-number')[0]
    fireEvent.change(inputElement, { target: { value: inputNumber } })
    expect(inputElement).toHaveDisplayValue(formatPhoneNumber(inputNumber))
  })
})
