import styled, { css, DefaultTheme } from 'styled-components'
import { RadioFieldProps } from '.'

type WrapperProps = Pick<RadioFieldProps, 'disabled' | 'display'> & {
  error?: boolean
}

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
  `,
  'two-columns': (theme: DefaultTheme) => css`
    display: grid;
    grid-template-columns: auto auto;
    margin-bottom: ${theme.spacings.large};
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
    font-weight: ${theme.font.bold};
    color: ${theme.colors.lightGray};
    padding-bottom: 2px;

    &[aria-required='true']:after {
      content: ' *';
      color: ${theme.colors.ceriseRed};
    }
  `}
`

export const RadioValue = styled.label`
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
    padding: 0 ${theme.spacings.xsmall};
  `}
`

export const RadioGroup = styled.fieldset<Pick<WrapperProps, 'display'>>`
  ${({ theme, display }) => css`
    margin-top: 0.8rem;
    border: none;

    ${!!display && wrapperModifiers[display](theme)}
  `}
`

export const Input = styled.input`
  ${() => css`
    height: 2rem;
  `}
`

export const Error = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.ceriseRed};
    font-size: ${theme.font.sizes['desk-xsmall']};
  `}
`
