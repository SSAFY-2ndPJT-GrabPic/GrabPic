import styled from "styled-components";
import SubmitReplyBtn from '../../../../assets/Encyclopedia/SubmitReplyBtn.png'

export const Container = styled.div`
  position: fixed;
  top: 262px;
  bottom: 112px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 16px;
  padding-right: 16px;
  margin-bottom: 10px;
  overflow: scroll;
  ::-webkit-scrollbar{
    display: none;
  }
`
export const ObserverContainer = styled.div`
  height: 30px;
  background-color: #FFFFFF;
  display: flex;
  justify-content: center;
  z-index: 1px;
`

export const LoadingGif = styled.img`
  height: 60px;
  object-fit: cover;
`

export const InputContainer = styled.div`
  position: fixed;
  bottom: 56px;
  width: 100%;
  height: 56px;
  background-color: #FFFFFF;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
`

export const InputWrap = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #5C5C5C;
  border-radius: 20px;
  padding-left: 15px;
  padding-right: 15px;
  gap: 10px;
`

export const ReplyInput = styled.input`
  height: 32px;
  width: 100%;
  font-family: 'TmoneyR';
  font-size: 14px;
  outline: none;
  color: #363636;
`

export const ReplyBtn = styled.button`
  height: 24px;
  width: 24px;
  background-image: url(${SubmitReplyBtn});
  background-size: contain;
`