import styled, { css } from 'styled-components'

export const WrapperDashboard = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    min-height: 70vh;
    width: 100%;
    max-width: 1360px;
    padding: 0 18px;
  `}
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
    padding: 20px;
    display: flex;
    min-height: 240px;
    position: relative;
    overflow: hidden;
  `}
`
export const NewUserCardTitle = styled.h1`
  ${({ theme }) => css`
    font-style: normal;
    font-weight: 500;
    font-size: ${theme.font.sizes['desk-xxlarge']};
    line-height: 40px;
    display: flex;
    align-items: center;
    letter-spacing: 0.2px;
    color: #333333;
    strong {
      font-weight: 800;
    }
  `}
`

export const NewUserCardContent = styled.div`
  ${() => css`
    display: inline-block;
    flex-direction: column;
  `}
`

export const NewUserCardIllustration = styled.div`
  ${() => css`
    position: absolute;
    right: -25%;
    top: 50%;
    transform: translate(-50%, -50%);
  `}
`
export const NewUserCardText = styled.p`
  ${() => css`
    margin-top: 20px;
    margin-bottom: 30px;
  `}
`
