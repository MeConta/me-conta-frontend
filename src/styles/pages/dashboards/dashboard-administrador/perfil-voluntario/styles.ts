import styled from 'styled-components'

const screenBreakingPoint = '895px'

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-leftt: 9px;

  button {
    padding: 0;
  }

  @media (max-width: ${screenBreakingPoint}) {
    display: block;
    text-align: center;
  }
`
export const ContentWrapper = styled.div`
  max-width: 80%;
  width: 80rem;
  display: flex;
  flex-direction: column;
  min-height: 70vh;
  padding: 0 18px;
  margin: 4rem;
`
