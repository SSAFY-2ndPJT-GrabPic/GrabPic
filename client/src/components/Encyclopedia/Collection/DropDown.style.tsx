import styled from "styled-components";

export const FilterBtn = styled.div`
  height: 32px;
  border: 1px solid #5C5C5C;
  border-radius: 20px;
  padding: 4px 10px 5px 10px;
  column-gap: 10px;
`

export const TitleTxt = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
  font-family: 'BMJUA';
  font-size: 16px;
  color: #5C5C5C;
`

export const FilterImg = styled.img`
  height: 10px;
  transform: scale(0.7);
`

export const FilterReverseImg = styled(FilterImg)`
  transform: scale(-0.7);
`

export const FilterTxt = styled.div`
  font-family: 'BMJUA';
  font-size: 16px;
  color: #5C5C5C;
`

export const DownList = styled.div`
  width: 100%;
  position: relative;
  border-radius: 10px;
  background-color: #e9e9e9;
  z-index: 1;
`

export const DownItem = styled.div`
  display: flex;
  padding: 5px 10px;
  width: 100%;
  height: 30px;
  font-family: 'BMJUA';
  font-size: 16px;
  color: #5C5C5C;
`