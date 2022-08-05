import * as S from './styles'
import { HourIcon, DashedLine } from './styles'
import { useState, useEffect } from 'react'

export type DateTimeCardProps = {
  dateTime: Date
}

const WINDOW_BREAKPOINT = 768
const LOCALE = 'pt-br'

export function DateTimeCard({ dateTime }: DateTimeCardProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (window.screen.width <= WINDOW_BREAKPOINT) {
      setIsMobile(true)
    }
  }, [])

  function formatedDate() {
    if (isMobile) {
      return dateTime.toLocaleDateString(LOCALE, {
        timeZone: 'America/Sao_Paulo'
      })
    } else {
      return `${dateTime.toLocaleString(LOCALE, {
        day: 'numeric',
        timeZone: 'America/Sao_Paulo'
      })} de ${dateTime.toLocaleString(LOCALE, {
        month: 'long',
        timeZone: 'America/Sao_Paulo'
      })} de ${dateTime.toLocaleString(LOCALE, {
        year: 'numeric',
        timeZone: 'America/Sao_Paulo'
      })}`
    }
  }

  function formatedTime() {
    return (
      dateTime
        .toLocaleString(LOCALE, {
          hour: 'numeric',
          timeZone: 'America/Sao_Paulo'
        })
        .padStart(2, '0') +
      ':' +
      dateTime
        .toLocaleString(LOCALE, {
          minute: 'numeric',
          timeZone: 'America/Sao_Paulo'
        })
        .padStart(2, '0')
    )
  }

  return (
    <S.Wrapper>
      <p>{formatedDate()}</p>
      <DashedLine />
      <S.TimeWrapper>
        <HourIcon />
        <h3>{formatedTime()}</h3>
      </S.TimeWrapper>
    </S.Wrapper>
  )
}
