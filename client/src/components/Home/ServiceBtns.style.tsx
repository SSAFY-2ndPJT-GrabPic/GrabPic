import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Title = styled.div`
  font-family: "BMJUA";
  font-size: 24px;
  color: #363636;
`

export const BtnsWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const BtnsGap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`

export const BtnBgrnd = styled(Link)`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 3px 4px rgb(0, 0, 0, 0.2);
  padding: 14px;
  padding-right: 10px;
  padding-bottom: 10px;
  display: flex;
`

export const BtnTitle = styled.div`
  font-family: "BMJUA";
  font-size: 20px;
  color: #363636;
`

export const BtnSub = styled.div`
  font-family: "TmoneyR";
  font-size: 12px;
  color: #363636;
`

export const MapBtn = styled(BtnBgrnd)`
  background-color: #FFF6B0;
  height: 165px;
  flex-direction: column;
`

export const MapIcon = styled.img`
  width: 65px;
  height: 75px;
`

export const CamBtn = styled(BtnBgrnd)`
  background-color: #DDFFBC;
  height: 165px;
  flex-direction: column;
`

export const IconAlign = styled.div`
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: end;
`
export const CamIcon = styled.img`
  width: 79px;
  height: 73px;
`

export const GallBtn = styled(BtnBgrnd)`
  background-color: #D6E9FF;
  height: 92px;
  justify-content: space-between;
`
  
export const GallIcon = styled.img`
  width: 72px;
  height: 62px;
`
