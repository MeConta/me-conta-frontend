import styled, { css } from 'styled-components'
import { Hourglass } from '@styled-icons/fa-regular'

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

export const VolunteersGrid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: ${theme.spacings.small};

    width: 100%;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      grid-gap: ${theme.spacings.xxsmall};
    }
  `}
`

export const VolunteersCard = styled.div`
  ${({ theme }) => css`
    width: 100%;
    padding: ${theme.spacings.medium};
    background-color: ${theme.colors.white};
    border-radius: ${theme.border['card-radius']};
  `}
`

export const HourglassIcon = styled(Hourglass)`
  height: 2rem;
`

export const MessageContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: ${theme.spacings.xxsmall};
    text-align: center;
    color: ${theme.colors.gray};
    font-size: ${theme.font.sizes['desk-large']};
    width: 100%;
  `}
`
