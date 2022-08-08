import React from 'react'
import Slider from 'react-slick'

import { DateTimeCard } from '../../atoms/DateTimeCard'

import * as S from './styles'

export type DateTimeElement = {
  dateTime: Date
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
  function defineSlidesToShow(size: number) {
    return schedules.length >= size ? size : schedules.length
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: defineSlidesToShow(7),
    slidesToScroll: defineSlidesToShow(7),
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: defineSlidesToShow(5),
          slidesToScroll: defineSlidesToShow(5)
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: defineSlidesToShow(6),
          slidesToScroll: defineSlidesToShow(6)
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: defineSlidesToShow(3),
          slidesToScroll: defineSlidesToShow(3)
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: defineSlidesToShow(2),
          slidesToScroll: defineSlidesToShow(2)
        }
      }
    ]
  }

  return (
    <S.Wrapper>
      <Slider className="slider" {...settings}>
        {schedules.map((schedule, index) => (
          <DateTimeCard key={index} dateTime={schedule.dateTime} />
        ))}
      </Slider>
    </S.Wrapper>
  )
}
