import React from 'react'
import Slider from 'react-slick'

import {
  ArrowIosBackOutline,
  ArrowIosForwardOutline
} from 'styled-icons/evaicons-outline'

import { Button } from '../../atoms/Button'
import * as S from './styles'
import { SlotResponseInterface } from '../../../services/agenda-services/agenda-service'

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

export type AvailableDatesProps = {
  dates: SlotResponseInterface[]
  onDelete: (id: number) => void
}

type DatesFormated = {
  id: number
  inicio: Date
  fim: Date
}

export function AvailableDates({ dates, onDelete }: AvailableDatesProps) {
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

  const sortDates = (a: DatesFormated, b: DatesFormated) => {
    return a.inicio.getTime() - b.inicio.getTime()
  }

  const datesFormated = dates
    .map((slot: SlotResponseInterface): DatesFormated => {
      return {
        id: slot.id,
        inicio: new Date(slot.inicio),
        fim: new Date(slot.fim)
      }
    })
    .sort(sortDates)

  return (
    <S.Wrapper>
      {datesFormated.length > 0 ? (
        <Slider className="slider" {...settings}>
          {datesFormated.map((item) => {
            return (
              <div
                className="slider-item"
                key={item.id}
                data-testid="slider-item"
              >
                <div className="avaliable-time">
                  <div className="date" data-testid="date">
                    {item.inicio.toLocaleDateString()}
                  </div>
                  <div className="time" data-testid="time">
                    {item.inicio.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  <Button
                    color="secondary"
                    radius="square"
                    size="medium"
                    className="delete"
                    onClick={() => onDelete(item.id)}
                  >
                    Excluir
                  </Button>
                </div>
              </div>
            )
          })}
        </Slider>
      ) : (
        <div className="no-dates-container">
          <div>Não há marcações registadas, seleccione uma no calendário</div>
        </div>
      )}
    </S.Wrapper>
  )
}
