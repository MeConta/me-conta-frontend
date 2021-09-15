import { TeamMemberCard } from '../../atoms/TeamMemberCard'
import React from 'react'
import Slider from 'react-slick'

import * as S from './styles'

export type CarouselProps = {
  teamMembers: Array<TeamMember>
  unoptimizedImage?: boolean
}

export interface TeamMember {
  imageSrc?: StaticImageData
  imageAlt?: string
  name: string
  title: string
}

export function Carousel({
  teamMembers,
  unoptimizedImage = false
}: CarouselProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
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
        {teamMembers.map((attendee) => (
          <TeamMemberCard
            key={attendee.name}
            imageSrc={attendee.imageSrc}
            imageAlt={attendee.imageAlt}
            name={attendee.name}
            title={attendee.title}
            unoptimizedImage={unoptimizedImage}
          />
        ))}
      </Slider>
    </S.Wrapper>
  )
}
