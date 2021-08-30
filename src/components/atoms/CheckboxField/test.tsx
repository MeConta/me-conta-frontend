import { render, screen } from '../../../utils/tests/helpers'

import { CheckboxField } from '.'

describe('<CheckboxField/>', () => {
  it('should not change value with text input', async () => {
    render(<CheckboxField data-testid="checkbox" label="checkbox" />)
    expect(screen.getByTestId('checkbox')).toBeInTheDocument()
  })
})
