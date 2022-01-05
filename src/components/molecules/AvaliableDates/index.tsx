import React from 'react'
import Slider from 'react-slick'

import {
  ArrowIosBackOutline,
  ArrowIosForwardOutline
} from 'styled-icons/evaicons-outline'

import { Button } from '../../atoms/Button'
import * as S from './styles'

function PrevArrow(props: any) {
  const { className, style, onClick } = props
  return (
    <ArrowIosBackOutline
      className={className}
      style={{ ...style, display: 'block', color: 'black' }}
      onClick={onClick}
    />
  )
}

function NextArrow(props: any) {
  const { className, style, onClick } = props
  return (
    <ArrowIosForwardOutline
      className={className}
      onClick={onClick}
      style={{ ...style, display: 'block', color: 'black' }}
    />
  )
}

export type DateType = {
  date: Date
  deletable: Boolean
}

export type AvaliableTimesProps = {
  dates: DateType[]
  onDelete: (date: Date) => void
}

export function AvaliableTimes({ dates, onDelete }: AvaliableTimesProps) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 762,
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
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  }

  return (
    <S.Wrapper>
      <Slider className="slider" {...settings}>
        {dates.map((item, i) => {
          return (
            <div className="slider-item" key={i} data-testid="slider-item">
              <div className="avaliable-time">
                <div className="date" data-testid="date">
                  {item.date.toLocaleDateString()}
                </div>
                <div className="time" data-testid="time">
                  {item.date.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <Button
                  color="secondary"
                  radius="square"
                  size="medium"
                  className="delete"
                  disabled={!item.deletable}
                  onClick={() => onDelete(item.date)}
                >
                  Excluir
                </Button>
              </div>
            </div>
          )
        })}
      </Slider>
    </S.Wrapper>
  )
}
