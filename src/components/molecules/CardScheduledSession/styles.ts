import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  width: 359px;
  height: 261px;

  .container {
    padding-top: 14px;
  }

  .dateContainer {
    background-color: #fafafa;
    display: flex;
    justify-content: space-between;
    width: 359px;
    height: 37px;
    flex-direction: row;
    align-items: left;
    padding: 0px;
    isolation: isolate;
    border-radius: 5px;
  }

  .description {
    font-size: 14px;
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
    background-color: #458ff6;
    border-radius: 4px;
    width: 328px;
    height: 29px;
    margin-left: 16px;
    margin-top: 10px;
    color: #ffffff;
    border: none;
    flex: none;
    order: 2;
    flex-grow: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    width: 100%;
  }
`
