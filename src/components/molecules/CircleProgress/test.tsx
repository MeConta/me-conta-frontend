import { render, screen } from 'utils/tests/helpers'
import theme from '../../../styles/theme'
import { App } from '@styled-icons/bootstrap'

import CircleProgress from '.'

describe('<CircleProgress/>', () => {
  it('should render the component on screen', () => {
    render(<CircleProgress></CircleProgress>)

    expect(screen.getByTestId('circleContainer')).toBeInTheDocument()
    expect(screen.getByTestId('circleSubtitle')).toBeInTheDocument()
    expect(screen.getByTestId('circleLine')).toBeInTheDocument()
    expect(screen.getByTestId('circleIcon')).toBeInTheDocument()
    expect(screen.getByTestId('circle')).toBeInTheDocument()

    expect(screen.getByTestId('circleContainer')).toMatchSnapshot()
  })

  it('circle container should contain all elements', () => {
    render(<CircleProgress></CircleProgress>)

    const circleContainer = screen.getByTestId('circleContainer')
    expect(circleContainer).toBeInTheDocument()
    expect(circleContainer).toContainElement(screen.getByTestId('circle'))
    expect(circleContainer).toContainElement(screen.getByTestId('circleIcon'))
    expect(circleContainer).toContainElement(screen.getByTestId('circleLine'))
    expect(circleContainer).toContainElement(
      screen.getByTestId('circleSubtitle')
    )
  })

  it('should render circle with cornflowerblue color when active is true', () => {
    render(<CircleProgress active={true} displayLine={false}></CircleProgress>)

    expect(screen.getByTestId('circle')).toHaveStyle({
      'background-color': theme.colors.cornflowerBlue
    })
    expect(screen.getByTestId('circleSubtitle')).toHaveStyle({
      color: theme.colors.cornflowerBlue
    })
  })

  it('should render circle line with cornflowerblue color and subtitle bold when active and displayLine are true', () => {
    render(<CircleProgress active={true} displayLine={true}></CircleProgress>)

    expect(screen.getByTestId('circleLine')).toHaveStyle({
      border: '1px solid',
      'border-color': theme.colors.cornflowerBlue
    })
    expect(screen.getByTestId('circleSubtitle')).toHaveStyle({
      'font-weight': theme.font.bold,
      color: theme.colors.cornflowerBlue
    })
  })

  it('should render circle with spanishGray color when active is false', () => {
    render(<CircleProgress active={false} displayLine={false}></CircleProgress>)

    expect(screen.getByTestId('circleLine')).toHaveStyle({
      'border-color': theme.colors.spanishGray
    })
    expect(screen.getByTestId('circle')).toHaveStyle({
      'background-color': theme.colors.transparent
    })
    expect(screen.getByTestId('circleSubtitle')).toHaveStyle({
      color: theme.colors.spanishGray
    })
  })

  it('should render circle line with spanishGray color when active is false and displayLine is true', () => {
    render(<CircleProgress active={false} displayLine={true}></CircleProgress>)

    expect(screen.getByTestId('circleLine')).toHaveStyle({
      border: '1px solid',
      'border-color': theme.colors.spanishGray
    })
  })

  it('should render circle with icon when an icon is set', () => {
    render(
      <CircleProgress icon={<App data-testid="appIcon" />}></CircleProgress>
    )

    expect(screen.getByTestId('circleIcon')).toContainElement(
      screen.getByTestId('appIcon')
    )
  })

  it('should render subtitle when it is set', () => {
    render(<CircleProgress>Test subtitle</CircleProgress>)

    expect(screen.getByTestId('circleSubtitle')).toHaveTextContent(
      'Test subtitle'
    )
  })
})
