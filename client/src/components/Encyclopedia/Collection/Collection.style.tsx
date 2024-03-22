import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin-top: 8px;
  padding-left: 16px;
  padding-right: 16px;
`

export const BtnAlign = styled.div`
  display: flex;
  justify-content: end;
`

export const FilterBtn = styled.div`
  /* width: 90px; */
  height: 30px;
  border: 1px solid #5C5C5C;
  border-radius: 30px;
  padding-left: 14px;
  padding-right: 14px;
  padding-top: 7px;
  padding-bottom: 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 10px;
`

export const FilterImg = styled.img`
  height: 10px;
`

export const FilterTxt = styled.div`
  font-family: 'BMJUA';
  font-size: 16px;
  color: #5C5C5C;
`

export const CollectContainer = styled.div`
  width: 100%;
  margin-top: 18px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  /* grid-template-columns: repeat(auto-fit, minmax(33%, auto)); */
  /* flex-wrap: wrap; */
  /* justify-content: space-between; */
  /* justify-content: center; */
  align-items: center;
  /* gap: 2%; */
  @media all and (max-width:479px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media all and (min-width:480px) and (max-width:767px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media all and (min-width:768px) and (max-width:1023px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
  @media all and (min-width:1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  }
`

export const CollectItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 16px;
  justify-content: center;
  align-items: center;
`

export const ItemImg = styled.img`
  width: 90px;
`

export const ItemName = styled.div`
  font-family: 'BMJUA';
  font-size: 16px;
  text-align: center;
  color: #363636;
`