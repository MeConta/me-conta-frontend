import styled, { css, DefaultTheme } from 'styled-components'
import { Props } from '.'

type ButtonProps = Pick<Props, 'size' | 'color'>

const buttonModifiers = {
  medium: (theme: DefaultTheme) => css`
    height: 3rem;
    font-size: ${theme.font.sizes['desk-medium']};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.medium};
  `,
  large: (theme: DefaultTheme) => css`
    height: 5rem;
    font-size: ${theme.font.sizes['desk-xlarge']};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xlarge};
  `,
  primary: (theme: DefaultTheme) => css`
    background: ${theme.colors.cornflowerBlue};

    &:hover {
      background-color: ${theme.colors.cobalt};
      transition: background-color 0.2s;
    }
  `,
  secondary: (theme: DefaultTheme) => css`
    background: ${theme.colors.ceriseRed};

    &:hover {
      background-color: ${theme.colors.maroonFlush};
      transition: background-color 0.2s;
    }
  `
}

export const Button = styled.button<ButtonProps>`
  ${({ theme, size, color }) => css`
    align-items: center;
    border: 0;
    border-radius: ${theme.border['btn-radius']};
    color: ${theme.colors.white};
    display: inline-flex;
    justify-content: center;
    text-decoration: none;

    ${!!size && buttonModifiers[size](theme)};
    ${!!color && buttonModifiers[color](theme)};
  `}
`
