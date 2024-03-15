import styled from "styled-components";
import ProfileImgDefault from '../../../../assets/Home/Profile.png'

export const Container = styled.div`
  position: fixed;
  top: 100px;
  height: 162px;
  width: 100%;
  display: flex;
  padding-top: 21px;
  padding-bottom: 21px;
  column-gap: 26px;
  background-color: #FFFFFF;
`

export const UserContainer = styled.div`
  width: 85px;
  height: 100%;
  display: flex;
  gap: 10px;
  flex-direction: column;
`

export const ProfileImg = styled.img.attrs(({ src }) => ({
  src: src || ProfileImgDefault,
  alt: "프로필 이미지",
}))`
  width: 85px;
  height: 85px;
  border-radius: 50%;
`

export const NickName = styled.div`
  width: 85px;
  font-family: 'BMJUA';
  font-size: 16px;
`

export const SubContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: space-between;
`

export const TxtContainer = styled.div`
  width: 100%;
  height: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 15%;
  padding-right: 15%;
`

export const NumTxt = styled.div`
  font-family: 'BMJUA';
  font-size: '20px';
  text-align: center;
`

export const ExplainTxt = styled.div`
  font-family: 'TmoneyR';
  font-size: 12px;
`

export const SubBtn = styled.div`
  width: 100%;
  height: 35px;
  background-color: #B2EB78;
  border-radius: 10px;
  color: #5C5C5C;
  font-family: 'BMJUA';
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

