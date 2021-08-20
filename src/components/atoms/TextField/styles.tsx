import styled, { css, DefaultTheme } from 'styled-components'
import { TextInputProps } from '.'

type WrapperProps = Pick<TextInputProps, 'disabled'> & { error?: boolean }

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
    align-items: center;
    border-radius: ${theme.border['btn-square-radius']};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xsmall};
    margin-top: ${theme.spacings.xxsmall};
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
    font-size: ${theme.font.sizes['desk-xsmall']};
  `}
`

export const Input = styled.input`
  ${({ theme }) => css`
    color: ${theme.colors.black};
    font-family: ${theme.font.family};
    font-size: ${theme.font.sizes['desk-large']};
    padding: 0.5rem 0;
    background: transparent;
    border: 0;
    outline: none;
    width: 100%;
  `}
`
