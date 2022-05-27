import styled, { css, DefaultTheme } from 'styled-components'
import Animation from '../../../utils/animations/animation'

type WrapperProps = { error: string | undefined; showPopover?: boolean }

const wrapperModifiers = {
  error: (theme: DefaultTheme) => css`
    ${InputWrapper} {
      border-color: ${theme.colors.ceriseRed};
    }

    ${Label} {
      color: ${theme.colors.ceriseRed};
    }
  `
}

const [fadeIn, fadeOut] = [
  Animation.normal().setAnimation('0.3s').fadeIn(),
  Animation.normal().setAnimation('0.3s').fadeOut()
]

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, error, showPopover }) => css`
    position: relative;
    margin-bottom: ${theme.spacings.xsmall};

    ${!!error && wrapperModifiers.error(theme)}
    > #popover {
      ${showPopover ? fadeIn : fadeOut}
    }
  `}
`

export const Label = styled.label`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes['desk-large']};
    font-weight: ${theme.font.bold};
    color: ${theme.colors.lightGray};

    &[aria-required='true']:after {
      content: ' *';
      color: ${theme.colors.ceriseRed};
    }
  `}
`

export const InputWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    border-radius: ${theme.border['btn-square-radius']};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xsmall};
    margin-top: ${theme.spacings.xgsmall};
    border: 0.1rem solid;
    border-color: ${theme.colors.lightGray};

    &:focus-within {
      box-shadow: 0 0 0.5rem ${theme.colors.cobalt};
    }
  `}
`

export const ExtraContentWrapper = styled.div<WrapperProps>`
  ${({ error }) => css`
    display: ${error ? 'flex' : 'flex-end'};
    justify-content: space-between;
    margin-top: 0.6rem;
    align-items: baseline;
  `}
`

export const Error = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.ceriseRed};
    display: block;
    font-size: ${theme.font.sizes['desk-xsmall']};
  `}
`
