import styled from "styled-components";
import defaultImg from '../../assets/Home/Profile.png'

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 9px;
  padding-bottom: 9px;
  gap: 12px;
  width: 100%;
  height: 58px;
`

export const UserProfileImg = styled.img.attrs(({ src }) => ({
  src: src || defaultImg,
  alt: 'userProfileImg'
}))`
  width: 39px;
  height: 39px;
  border-radius: 50%;
`

export const UserTxt = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`

export const NickTxt = styled.div`
  font-family: 'BMJUA';
  font-size: 16px;
  color: #363636;
`

export const DateTxt = styled.div`
  font-family: 'TmoneyR';
  font-size: 10px;
  color: #363636;
`
