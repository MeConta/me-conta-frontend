import styled, { css } from 'styled-components'

export const SectionContainer = styled.div`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacings.large};
  `}
`

export const Title = styled.p`
  ${({ theme }) => css`
    font-weight: 400;
    font-size: ${theme.font.sizes['desk-large']};
    margin-bottom: ${theme.spacings.xsmall};
  `}
`

export const VolunteersCard = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: space-around;
    width: 100%;
    padding: ${theme.spacings.medium};
    background-color: ${theme.colors.white};
    border-radius: ${theme.border['card-radius']};
    text-align: center;
  `}
`
