import styled, { css, DefaultTheme } from 'styled-components'
import { ButtonProps } from '.'

type WrapperProps = Pick<ButtonProps, 'size' | 'color' | 'radius'>

const wrapperModifiers = {
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
  `,
  negative: (theme: DefaultTheme) => css`
    background: ${theme.colors.white};
    color: ${theme.colors.ceriseRed};
    border: 1px solid ${theme.colors.ceriseRed};

    &:hover {
      color: ${theme.colors.maroonFlush};
      transition: color 0.2s;
    }
  `,
  round: (theme: DefaultTheme) => css`
    border-radius: ${theme.border['btn-round-radius']};
  `,
  square: (theme: DefaultTheme) => css`
    border-radius: ${theme.border['btn-square-radius']};
  `
}

export const Wrapper = styled.button<WrapperProps>`
  ${({ theme, size, color, radius }) => css`
    align-items: center;
    border: 0;
    color: ${theme.colors.white};
    display: inline-flex;
    justify-content: center;
    text-decoration: none;

    ${!!size && wrapperModifiers[size](theme)};
    ${!!color && wrapperModifiers[color](theme)};
    ${!!radius && wrapperModifiers[radius](theme)};
  `}
`
