import { render, screen, waitFor } from '../../../utils/tests/helpers'
import LogoutDialog from '.'
import router from '../../../../__mocks__/next/router'
import { jest } from '@jest/globals'

describe('<LogoutDialog />', () => {
  const redirect = jest.fn()

  it('should render with correct texts', () => {
    render(<LogoutDialog />)

    expect(
      screen.getByText('Você desconectou da nossa plataforma')
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Em instantes você será redirecionado para a página principal'
      )
    ).toBeInTheDocument()
  })
  //Espero que após 3 segundos a rota tenha sido chamada
  it('should redirect to link after 3 seconds', () => {
    jest.useFakeTimers()
    jest.spyOn(global, 'setTimeout')
    render(<LogoutDialog />)

    expect(setTimeout).toHaveBeenCalledTimes(1)
    //jest.runAllTimers()
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000)
  })

  // it('expect to redirect to home page', () => {

  // })
})
