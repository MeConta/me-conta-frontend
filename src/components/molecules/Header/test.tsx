import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Header from './index'

it('should render Header', () => {
  const { getByText } = render(<Header />)
  expect(getByText('Header')).toBeInTheDocument()
})

test('it works', () => {
  const tree = renderer.create(<Header />).toJSON()
  expect(tree).toMatchSnapshot()
  expect(tree).toHaveStyleRule('color', 'red')
})
