import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: #ffffff;
  display: flex;
  padding: 18px;
  width: 100%;

  .content {
    align-items: center;
    display: flex;
    max-width: 1360px;
    justify-content: flex-start;
    padding: 0 calc((100% - 1360px) / 2);
    width: 100%;

    @media (max-width: 768px) {
      max-width: unset;
      padding: 0 20px;
    }

    .title {
      border-right: 1px solid #e3e3e3;
      color: #333;
      font-size: 18px;
      padding-right: 10px;
      text-transform: capitalize;

      a {
        text-decoration: none;
        color: #333;
      }

      @media (max-width: 768px) {
        font-size: 14px;
      }
    }

    .breadcrumb-links {
      ul {
        li {
          list-style: none;
          display: inline-block;
          margin-left: 10px;

          a {
            color: #aaaebd;
            font-size: 14px;
            text-decoration: none;
            text-transform: capitalize;
            &:hover {
              text-decoration: underline;
            }

            @media (max-width: 768px) {
              font-size: 12px;
            }
          }

          span.divider-off {
            display: none;
          }
          span.divider-on {
            display: inline-block;
            background-color: #aaaebd;
            margin: 0 0 3px 8px;
            width: 6px;
            height: 1px;
          }
        }
      }
      .link-ativo {
      }
    }
  }
`
