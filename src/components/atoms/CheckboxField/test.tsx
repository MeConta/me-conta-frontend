import userEvent from '@testing-library/user-event'
import { formatPhoneNumber } from '../../../utils/format-string/helpers'

import {
  render,
  screen,
  fireEvent,
  waitFor
} from '../../../utils/tests/helpers'

import { CheckboxField } from '.'

describe('<CheckboxField/>', () => {
  it('should not change value with text input', async () => {
    render(<CheckboxField data-testid="checkbox" label="checkbox" />)
    expect(screen.getByTestId('checkbox')).toBeInTheDocument()
  })
})
