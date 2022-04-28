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

type ButtonProps = {
  size?: 'desk-large' | 'desk-xlarge'
  margin?: 'xsmall'
  color?: 'lightGray' | 'black'
}

export const BoldParagraph = styled.b`
  ${({ theme }) => css`
    font-weight: ${theme.font.bold};
  `}
`

export const Paragraph = styled.p<
  Pick<ButtonProps, 'size' | 'margin' | 'color'>
>`
  ${({ theme, size, margin, color }) => css`
    text-align: center;
    padding: 1rem;
    color: ${theme.colors[color ?? 'lightGray']};
    margin: ${margin ? theme.spacings[margin] : theme.zero};
    font-size: ${theme.font.sizes[size ?? 'desk-large']};
    font-weight: ${theme.font.normal};
  `}
`

export const Header = styled.p`
  ${({ theme }) => css`
    justify-content: center;
    text-align: center;
    display: flex;
    padding: 1rem;
    color: ${theme.colors.lightGray};
    font-size: ${theme.font.sizes['desk-xlarge']};
    font-style: ${theme.font.light};
  `}
`

export const Subtitle = styled.p`
  ${({ theme }) => css`
    justify-content: center;
    text-align: center;
    display: flex;
    padding-bottom: 1rem;
    color: ${theme.colors.lightGray};
    font-size: ${theme.font.sizes['desk-large']};
    font-style: ${theme.font.light};
  `}
`

export const Footer = styled.div`
  ${({ theme }) => css`
    justify-content: center;
    text-align: left;
    margin: 1rem;
    color: ${theme.colors.lightGray};
    font-size: ${theme.font.sizes['desk-large']};
    font-style: ${theme.font.light};
  `}
`
