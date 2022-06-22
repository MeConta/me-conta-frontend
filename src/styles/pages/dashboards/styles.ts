import styled, { css } from 'styled-components'

const screenBreakingPoint = '895px'

export const WrapperDashboard = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 70vh;
  width: 100%;
  max-width: 1360px;
  padding: 0 18px;
  margin: 4rem;
`

export const SectionTitle = styled.h1`
  ${({ theme }) => css`
    font-family: ${theme.font.family};
    font-weight: ${theme.font.semibold};
    font-size: 16px;
    margin: 27px 0;
  `}
`
export const NewUserCard = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    border-radius: 4px;
    font-family: ${theme.font.family};
    font-size: 16px;
    padding: 2rem 4rem;
    display: flex;
    justify-content: space-between;
    min-height: 240px;
    position: relative;
    overflow: hidden;

    @media (max-width: ${screenBreakingPoint}) {
      padding: 10px;
      justify-content: center;
      flex-direction: column;
      gap: 8rem;
    }
  `}
`
export const NewUserCardTitle = styled.h1`
  ${({ theme }) => css`
    font-style: normal;
    font-weight: 500;
    font-size: ${theme.font.sizes['desk-xxlarge']};
    line-height: 40px;
    letter-spacing: 0.2px;
    color: #333333;
    strong {
      font-weight: 800;
    }

    @media (max-width: ${screenBreakingPoint}) {
      text-align: center;
    }
  `}
`

export const NewUserCardContent = styled.div`
  ${() => css`
    display: inline-block;
    flex-direction: column;

    @media (max-width: ${screenBreakingPoint}) {
      text-align: center;
    }
  `}
`

export const NewUserCardIllustration = styled.div`
  width: 45%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;

  @media (max-width: ${screenBreakingPoint}) {
    display: none;
  }
`

export const IllustrationBackground = styled.div`
  ${({ theme }) => css`
    position: absolute;
    right: -15%;
    background: ${theme.colors.ceriseRed};
    width: 120%;
    height: 150%;
    clip-path: circle(80% at right);

    @media (max-width: ${screenBreakingPoint}) {
      height: 245px;
      width: 245px;
      right: auto;
      clip-path: none;
      border-radius: 50%;
    }
  `}
`

export const NewUserCardText = styled.p`
  ${() => css`
    margin-top: 20px;
    margin-bottom: 30px;
  `}
`

export const Title = styled.p`
  ${({ theme }) => css`
    font-weight: 900;
    font-size: ${theme.font.sizes['desk-xxlarge']};
    margin-bottom: ${theme.spacings.xsmall};
    line-height: 45px;
    color: #333333;
  `}
`
