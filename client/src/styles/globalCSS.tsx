import styled from "styled-components";


export const InputContainer = styled.div`
    width: 100%;
    height: 100px;
    font-family: 'TmoneyR';
    display: flex;
    flex-direction: column;
`
export const InputBox = styled.input`
    border-radius: 5px;
    background-color: #F3F3F3;
    height: 50px;
    padding-left: 15px;
`

export const InputError = styled.span`
    color: red;
`

export const InputButtonActive = styled.button`
    width: 100%;
    height: 50px;
    border-radius: 5px;
    background-color: #81D42E;
    color: white;
    font-family: 'BMJUA';
    font-size: x-large;
`

export const InputButtonDisabled = styled.button`
    width: 100%;
    height: 50px;
    border-radius: 5px;
    background-color: #BDBDBD;
    color: white;
    font-family: 'BMJUA';
    font-size: x-large;
`
export const InputButtonSmall = styled.button`
    width: 25%;
    height: 50px;
    border-radius: 5px;
    margin-left: 5%;
    background-color: #81D42E;
    color: #5C5C5C;
    font-family: 'BMJUA';
    font-size: x-large;
    font-size: 16px;
`