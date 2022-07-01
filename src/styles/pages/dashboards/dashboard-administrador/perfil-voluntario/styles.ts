import styled, { css } from 'styled-components'

const screenBreakingPoint = '895px'

type SectionDetailsProps = {
  width: string
}

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 9px;

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

export const SectionDetailsContainer = styled.section`
  display: flex;

  @media (max-width: ${screenBreakingPoint}) {
    flex-direction: column;
  }
`

export const SectionDetails = styled.div<SectionDetailsProps>`
  ${({ width }) => css`
    width: ${width};
  `}
`
