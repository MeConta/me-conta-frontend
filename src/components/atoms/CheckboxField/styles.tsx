import styled, { css, DefaultTheme } from 'styled-components'
import { CheckboxFieldProps } from '.'

type WrapperProps = Pick<CheckboxFieldProps, 'disabled' | 'margin'>

const wrapperModifiers = {
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
  ${({ theme, disabled, margin }) => css`
    margin: ${margin === 'zero'
        ? theme.zero
        : theme.spacings[margin ?? 'xsmall']}
      0;

    ${disabled && wrapperModifiers.disabled(theme)}
  `}
`

export const Label = styled.label`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes['desk-large']};
    font-weight: ${theme.font.light};
    color: ${theme.colors.lightGray};
    margin-left: ${theme.spacings.xxsmall};

    &[aria-required='true']:after {
      content: ' *';
      color: ${theme.colors.ceriseRed};
    }
  `}
`

export const InputWrapper = styled.div<WrapperProps>`
  ${({ theme }) => css`
    display: flex;
    vertical-align: center;
    align-items: center;
    border-radius: ${theme.border['btn-square-radius']};
    padding: ${theme.zero} ${theme.spacings.xsmall};
  `}
`

export const Error = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.ceriseRed};
    font-size: ${theme.font.sizes['desk-xsmall']};
  `}
`

export const Input = styled.input`
  ${() => css`
    height: 2 rem;
  `}
`
