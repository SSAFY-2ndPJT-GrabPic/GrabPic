import styled from "styled-components";
import ProfileImgDefault from '../../../../assets/Home/Profile.png'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 0.5px solid #BDBDBD;
  gap: 13px;
`

export const ProfileImg = styled.img.attrs(({ src }) => ({
  src: src || ProfileImgDefault,
  alt: '프로필 이미지'
}))`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const NickNDateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const NickName = styled.div`
  font-family: 'BMJUA';
  font-size: 12px;
`

export const SmallTxt = styled.div`
  font-family: 'TmoneyR';
  font-size: 10px;
`

export const Content = styled(SmallTxt)`

`