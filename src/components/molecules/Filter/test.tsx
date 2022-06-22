import { render, screen } from '../../../utils/tests/helpers'
import React from 'react'
import Filter from './index'
import userEvent from '@testing-library/user-event'
import theme from '../../../styles/theme'

const filters = ['Em aberto', 'Aprovados', 'Reprovados', 'Todos']

describe('<Filter />', () => {
  const handleClickMock = jest.fn()

  it('should render filter with filter options', () => {
    render(<Filter filterOptions={filters} handleClick={handleClickMock} />)

    expect(screen.getByRole('button', { name: filters[0] })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: filters[1] })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: filters[2] })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: filters[3] })).toBeInTheDocument()
  })

  it('should exhibit active button styles when clicked', () => {
    render(<Filter filterOptions={filters} handleClick={handleClickMock} />)

    const thirdOption = screen.getByRole('button', { name: filters[2] })

    userEvent.click(thirdOption)
    expect(thirdOption).toHaveStyle(
      `background-color: ${theme.colors.cornflowerBlue};
      color: white`
    )
  })

  it('should call handleClick function when clicked on filter name', () => {
    render(<Filter filterOptions={filters} handleClick={handleClickMock} />)

    const thirdOption = screen.getByRole('button', { name: filters[2] })

    userEvent.click(thirdOption)
    expect(handleClickMock).toHaveBeenCalledWith(filters[2])
  })
})
