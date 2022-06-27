import styled, { css } from 'styled-components'

type ButtonProps = {
  active: boolean
}

export const WrapperFilter = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    gap: ${theme.spacings.xsmall};
    text-align: center;
    width: 100%;
    overflow: auto;
  `}
`
export const ButtonFilter = styled.button<ButtonProps>`
  ${({ theme, active }) => css`
    color: ${active ? 'white' : theme.colors.cornflowerBlue};
    background-color: ${active ? theme.colors.cornflowerBlue : 'transparent'};
    border: 0;
    font-size: ${theme.font.sizes['desk-large']};
    font-weight: ${theme.font.bold};
    font-family: ${theme.font.family};
    padding: 1rem 2rem;
    border-radius: ${theme.border['btn-square-radius']};
    white-space: nowrap;

    &:hover {
      background-color: ${active
        ? theme.colors.cobalt
        : theme.colors.xlightGray};
    }
  `}
`
