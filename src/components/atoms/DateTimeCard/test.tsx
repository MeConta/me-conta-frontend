import { render, screen } from '../../../utils/tests/helpers'

import { DateTimeCard } from './index'

describe('screen show main itens for card schedule', () => {
  const schedule = {
    date: '14 de julho de 2022',
    time: '18:00'
  }
  render(<DateTimeCard date={schedule.date} time={schedule.time} />)

  it('verify date and time', () => {
    const date = screen.getByText('14 de julho de 2022')
    expect(date).toBeInTheDocument()
    const time = screen.getByText('18:00')
    expect(time).toBeInTheDocument()
  })
})
