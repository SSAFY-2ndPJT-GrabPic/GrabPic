import styled from 'styled-components';

export const modalContainer = styled.div`
  position: fixed;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: hsla(0, 0%, 74.11764705882354%, 0.5);
  z-index: 1;
`;

export const modalBox = styled.div`
  width: 80%;
  /* height: 30%; */
  background-color: white;
  font-family: 'TmoneyR';
  border-radius: 10px;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

export const modalTitle = styled.span`
  font-size: 16px;
`;

export const modalText = styled.span`
  margin-top: 10px;
  font-size: 12px;
`;

export const modalNoBtn = styled.button`
  font-family: 'TmoneyEB';
  color: #5c5c5c;
`;

export const modalYesBtn = styled.button`
  font-family: 'TmoneyEB';
  color: #50940c;
`;

export const modalDeleteTest = styled.span`
  margin-top: 10px;
  font-size: 12px;
  color: red;
`;

export const modalDeleteInput = styled.input`
  margin-top: 10px;
  width: 80%;
  height: 30px;
  background-color: #F3F3F3;
  border-radius: 10px;
  padding-left: 10px;
  color: red;
  font-size: 12px;
`

export const modalMsg = styled.span`
  font-size: 10px;
  color: red;
`