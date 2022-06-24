import styled, { css } from 'styled-components'

type TagProps = {
  color: string
  backgroundColor: string
}

export const WrapperTag = styled.div<TagProps>`
  ${({ theme, color, backgroundColor }) => css`
    display: flex;
    flex-direction: row;
    gap: ${theme.spacings.xsmall};
    text-align: center;
    justify-content: center;
    overflow: auto;

    color: ${color ? color : 'white'};
    background-color: ${backgroundColor ? backgroundColor : 'white'};
    border-radius: 4px;
    padding: 4px 16px;
    display: inline-block;
  `}
`
export const TextTag = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes['desk-large']};
    font-weight: ${theme.font.extrabold};
    font-family: ${theme.font.family};
    letter-spacing: 1px;
  `}
`
