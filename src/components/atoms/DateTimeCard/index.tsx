import * as S from './styles'
import { HourIcon, DashedLine } from './styles'

export type DateTimeCardProps = {
  date: string
  time: string
}

export function DateTimeCard({ date, time }: DateTimeCardProps) {
  return (
    <S.Wrapper>
      <p>{date}</p>
      <DashedLine />
      <S.TimeWrapper>
        <HourIcon />
        <h3>{time}</h3>
      </S.TimeWrapper>
    </S.Wrapper>
  )
}
