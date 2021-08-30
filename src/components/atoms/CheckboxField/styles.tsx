import styled, { css, DefaultTheme } from 'styled-components'
import { CheckboxFieldProps } from '.'

type WrapperProps = Pick<CheckboxFieldProps, 'disabled'> & { error?: boolean }

const wrapperModifiers = {
  error: (theme: DefaultTheme) => css`
    ${InputWrapper} {
      border-color: ${theme.colors.ceriseRed};
    }

    ${Label} {
      color: ${theme.colors.ceriseRed};
    }
  `,
  disabled: (theme: DefaultTheme) => css`
    ${Label},
    ${Input} {
      cursor: not-allowed;
      color: ${theme.colors.gray};

      &::placeholder {
        color: currentColor;
      }
    }
  `
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, error, disabled }) => css`
    margin-bottom: ${theme.spacings.xsmall};

    ${error && wrapperModifiers.error(theme)}
    ${disabled && wrapperModifiers.disabled(theme)}
  `}
`

export const Label = styled.label`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes['desk-large']};
    font-weight: ${theme.font.light};
    color: ${theme.colors.lightGray};
    margin-left: ${theme.spacings.xxsmall};
  `}
`

export const InputWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    vertical-align: center;
    align-items: center;
    border-radius: ${theme.border['btn-square-radius']};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xsmall};
    margin-top: ${theme.spacings.xxsmall};
  `}
`

export const Error = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.ceriseRed};
    font-size: ${theme.font.sizes['desk-xsmall']};
  `}
`

export const Input = styled.input`
  ${({ theme }) => css`
    height: 2rem;
  `}
`
