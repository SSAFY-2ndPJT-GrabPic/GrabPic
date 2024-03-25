import styled from "styled-components";
import defaultImg from '../../../../assets/Home/Profile.png'
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  /*스크롤이 되도 모달창이 고정 되도록 position:fixed*/
  position: fixed;
  left: 0;
  bottom: 0;

  /* 자식 컴포넌트인 모달창을 가운데 오게 하기 위해 flex설정*/
  display: flex;
  justify-content: center;
  align-items: center;
`

export const BackDrop = styled.div`
  background-color: rgb(189, 189, 189, 0.5);
  width: 100%;
  height: 100%;

  /*스크롤이 되도 모달창이 고정 되도록 position:fixed*/
  position: fixed;
`

export const FilterBox = styled.div`
  width: 314px;
  height: 430px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
  border-radius: 10px;
  z-index: 1;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`

export const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  color: #50940C;
  font-family: 'BMJUA';
  font-size: 20px;
  margin-bottom: 10px;
`

export const ListBox = styled.div`
  width: 100%;
  height: 100%;
`

export const ListItem = styled(Link)`
  width: 100%;
  height: 40px;
  border-top: 1px solid #BDBDBD;
  display: flex;
  align-items: center;
  padding-left: 16px;
  font-family: 'TmoneyR';
  font-size: 16px;
  color: #363636;
`

export const UserImg = styled.img.attrs(({ src }) => ({
  src: src || defaultImg, alt: 'userProfileImg'
}))`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

export const UserNickname = styled.div`
  font-family: 'BMJUA';
  font-size: 16px;
`