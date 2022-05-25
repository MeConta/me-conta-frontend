import styled, { css, DefaultTheme } from 'styled-components'
import { animation } from 'utils/animations/unmountHelper'

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

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, error, showPopover }) => css`
    position: relative;
    margin-bottom: ${theme.spacings.xsmall};

    ${!!error && wrapperModifiers.error(theme)}
    > #popover {
      ${showPopover
        ? animation['fadeIn']({ duration: '0.3s' })
        : animation['fadeOut']({ duration: '0.3s' })};
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

export const Error = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.ceriseRed};
    display: block;
    font-size: ${theme.font.sizes['desk-xsmall']};
    margin-top: 1rem;
  `}
`
