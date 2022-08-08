import styled, { css } from 'styled-components'

const screenBreakingPoint = '895px'

export const BannerContent = styled.div`
  ${() => css`
    display: inline-block;
    flex-direction: column;
    margin-top: 10px;
    @media (max-width: ${screenBreakingPoint}) {
      text-align: center;
    }
  `}
`

export const BannerTitle = styled.h1`
  ${({ theme }) => css`
    font-weight: 500;
    font-size: ${theme.font.sizes['desk-xxlarge']};
    line-height: 40px;
    letter-spacing: 0.2px;
    color: #333333;
    strong {
      font-weight: 900;
    }

    @media (max-width: ${screenBreakingPoint}) {
      text-align: center;
    }
  `}
`

export const BannerText = styled.p`
  ${({ theme }) => css`
    margin-top: 20px;
    margin-bottom: 30px;
    font-style: normal;
    font-size: 20px;
    line-height: 31.5px;
    letter-spacing: 0.2px;
    font-weight: ${theme.font.light};

    strong {
      font-weight: 700;
    }
  `}
`
