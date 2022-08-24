import theme from 'styles/theme'
import { screen, render } from 'utils/tests/helpers'
import VolunteerStatusTag from './'

describe('VolunteerStatusTag', () => {
  it('should show tag "Aberto" with correct colors when volunteer status is "Aberto"', async () => {
    render(<VolunteerStatusTag status="Aberto" />)

    const tagElement = screen.getByTestId('volunteer-status-tag')

    expect(tagElement).toHaveTextContent('Aberto')
    expect(tagElement).toHaveStyle(
      `background-color: ${theme.colors.blondYellow};
        color: ${theme.colors.harvestGold};`
    )
  })

  it('should show tag "Reprovado" when volunteer status is "Reprovado"', async () => {
    render(<VolunteerStatusTag status="Reprovado" />)

    const tagElement = screen.getByTestId('volunteer-status-tag')

    expect(tagElement).toHaveTextContent('Reprovado')
    expect(tagElement).toHaveStyle(
      `background-color: ${theme.colors.mistyRose};
        color: ${theme.colors.maroonFlush};`
    )
  })

  it('should show tag "Aprovado" when volunteer status is "Aprovado"', async () => {
    render(<VolunteerStatusTag status="Aprovado" />)

    const tagElement = screen.getByTestId('volunteer-status-tag')

    expect(tagElement).toHaveTextContent('Aprovado')
    expect(tagElement).toHaveStyle(
      `background-color: ${theme.colors.honeydew};
        color: ${theme.colors.emerald};`
    )
  })
})
