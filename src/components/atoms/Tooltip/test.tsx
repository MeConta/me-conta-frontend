import userEvent from '@testing-library/user-event'

import { render, screen } from 'utils/tests/helpers'
import Tooltip from '.'

describe('Tooltip', () => {
  it('should render a tooltip in hover', async () => {
    render(
      <Tooltip text="tooltip test">
        <div data-testid="TooltipChildren">Children</div>
      </Tooltip>
    )

    const element = screen.getByTestId('TooltipChildren')
    userEvent.hover(element.parentElement!)

    const tooltip = screen.getByText(/tooltip test/)
    expect(tooltip).toBeInTheDocument()
    expect(tooltip).toHaveStyleRule(`visibility: visible`)
  })

  it('should not render a tooltip when is not hover', () => {
    render(
      <Tooltip text="tooltip test">
        <div data-testid="TooltipChildren">Children</div>
      </Tooltip>
    )

    const tooltip = screen.getByText(/tooltip test/)
    expect(tooltip).toBeInTheDocument()
    expect(tooltip).toHaveStyleRule(`visibility: hidden`)
  })
})
