import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin-top: 8px;
`

export const BtnAlign = styled.div`
  display: flex;
  justify-content: end;
`

export const FilterBtn = styled.div`
  width: 90px;
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
  margin-top: 18px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`

export const CollectItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 16px;
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