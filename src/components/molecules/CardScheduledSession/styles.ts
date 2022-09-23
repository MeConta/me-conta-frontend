import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  width: 359px;

  .container {
    background-color: #ffffff;
    padding-bottom: 26px;
    height: 100%;
  }

  .dateContainer {
    color: #848a8c;
    font-family: 'Mulish';
    font-style: normal;
    font-size: 14px;
    background-color: #ffffff;
    display: flex;
    height: 37px;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    isolation: isolate;
    border-radius: 5px;
    padding-bottom: 34px;
    padding-top: 20px;
    margin-left: 21px;
  }

  .description {
    font-family: 'Mulish';
    font-style: normal;
    font-size: 12px;
    color: #747474;
    font-weight: 400;
    line-height: 21px;
    margin-left: 22.5px;
  }

  .observation {
    width: 328px;
    height: 21px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-left: 16px;
    margin-top: 16px;
  }

  .button {
    font-family: 'Mulish';
    font-style: normal;
    font-size: 18px;
    background-color: #458ff6;
    border-radius: 4px;
    width: 328px;
    height: 47px;
    margin-left: 16px;
    margin-top: 10px;
    color: #ffffff;
    border: none;
    flex: none;
    order: 2;
    flex-grow: 0;
  }

  .observationButton {
    font-size: 13px;
    font-family: 'Mulish';
    font-style: normal;
    text-transform: none;
    color: #000000;
  }

  .cancelButton {
    background-color: #ffffff;
    margin-left: 156px;
    margin-top: 10px;
    color: #458ff6;
    flex: none;
    border: none;
    order: 2;
    flex-grow: 0;
    text-decoration-line: underline;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    width: 100%;
  }
`
