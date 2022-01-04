import moment from 'moment'
import * as S from './styles'

export type DayColumnProps = {
  times: Array<Date>
  onChange: (value: Date) => void
}

export default function DayColumn({ times, onChange }: DayColumnProps) {
  moment.locale('pt-BR')

  const dayOfWeek = moment(times[0]).format('ddd')
  const date = moment(times[0]).format('DD/MMM')

  return (
    <div className="day-column" data-testid={'dayColumn'}>
      <div className="day-box">
        <S.DayOfWeek>{dayOfWeek}</S.DayOfWeek>
        <S.Date>{date}</S.Date>
      </div>
      {times.map((time) => {
        return (
          <button
            className="time"
            key={time.toString()}
            onClick={() => onChange(time)}
          >
            {time.toLocaleTimeString('pt-br', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </button>
        )
      })}
    </div>
  )
}
