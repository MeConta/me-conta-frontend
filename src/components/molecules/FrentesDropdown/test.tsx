import userEvent from '@testing-library/user-event'
import { render, screen } from 'utils/tests/helpers'
import FrentesDropdown from '.'
import { FrentesInfo } from './frentesInfo'

describe('<FrentesDropdown />', () => {
  it('should dipslay dropdown label', () => {
    render(<FrentesDropdown onSelectItem={(item) => {}} />)

    expect(screen.getByText('Especilidade:')).toBeInTheDocument()
  })

  it('should start dropdown closed and with the first option selected as default', () => {
    render(<FrentesDropdown onSelectItem={(item) => {}} />)

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: FrentesInfo[0].text })
    ).toBeInTheDocument()
  })

  it('should open menu options when clicked', () => {
    render(<FrentesDropdown onSelectItem={(item) => {}} />)

    expect(
      screen.queryByRole('menuitem', { name: FrentesInfo[0].text })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('menuitem', { name: FrentesInfo[1].text })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('menuitem', { name: FrentesInfo[2].text })
    ).not.toBeInTheDocument()

    userEvent.click(screen.getByRole('button'))

    expect(
      screen.getByRole('menuitem', { name: FrentesInfo[0].text })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('menuitem', { name: FrentesInfo[1].text })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('menuitem', { name: FrentesInfo[2].text })
    ).toBeInTheDocument()
  })

  it('should change the selected option and close options when clicked', () => {
    render(<FrentesDropdown onSelectItem={(item) => {}} />)

    userEvent.click(screen.getByRole('button'))
    userEvent.click(screen.getByRole('menuitem', { name: FrentesInfo[1].text }))

    expect(
      screen.getByRole('button', { name: FrentesInfo[1].text })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('menuitem', { name: FrentesInfo[0].text })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('menuitem', { name: FrentesInfo[1].text })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('menuitem', { name: FrentesInfo[2].text })
    ).not.toBeInTheDocument()
  })
})
