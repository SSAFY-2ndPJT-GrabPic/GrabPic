import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  /*스크롤이 되도 모달창이 고정 되도록 position:fixed*/
  position: fixed;
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
  /* height: 320px; */
  padding: 15px 20px 15px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
  border-radius: 10px;
  z-index: 1;
  row-gap: 15px;
`

export const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* height: 50px; */
  color: #50940C;
  font-family: 'BMJUA';
  font-size: 20px;
  /* margin-bottom: 10px; */
`

export const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* height: 100%; */
  gap: 5px;
`

export const ListItem = styled.div`
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

export const DoneBtn = styled.button`
  width: 75px;
  height: 30px;
  border-radius: 30px;
  padding: 4px 12px 5px;
  background-color: #5eb606;
  font-family: 'BMJUA';
  font-size: 16px;
  text-align: center;
  color: #FFFFFF;
`