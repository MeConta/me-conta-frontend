import styled from 'styled-components'

export const Wrapper = styled.section`
  display: flex;
  width: 1328px;
  height: 294px;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    width: 100%;
  }
`

export const DateWrapper = styled.div`
  box-sizing: border-box;
  padding: 30px 92px;

  @media (max-width: 768px) {
    padding: 0;
  }
`
