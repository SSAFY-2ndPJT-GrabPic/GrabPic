import styled from "styled-components";

export const VerificationTitle = styled.span`
    font-family: 'Jalnan';
    font-size: 28px;
`   
export const VerificationText = styled.span`
    font-family: 'TmoneyR';
    font-size: 12px;
`   
export const VerificationTextGreen = styled.span`
    font-family: 'TmoneyR';
    font-size: 12px;
    color: #50940C;
`

export const VerificationProgressContainer = styled.div`
    position: absolute;
    right: 5%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
`

export const VerificationProgressNo = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #D9D9D9;
`
export const VerificationProgressYes = styled.div`
    width: 17px;
    height: 17px;
    border-radius: 50%;
    background-color: #81D42E;
`