import styled, { css } from 'styled-components'

export const WrapperFields = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 ${(p) => p.theme.spacings.xmsmall};
  width: 100%;
`
export const Form = styled.form`
  width: 100%;
`

export const ButtonContainer = styled.div<{ marginTop?: string }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(p) => p.marginTop && { marginTop: p.marginTop }}
  button {
    width: 100%;
  }
`

export type TextProps = {
  size?: 'desk-large' | 'desk-xlarge' | 'desk-xxlarge'
  margin?: 'xsmall'
  color?: 'lightGray' | 'black' | 'ceriseRed' | 'mineShaft' | 'cornflowerBlue'
  weight?: 'bold'
}

export const BoldParagraph = styled.b`
  ${({ theme }) => css`
    font-weight: ${theme.font.bold};
  `}
`

type ParagraphProps = Pick<TextProps, 'size' | 'margin' | 'color' | 'weight'>

export const ParagraphContainer = styled.div<ParagraphProps>`
  width: 100%;
  text-align: center;
  color: ${(p) => p.theme.colors[p.color ?? 'lightGray']};
  margin: ${(p) => (p.margin ? p.theme.spacings[p.margin] : p.theme.zero)};
  font-size: ${(p) => p.theme.font.sizes[p.size ?? 'desk-large']};
  font-weight: ${(p) => p.weight ?? p.theme.font.normal};
`

export const Paragraph = styled.p<ParagraphProps>`
  ${({ theme, size, margin, color, weight }) => css`
    text-align: center;
    padding: 1rem;
    color: ${theme.colors[color ?? 'lightGray']};
    margin: ${margin ? theme.spacings[margin] : theme.zero};
    font-size: ${theme.font.sizes[size ?? 'desk-large']};
    font-weight: ${weight ?? theme.font.normal};
  `}
`

export const BulletMenu = styled.ul<Pick<TextProps, 'color'>>`
  ${({ theme, color }) => css`
    color: ${theme.colors[color ?? 'lightGray']};
    & > li {
      list-style: inside;
    }
  `}
`

export const AnchorLink = styled.a<Pick<TextProps, 'color'>>`
  ${({ theme, color }) => css`
    color: ${theme.colors[color ?? 'lightGray']};
    cursor: pointer;
    text-decoration: underline;
    &:visited {
      color: ${theme.colors[color ?? 'lightGray']};
    }
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
