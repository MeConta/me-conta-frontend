import { render, screen } from '../../../utils/tests/helpers'

import { DateTimeCard } from './index'

describe('screen show main itens for card schedule', () => {
  const dateTime = new Date('2022-07-14T18:00:00.000Z')

  it.skip('verify date and time when screen is desktop', async () => {
    jest.spyOn(window.screen, 'width', 'get').mockReturnValue(1024)

    await render(<DateTimeCard dateTime={dateTime} />)

    const date = screen.getByText(/14 de julho de 2022/)
    expect(date).toBeInTheDocument()
    const time = screen.getByText(/15:00/)
    expect(time).toBeInTheDocument()
  })

  it.skip('verify date and time when screen is mobile', () => {
    jest.spyOn(window.screen, 'width', 'get').mockReturnValue(768)

    render(<DateTimeCard dateTime={dateTime} />)

    const date = screen.getByText(/14\/07\/2022/)
    expect(date).toBeInTheDocument()
    const time = screen.getByText(/15:00/)
    expect(time).toBeInTheDocument()
  })
})
