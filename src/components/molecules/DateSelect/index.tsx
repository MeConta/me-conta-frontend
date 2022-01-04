import React from 'react'
import Slider from 'react-slick'

import {
  ArrowIosBackOutline,
  ArrowIosForwardOutline
} from 'styled-icons/evaicons-outline'
import DayColumn from './DayColumn'

import * as S from './styles'

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props
  return (
    <ArrowIosForwardOutline
      className={className}
      onClick={onClick}
      style={{ ...style, display: 'block', color: 'black' }}
      aria-label="ir para a próxima página"
      aria-hidden={false}
      role="button"
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
      aria-label="ir para página anterior"
      aria-hidden={false}
      role="button"
    />
  )
}

export type DateSelectProps = {
  onChange: (value: Date) => void
  availabilty: Date[][]
}

export function DateSelect({ onChange, availabilty }: DateSelectProps) {
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
        {availabilty.map((times, index) => (
          <DayColumn times={times} onChange={onChange} key={index} />
        ))}
      </Slider>
    </S.Wrapper>
  )
}
