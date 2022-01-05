import '../../../utils/tests/matchMedia.mock'

import React from 'react'
import { render, screen } from 'utils/tests/helpers'
import { AvaliableTimes } from './index'
import { fireEvent, waitFor } from '@testing-library/dom'
import { act } from '@testing-library/react'

const DATES = [
  {
    date: new Date(2021, 11, 17, 13),
    deletable: true
  },
  {
    date: new Date(2021, 11, 18, 14),
    deletable: false
  },
  {
    date: new Date(2021, 11, 19, 9),
    deletable: true
  },
  {
    date: new Date(2021, 11, 20, 13),
    deletable: true
  },
  {
    date: new Date(2021, 11, 21, 14),
    deletable: true
  },
  {
    date: new Date(2021, 11, 22, 8),
    deletable: true
  }
]

describe('<AvaliableTimes />', () => {
  const onDelete = jest.fn()

  beforeEach(() => {
    render(<AvaliableTimes dates={DATES} onDelete={onDelete} />)
  })

  const elements = () => {
    return {
      date: screen.getAllByTestId('date'),
      time: screen.getAllByTestId('time'),
      button: screen.getAllByRole('button', { name: /Excluir/i })
    }
  }

  it('deve renderizar o numero correto de cards', () => {
    const cards = screen.getAllByTestId('slider-item')
    expect(cards.length).toBe(DATES.length)
  })

  it('deve renderizar todos os elementos do card', () => {
    const { date, time, button } = elements()

    DATES.map((item, i) => {
      let localeDate = item.date.toLocaleDateString()
      let localeTime = item.date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })

      expect(date[i].innerHTML).toBe(localeDate)
      expect(time[i].innerHTML).toBe(localeTime)
      expect(button[i]).toBeInTheDocument()
    })
  })

  it('deve chamar o "onDelete" ao clicar no botao "Excluir"', async () => {
    const { button } = elements()

    await act(async () => {
      fireEvent.click(button[0])
    })

    await waitFor(async () => {
      expect(onDelete).toBeCalled()
    })
  })

  it('deve desabilitar o botao "Excluir" quando o item nao for deletavel', () => {
    const { button } = elements()
    expect(button[1]).toBeDisabled()
  })
})
