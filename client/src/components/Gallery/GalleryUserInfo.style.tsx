import styled from "styled-components";
import defaultImg from '../../assets/Home/Profile.png'

export const Container = styled.div`
  display: flex;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 5px;
  padding-bottom: 5px;
  gap: 12px;
  width: 100%;
  height: 50px;
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
  align-items: center;
`