import React from 'react'
import Slider from 'react-slick'

import { DateTimeCard } from '../../atoms/DateTimeCard'

import * as S from './styles'

export type DateTimeElement = {
  date: string
  time: string
}

export type DateTimeCarouselProps = {
  schedules: Array<DateTimeElement>
}

function SampleNextArrow(props: any) {
  const { className, onClick } = props
  return (
    <S.ArrowWrapper className={className} onClick={onClick}>
      <S.NextArrow />
    </S.ArrowWrapper>
  )
}

function SamplePrevArrow(props: any) {
  const { className, onClick } = props
  return (
    <S.ArrowWrapper className={className} onClick={onClick}>
      <S.BackArrow />
    </S.ArrowWrapper>
  )
}

export function DateTimeCarousel({ schedules = [] }: DateTimeCarouselProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <S.Wrapper>
      <Slider className="slider" {...settings}>
        {schedules.map((schedule, index) => (
          <DateTimeCard key={index} date={schedule.date} time={schedule.time} />
        ))}
      </Slider>
    </S.Wrapper>
  )
}
