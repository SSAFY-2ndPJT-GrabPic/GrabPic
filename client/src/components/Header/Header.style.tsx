import styled from "styled-components";
import LogoImg from "../../assets/Header/GrabPicLogo.png"
import ChatBotImg from "../../assets/Header/chatBotIcon.png"

export const Container = styled.div`
  position: fixed;
  top: 0;
  background-color: #FFFFFF;
  width: 100%;
  height: 56px;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Logo = styled.div`
  width: 128px;
  height: 38px;
  background-size: contain;
  background-image: url(${LogoImg});
`

export const ChatBot = styled.div`
  width: 25px;
  height: 25px;
  background-size: contain;
  background-image: url(${ChatBotImg});
`

