import styled, { css } from 'styled-components'

export const WrapperTable = styled.div`
  overflow: auto;
  max-height: 500px;
  background-color: #fff;
  margin-top: 38px;
  border-radius: 4px;
`

export const TableContainer = styled.table`
  ${({ theme }) => css`
    background-color: #fff;
    font-size: ${theme.font.sizes['desk-glarge']};
    text-align: left;
    width: 100%;
    min-width: 800px;
    padding: 0px 51px;

    th {
      position: sticky;
      top: 0px;
      z-index: 1;
      padding-top: 38px;
      background-color: #fff;
      font-weight: ${theme.font.extrabold};
      border-bottom: 2px dashed #efefef;
      padding-bottom: ${theme.spacings.xsmall};
    }

    td {
      font-weight: ${theme.font.bold};
      padding: ${theme.spacings.xsmall} 0px;
      border-bottom: 2px dashed #efefef;
    }

    tbody {
      overflow-y: auto;
    }
  `}
`
export const CellContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    justify-content: start;

    > div {
      margin-right: 10px;
    }
  `}
`
