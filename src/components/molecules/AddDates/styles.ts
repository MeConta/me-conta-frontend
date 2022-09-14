import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    margin: 8px;
    width: 60%;
    padding: ${theme.spacings.xgsmall};

    .card {
      display: flex;
      background-color: ${theme.colors.white};
      border-radius: ${theme.border['card-radius']};
      padding: ${theme.spacings.large} ${theme.spacings.small};
      justify-content: space-around;
    }

    .card-header {
      font-weight: ${theme.font.bold};
      font-size: ${theme.font.sizes['desk-xxlarge']};
      margin-bottom: ${theme.spacings.gsmall};
    }

    .select-time-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      > div {
        width: 100%;
      }

      > div > button {
        width: 100%;
        height: 4rem;
        font-size: 1.5rem;
        font-weight: 750;
      }
    }

    .slots {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-row-gap: ${theme.spacings.xmsmall};
      grid-column-gap: ${theme.spacings.xxsmall};
      margin-top: ${theme.spacings.small};
    }

    .slot {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin: 0 ${theme.spacings.xxsmall} ${theme.spacings.xxsmall} 0;
      padding: 0 ${theme.spacings.xxsmall};
      border-radius: 8px;
      background: ${theme.colors.white};
      color: black;
      height: 40px;
      font-size: ${theme.font.sizes['mob-large']};
      border: solid ${theme.colors.lightGray} 1px;
      position: relative;
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
      background: ${theme.colors.ceriseRed};
      color: ${theme.colors.white};
      text-align: center;
      position: absolute;
      top: -8px;
      right: -4px;
    }
    }

    .select-field {
      display: inline-block;
      width: 100%;
      height: 32px;
      color: ${theme.colors.black};
      background: transparent;
      outline: none;
      border: 1px solid ${theme.colors.xlightGray};
      border-radius: 4px;
      margin-bottom: ${theme.spacings.small};
      padding: 0 3px;
    }

    .save {
      display: block;
      margin: ${theme.spacings.xsmall} 0 ${theme.spacings.xsmall} auto;
    }

    #title-tooltip {
      display: flex;
      align-items: center;
    }

    @media (max-width: 1024px) {
      width: 80%;
    }

    @media (max-width: ${theme.screen.small}) {
      width: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;

      .card-header {
        font-size: ${theme.font.sizes['desk-xlarge']};
      }

      .select-time-container {
        width: 100%;
        align-items: baseline;
      }

      .card {
        display: inline-grid;
      }
      
      .slots {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: ${theme.spacings.xxsmall};
      }

      .slot {
        width: 100%;
      }

      .select-field {
        width: 100%;
      }
    }

    @media (max-width: 320px) {
      
      #titulo-horario {
        font-size: 1.8rem;
      }
    }
    
  `}
`
