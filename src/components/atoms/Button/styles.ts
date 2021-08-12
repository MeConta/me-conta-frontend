import styled, { css } from 'styled-components'

export const Button = styled.button`
    ${({theme}) => css`
        height: 5.5rem;
        padding: 1.5rem 6rem;
        font-size: 1.8rem;
        border: 0;
        color: ${theme.colors.white};
        background: ${theme.colors.cornflowerBlue};
        transition: background-color 0.2s;

        border-radius: ${theme.border.radius};
            &:hover{
                background-color: ${theme.colors.cobalt};
                // animation: hoverAnimation 1.5s forwards;
            }
    `}
`
