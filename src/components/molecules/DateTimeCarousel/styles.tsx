import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ArrowBackIos, ArrowForwardIos } from 'styled-icons/material'

import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .slider {
    width: 70%;
  }

  .slick-initialized .slick-slide {
    display: flex;
    justify-content: center;
  }
`

export const ArrowWrapper = styled.div`
  ::before {
    content: none;
  }
`

export const BackArrow = styled(ArrowBackIos)`
  width: 22px;
  height: 22px;
  color: #040401;
`

export const NextArrow = styled(ArrowForwardIos)`
  width: 22px;
  height: 22px;
  color: #040401;
`
