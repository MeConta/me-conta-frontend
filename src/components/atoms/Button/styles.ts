import styled, { css, DefaultTheme } from 'styled-components'
import { ButtonProps } from '.'

type WrapperProps = Pick<
  ButtonProps,
  'size' | 'color' | 'radius' | 'textTransform' | 'btnStyle'
>

const wrapperModifiers = {
  medium: (theme: DefaultTheme) => css`
    min-height: 3rem;
    font-size: ${theme.font.sizes['desk-medium']};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.medium};
  `,
  large: (theme: DefaultTheme) => css`
    min-height: 5rem;
    font-size: ${theme.font.sizes['desk-xlarge']};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xlarge};
  `,
  mediumLarge: (theme: DefaultTheme) => css`
    min-height: 6rem;
    font-size: ${theme.font.sizes['desk-glarge']};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.medium};
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
      background-color: ${theme.colors.venetianRed};
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
  `,
  disabled: () => css`
    &:disabled {
      cursor: not-allowed;
      filter: saturate(30%);
    }
  `,
  uppercase: () => css`
    text-transform: uppercase;
  `,
  link: (theme: DefaultTheme) => css`
    background-color: transparent;
    color: ${theme.colors.venetianRed};
    font-size: 1.5rem;
    text-decoration: underline;
    &:hover {
      background-color: transparent;
    }
  `
}

export const Wrapper = styled.button<WrapperProps>`
  ${({ theme, size, color, radius, disabled, textTransform, btnStyle }) => css`
    align-items: center;
    border: 0;
    color: ${theme.colors.white};
    display: inline-flex;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;
    text-align: center;
    font-family: Mulish;
    font-weight: ${theme.font.bold};
    > svg {
      width: ${theme.font.sizes['desk-large']};
      height: ${theme.font.sizes['desk-large']};
      margin-right: ${theme.spacings.xxxsmall};
    }

    ${!!size && wrapperModifiers[size](theme)};
    ${!!color && wrapperModifiers[color](theme)};
    ${!!radius && wrapperModifiers[radius](theme)};
    ${disabled && wrapperModifiers.disabled};
    ${!!textTransform && wrapperModifiers[textTransform]}
    ${!!btnStyle && wrapperModifiers[btnStyle](theme)}
  `}
`
