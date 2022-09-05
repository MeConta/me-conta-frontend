import styled from 'styled-components'
import { Clock } from 'styled-icons/bootstrap'

export const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: 'Mulish', sans-serif;
  border: 1px solid #848a8c;
  border-radius: 4px;
  background: #ffffff;
  height: 115px;
  width: 140px;
  justify-content: center;

  p {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 10.64px;
    line-height: 16px;
    text-align: center;
    color: #848a8c;
  }

  h3 {
    font-family: 'Mulish';
    font-style: normal;
    font-weight: 700;
    font-size: 24.1492px;
    line-height: 30px;
    text-align: center;
    color: #040401;
  }

  @media screen and (max-width: 768px) {
    height: 80px;
    width: 90px;
    font-size: 8.64px;

    p {
      line-height: 10px;
    }
    h3 {
      font-size: 15px;
      line-height: 14px;
    }
  }

  @media screen and (max-width: 320px) {
    width: 120px;
    height: 105px;
    p {
      font-size: 12.64px;
    }
    h3 {
      font-size: 18px;
    }
  }
`

export const TimeWrapper = styled.div`
  align-items: center;
  display: flex;
`

export const HourIcon = styled(Clock)`
  color: #040401;
  width: 22px;
  height: 22px;
  border-radius: 100px;
  margin-right: 1rem;

  @media screen and (max-width: 768px) {
    width: 12px;
    height: 12px;
  }

  @media screen and (max-width: 320px) {
    width: 15.43px;
    height: 16.43px;
  }
`
export const DashedLine = styled.div`
  width: 76px;
  height: 0.5px;
  border-bottom: 1px dashed #efefef;
  margin: 8%;

  @media screen and (max-width: 768px) {
    width: 50px;
  }
`
