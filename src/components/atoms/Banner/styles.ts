import styled, { css } from 'styled-components'

const screenBreakingPoint = '895px'

export const WrapperDashboard = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 70vh;
  width: 100%;
  max-width: 1360px;
  padding: 0 18px;
  @media (max-width: ${screenBreakingPoint}) {
    margin: 0;
  }
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

export const NewUserCardIllustration = styled.div`
  width: 45%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  padding-left: 64px;
  /* flex-shrink: 0; */

  @media (max-width: ${screenBreakingPoint}) {
    display: none;
  }
`

export const IllustrationBackground = styled.div`
  ${({ theme }) => css`
    position: absolute;
    right: -20%;
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

export const SectionContainer = styled.div`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacings.large};
  `}
`
