import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  background-color: #fbfbfb;
  padding: 24px;

  @media (max-width: 768px) {
    padding: 24px 5px;
  }

  .title {
    font-size: 14px;
    color: #aaaebd;
    font-weight: 600;
    line-height: 21px;
    margin-left: 22px;
    margin-top: 11px;
  }

  .description {
    font-size: 14px;
    color: #747474;
    font-weight: 400;
    line-height: 21px;
    margin-left: 22.5px;
  }
`
