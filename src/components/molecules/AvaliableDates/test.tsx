import '../../../utils/tests/matchMedia.mock'

import React from 'react'
import { render, screen } from 'utils/tests/helpers'
import { AvailableDates } from './index'
import { fireEvent, waitFor } from '@testing-library/dom'
import { act } from '@testing-library/react'
import { SlotResponseInterface } from '../../../services/agenda-services/agenda-service'

const DATES: SlotResponseInterface[] = [
  {
    id: 1,
    inicio: new Date(2021, 11, 17, 13).toISOString(),
    fim: new Date(2021, 11, 17, 14).toISOString()
  },
  {
    id: 2,
    inicio: new Date(2021, 11, 18, 14).toISOString(),
    fim: new Date(2021, 11, 18, 15).toISOString()
  },
  {
    id: 3,
    inicio: new Date(2021, 11, 19, 9).toISOString(),
    fim: new Date(2021, 11, 19, 10).toISOString()
  },
  {
    id: 4,
    inicio: new Date(2021, 11, 20, 13).toISOString(),
    fim: new Date(2021, 11, 20, 14).toISOString()
  },
  {
    id: 5,
    inicio: new Date(2021, 11, 21, 14).toISOString(),
    fim: new Date(2021, 11, 21, 15).toISOString()
  },
  {
    id: 6,
    inicio: new Date(2021, 11, 22, 8).toISOString(),
    fim: new Date(2021, 11, 22, 9).toISOString()
  }
]

describe('<AvailableDates />', () => {
  const onDelete = jest.fn()

  const excluirBoolean: boolean = false

  const elements = () => {
    return {
      date: screen.getAllByTestId('date'),
      time: screen.getAllByTestId('time'),
      button: excluirBoolean
        ? screen.getAllByRole('button', { name: /Excluir/i })
        : null
    }
  }

  it('should render message when no dates registered', () => {
    render(<AvailableDates dates={[]} onDelete={onDelete} />)
    expect(
      screen.getByText(
        'Não há marcações registadas, seleccione uma no calendário'
      )
    ).toBeInTheDocument()
  })

  it('should render the correct number of cards', () => {
    render(<AvailableDates dates={DATES} onDelete={onDelete} />)
    const cards = screen.getAllByTestId('slider-item')
    expect(cards.length).toBe(DATES.length)
  })

  it('should render de correct amount of data of the dates', () => {
    render(<AvailableDates dates={DATES} onDelete={onDelete} />)
    const { date, time, button } = elements()

    DATES.forEach((item, i) => {
      let localeDate = new Date(item.inicio).toLocaleDateString()
      let localeTime = new Date(item.inicio).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })

      expect(date[i].innerHTML).toBe(localeDate)
      expect(time[i].innerHTML).toBe(localeTime)
      if (excluirBoolean && button) {
        expect(button[i]).toBeInTheDocument()
      }
    })
  })

  if (excluirBoolean) {
    it('should call onDelete when clicking Excluir button', async () => {
      render(<AvailableDates dates={DATES} onDelete={onDelete} />)
      const { button } = elements()

      if (button) {
        await act(async () => {
          fireEvent.click(button[0])
        })

        await waitFor(async () => {
          expect(onDelete).toBeCalled()
        })
      }
    })
  }
})
