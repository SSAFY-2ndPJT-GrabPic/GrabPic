import styled from "styled-components";


export const InputContainer = styled.div`
    width: 100%;
    min-height: 100px;
    max-height: 150px;
    font-family: 'TmoneyR';
    display: flex;
    flex-direction: column;
`
export const InputContainerRow = styled.div`
    width: 100%;
    font-family: 'TmoneyR';
    display: flex;
    flex-direction: row;
    align-items: center;
`
export const InputBox = styled.input`
    border-radius: 5px;
    background-color: #F3F3F3;
    height: 50px;
    padding-left: 15px;
`

export const InputError = styled.span`
    color: red;
    font-size: 12px;
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

export const InputCheckBox = styled.input`
    appearance: none;
    border-radius: 50%;
    border: 2px solid #5C5C5C;
    width: 20px;
    height: 20px;
    margin-left: 10%;
    margin-right: 5%;
    &:checked {
        background-color: #81D42E;
    }
`