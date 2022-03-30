import userEvent from '@testing-library/user-event'
import { render, screen } from 'utils/tests/helpers'
import FrentesDropdown from '.'
import { FrentesInfo } from './frentesInfo'

describe('<FrentesDropdown />', () => {
  const menuItemsToBeInTheDocument = () => {
    FrentesInfo.forEach((frente) => {
      expect(
        screen.queryByRole('menuitem', { name: frente.text })
      ).toBeInTheDocument()
    })
  }

  const menuItemsNotToBeInTheDocument = () => {
    FrentesInfo.forEach((frente) => {
      expect(
        screen.queryByRole('menuitem', { name: frente.text })
      ).not.toBeInTheDocument()
    })
  }

  it('should dipslay dropdown label', () => {
    render(<FrentesDropdown onSelectItem={jest.fn()} />)

    expect(screen.getByText('Especilidade:')).toBeInTheDocument()
  })

  it('should start dropdown closed and with the first option selected as default', () => {
    render(<FrentesDropdown onSelectItem={jest.fn()} />)

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: FrentesInfo[0].text })
    ).toBeInTheDocument()
  })

  it('should open menu options when clicked', () => {
    render(<FrentesDropdown onSelectItem={jest.fn()} />)

    menuItemsNotToBeInTheDocument()
    userEvent.click(screen.getByRole('button'))
    menuItemsToBeInTheDocument()
  })

  it('should change the selected option and close options when clicked', () => {
    render(<FrentesDropdown onSelectItem={jest.fn()} />)

    userEvent.click(screen.getByRole('button'))
    userEvent.click(screen.getByRole('menuitem', { name: FrentesInfo[1].text }))

    expect(
      screen.getByRole('button', { name: FrentesInfo[1].text })
    ).toBeInTheDocument()
    menuItemsNotToBeInTheDocument()
  })

  it('should toggle options', () => {
    render(<FrentesDropdown onSelectItem={jest.fn()} />)

    userEvent.click(screen.getByRole('button'))
    menuItemsToBeInTheDocument()
    userEvent.click(screen.getByRole('button'))
    menuItemsNotToBeInTheDocument()
    expect(
      screen.getByRole('button', { name: FrentesInfo[0].text })
    ).toBeInTheDocument()
  })
})
