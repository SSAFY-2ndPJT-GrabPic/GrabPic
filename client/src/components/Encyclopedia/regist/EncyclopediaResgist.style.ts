import styled from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 5%;
    padding-right: 5%;
`

export const TopContainer = styled.div`
    font-family: 'BMJUA';
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 50px;
    border-bottom: 1px solid #BDBDBD;
`
export const Tilte = styled.span`
    font-size: 20px;
    width: 60%;
    color: black;
`

export const NoBtn = styled.button`
    width: 15%;
    height: 40px;
    background-color: #BDBDBD;
    color: white;
    border-radius: 5px;
`

export const YesBtn = styled.button`
    width: 15%;
    height: 40px;
    background-color: #81D42E;
    color: white;
    border-radius: 5px;
`

export const RegistImg = styled.img`
    border-radius: 50%;
    width: 150px;
    height: 150px;
    object-fit: cover;
`

export const RegistName = styled.span`
    font-family: 'BMJUA';
    font-size: 30px;
`

export const ObjectInfoContainer = styled.data`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 150px;
`

export const ObjectTitle = styled.span`
    font-family: 'TmoneyR';
    font-size: 20px;
    height: 30px;
`

export const ObjectContent = styled.span`
    max-height: 110px;
    padding: 3% 5% 2% 5%;
    overflow: scroll;
    font-size: 16px;
    font-family: 'TmoneyR';
    color: #5C5C5C;
`

export const ObjectLine = styled.div`
    height: 1px;
    width: 100%;
    border-bottom: 1px solid #BDBDBD;
`


export const ObjectTextarea = styled.textarea`
    word-break: break-all;
    max-height: 110px;
    padding: 3% 5% 2% 5%;
    overflow: scroll;
    font-size: 16px;
    font-family: 'TmoneyR';
    color: #5C5C5C;
`