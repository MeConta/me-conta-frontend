import React from 'react'
import Slider from 'react-slick'
import { DateInfo } from './dateInfo'

import {
  ArrowIosBackOutline,
  ArrowIosForwardOutline,
  ArrowIosDownwardOutline
} from 'styled-icons/evaicons-outline'

import * as S from './styles'

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
  onChange: (value: string) => void
}

function DayColumn({ times, onChange }: DayColumnProps) {
  return (
    <div className="day-column">
      <div className="day-box">
        <span>{times[0].toLocaleString('pt-BR', { weekday: 'short' })}</span>
        <span>
          {times[0].toLocaleString('pt-BR', { day: 'numeric', month: 'short' })}
        </span>
      </div>
      {times.map((time) => {
        return (
          <button className="time" key={time.toString()}>
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

export type DateSelectProps = {
  onChange: (value: string) => void
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
        {DateInfo.map((item, index) => (
          <DayColumn times={item} onChange={onChange} key={index} />
        ))}
      </Slider>
      <span className="show-more">
        MOSTRAR MAIS HORÁRIOS <ArrowIosDownwardOutline className="downward" />
      </span>
    </S.Wrapper>
  )
}
