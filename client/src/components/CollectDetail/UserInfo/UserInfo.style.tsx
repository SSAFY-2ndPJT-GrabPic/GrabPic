import styled from "styled-components";
import defaultImg from '../../../assets/Home/Profile.png'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 7px;
  padding-bottom: 7px;
`

export const InfoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const UserImg = styled.img.attrs(({ src }) => ({
  src: src || defaultImg , 
  alt: 'userProfileImg'
}))`
  width: 39px;
  height: 39px; 
  border-radius: 50%;
`

export const UserTxtWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 4px;
  padding-bottom: 4px;
`

export const nickName = styled(Link)`
  font-family: 'BMJUA';
  font-size: 16px;
  color: #363636;
`

export const subWrap = styled.div`
  display: flex;
  gap: 10px;
`

export const subIcon = styled.img.attrs(({ src }) => ({
  src: src, alt: '구독버튼'
}))`
  width: 12px;
  height: 12px;
`

export const subNum = styled.div`
  font-family: 'BMJUA';
  font-size: 10px;
  color: #363636;
`

export const BackBtn = styled(Link)`
  font-family: 'BMJUA';
  font-size: 14px;
  color: #363636;
  align-items: center;
`