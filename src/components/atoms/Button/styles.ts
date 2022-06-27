import styled, { css, DefaultTheme } from 'styled-components'
import Animation from '../../../utils/animations/animation'
import { ButtonProps } from '.'

type WrapperProps = Pick<
  ButtonProps,
  | 'size'
  | 'color'
  | 'radius'
  | 'textTransform'
  | 'btnStyle'
  | 'isLoading'
  | 'fillOver'
  | 'fillOverDuration'
>

const wrapperModifiers = {
  small: (theme: DefaultTheme) => css`
    min-height: 1.5rem;
    font-size: ${theme.font.sizes['desk-large']};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xsmall};
  `,
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
      transition: filter 0.2s;
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
  `,
  fillOver: (duration: number) => css`
    ::before {
      content: '';
      background-color: rgba(0, 0, 0, 0.2);
      position: absolute;
      right: 100%;
      width: 100%;
      height: 100%;
      animation: slideIn ${duration}ms linear forwards;
      @keyframes slideIn {
        100% {
          right: 0;
        }
      }
    }
  `
}

const [fadeIn, fadeOut] = [
  Animation.absolute()
    .right({ initialPosition: '50px', finalPosition: '8px' })
    .setAnimation()
    .fadeIn(),
  Animation.absolute()
    .right({ initialPosition: '8px', finalPosition: '50px' })
    .setAnimation()
    .fadeOut()
]

export const Wrapper = styled.button<WrapperProps>`
  ${({
    theme,
    size,
    color,
    radius,
    disabled,
    textTransform,
    btnStyle,
    isLoading,
    fillOver,
    fillOverDuration
  }) => css`
    overflow-x: hidden;
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
    position: relative;
    > svg {
      width: ${theme.font.sizes['desk-large']};
      height: ${theme.font.sizes['desk-large']};
      margin-right: ${theme.spacings.xxxsmall};
    }
    > #loader {
      ${isLoading ? fadeIn : fadeOut}
    }

    ${!!size && wrapperModifiers[size](theme)};
    ${!!color && wrapperModifiers[color](theme)};
    ${!!radius && wrapperModifiers[radius](theme)};
    ${disabled && wrapperModifiers.disabled()};
    ${!!textTransform && wrapperModifiers[textTransform]};
    ${!!btnStyle && wrapperModifiers[btnStyle](theme)};
    ${fillOver && wrapperModifiers.fillOver(fillOverDuration!)};
  `}
`
export const TextWrapper = styled.div`
  position: relative;
`
