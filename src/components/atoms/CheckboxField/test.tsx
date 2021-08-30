import { render, screen } from '../../../utils/tests/helpers'

import { CheckboxField } from '.'
import { act } from 'react-test-renderer'
import userEvent from '@testing-library/user-event'

describe('<CheckboxField/>', () => {
  it('should not change value with text input', async () => {
    render(<CheckboxField data-testid="checkbox" label="checkbox" />)
    expect(screen.getByTestId('checkbox')).toBeInTheDocument()
  })

  it('should change value when clicked', () => {
    render(
      <CheckboxField data-testid="checkbox" label="checkbox" name="checkbox" />
    )
    act(() => {
      userEvent.click(screen.getByTestId('checkbox'))
    })
    expect(screen.getByLabelText(/checkbox/i)).toBeChecked()
  })
})
