import styled, { css, DefaultTheme } from 'styled-components'

export const WrapperFields = styled.section`
  display: flex;
  max-width: 80%;
  justify-content: center;
  flex-direction: column;
  @media only screen and (min-width: 1440px) {
    width: 1280px;
  }
`

export const Header = styled.p`
  ${({ theme }) => css`
    justify-content: center;
    display: flex;
    padding-bottom: 1rem;
    color: ${theme.colors.lightGray};
    font-size: ${theme.font.sizes['desk-xlarge']};
    font-style: ${theme.font.light};
  `}
`

export const Subtitle = styled.p`
  ${({ theme }) => css`
    justify-content: center;
    display: flex;
    padding-bottom: 1rem;
    color: ${theme.colors.lightGray};
    font-size: ${theme.font.sizes['desk-large']};
    font-style: ${theme.font.light};
  `}
`
