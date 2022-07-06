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
    flex-direction: column-reverse;
    align-items: start;
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

  @media (max-width: ${screenBreakingPoint}) {
    padding: 0;
    margin: 0;
    max-width: 90%;
  }
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

    @media (max-width: ${screenBreakingPoint}) {
      width: 100%;
    }
  `}
`
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 4rem;

  @media (max-width: ${screenBreakingPoint}) {
    flex-direction: column;
    gap: 16px;
  }
`
