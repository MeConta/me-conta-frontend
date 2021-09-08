import { render, screen } from 'utils/tests/helpers'

import { CardContainer } from '.'

describe('<CardContainer/>', () => {
  it('should render the cardContainer component', () => {
    render(
      <CardContainer>
        <p>Text</p>
      </CardContainer>
    )
    const cardContainerElement = screen.getByText('Text')
    expect(cardContainerElement).toBeInTheDocument()
  })
})
