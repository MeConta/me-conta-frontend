import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    .card {
      display: flex;
      background-color: ${theme.colors.white};
      border-radius: ${theme.border['card-radius']};
      padding: ${theme.spacings.small};
    }

    .card-header {
      font-weight: ${theme.font.bold};
      font-size: ${theme.font.sizes['desk-large']};
      margin-bottom: ${theme.spacings.xsmall};
    }

    .select-day-container {
      margin-right: ${theme.spacings.large};
    }

    .select-time-container {
      width: 100%;
    }

    .slots {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }

    .slot {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      width: calc(25% - ${theme.spacings.xxsmall});
      margin: 0 ${theme.spacings.xxsmall} ${theme.spacings.xxsmall} 0;
      padding: 0 ${theme.spacings.xxsmall};
      border-radius: 4px;
      background: ${theme.colors.ceriseRed};
      color: white;
      height: 32px;
    }

    .slot-time {
      font-weight: bold;
    }

    .delete {
      display: inline-block;
      border-radius: 50%;
      border: none;
      width: 20px;
      height: 20px;
      padding: 2px;
      background: ${theme.colors.maroonFlush};
      color: ${theme.colors.white};
      text-align: center;
    }

    .select-field {
      display: inline-block;
      height: 32px;
      color: ${theme.colors.black};
      background: transparent;
      outline: none;
      width: calc(25% - ${theme.spacings.xxsmall});
      border: 1px solid ${theme.colors.xlightGray};
      border-radius: 4px;
      margin: 0 ${theme.spacings.xxsmall} ${theme.spacings.xxsmall} 0;
      padding: 0 3px;
    }

    .save {
      display: block;
      margin: ${theme.spacings.xsmall} 0 ${theme.spacings.xsmall} auto;
    }

    @media (max-width: 1024px) {
      .slot {
        width: calc(33.3% - ${theme.spacings.xxsmall});
      }

      .select-field {
        width: calc(33.3% - ${theme.spacings.xxsmall});
      }
    }

    @media (max-width: 834px) {
      .slot {
        width: calc(50% - ${theme.spacings.xxsmall});
      }

      .select-field {
        width: calc(50% - ${theme.spacings.xxsmall});
      }
    }

    @media (max-width: 690px) {
      .slot {
        width: 100%;
      }

      .select-field {
        width: 100%;
      }
    }

    @media (max-width: 520px) {
      .card {
        flex-direction: column;
      }
    }
  `}
`
