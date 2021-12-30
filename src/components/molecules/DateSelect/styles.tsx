import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;

  .select-a-time-main {
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    color: #5b5b5c;
    margin-bottom: 10px;
  }

  .select-a-time-highlight {
    color: #009ef7;
    font-weight: 700;
  }

  .date {
    display: flex;
    flex-direction: row;
    width: 432px;
  }

  .day-column {
    display: flex;
    flex-direction: column;
    margin-right: 8px;
    width: 110px;
  }

  .day-box {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 14px;
    line-height: 21px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  .time {
    border-radius: 4px;
    background-color: #009ef7;
    margin-bottom: 5px;
    width: 102px;
    height: 32px;
    font-size: 12px;
    line-height: 32px;
    font-weight: 600;
    text-align: center;
    color: #ffffff;
    border: 0;
  }

  .show-more {
    margin-top: 29px;
    font-size: 14px;
    line-height: 21px;
    font-weight: 700;
    display: flex;
  }

  .downward {
    width: 12.61px;
    height: 7.54px;
    margin-left: 6.5px;
  }
`
