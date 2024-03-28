import styled from "styled-components";

export const LoadingContainer = styled.div`
    display: flex;
    position: fixed;
    flex-direction: column;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    z-index: 3;
    background-color: #00000079;
`

export const LoadingText = styled.span`
    font-family: 'BMJUA';
    font-size: 150%;
`

export const LoadingSpinner = styled.img`
    width: 20%;
`