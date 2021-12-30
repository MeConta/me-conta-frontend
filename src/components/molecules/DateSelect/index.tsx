import React from 'react'
import Slider from 'react-slick'
import { DateInfo } from './dateInfo'

import {
  ArrowIosBackOutline,
  ArrowIosForwardOutline,
  ArrowIosDownwardOutline
} from 'styled-icons/evaicons-outline'

import * as S from './styles'
import moment from 'moment'

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props
  return (
    <ArrowIosForwardOutline
      className={className}
      onClick={onClick}
      style={{ ...style, display: 'block', color: 'black' }}
    />
  )
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props
  return (
    <ArrowIosBackOutline
      className={className}
      style={{ ...style, display: 'block', color: 'black' }}
      onClick={onClick}
    />
  )
}

export type DayColumnProps = {
  times: Array<Date>
  day: Date
  onChange: (value: Date) => void
}

function DayColumn({ times, onChange }: DayColumnProps) {
  moment.locale('pt-BR')

  const dayOfWeek = moment(times[0]).format('ddd')
  const date = moment(times[0]).format('DD/MMM')

  return (
    <div className="day-column">
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
      {times.length < 1 && (
        <button className="time" disabled>
          --
        </button>
      )}
    </div>
  )
}

export type DateSelectProps = {
  onChange: (value: Date) => void
}

export function DateSelect({ onChange }: DateSelectProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    adaptiveHeight: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  }

  return (
    <S.Wrapper>
      <span className="select-a-time-main">
        Selecione um{' '}
        <span className="select-a-time-highlight">horário disponível</span>
      </span>
      <Slider className="date" {...settings}>
        {DateInfo.map(({ day, times }, index) => (
          <DayColumn times={times} day={day} onChange={onChange} key={index} />
        ))}
      </Slider>
      <span className="show-more">
        MOSTRAR MAIS HORÁRIOS <ArrowIosDownwardOutline className="downward" />
      </span>
    </S.Wrapper>
  )
}
