import { render, screen } from '../../../utils/tests/helpers'
import SectionDetailsText from './index'
import theme from '../../../styles/theme'

describe('SectionDetailsText', () => {
  it('should render label as semibold text and value as normal text', () => {
    render(<SectionDetailsText label="Nome" value="Maria Silva" />)

    expect(screen.getByText('Nome:')).toHaveStyleRule(
      `font-weight: ${theme.font.semibold}`
    )

    expect(screen.getByText('Maria Silva')).toHaveStyleRule(
      `font-weight: ${theme.font.normal}`
    )
  })
})
