import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  margin-top: 28px;
  width: 100%;
  height: 162px;
  box-shadow: 0px 3px 4px rgb(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 27px;
`

export const UserInfoWrap = styled.div`
  display: flex;
  align-items: center;
  height: 69px;
  gap: 22px;
`

export const ProfileImg = styled.img`
  width: 69px;
  height: 69px;
`

export const DetailInfo = styled.div`

`

export const NickName = styled.div`
  font-family: 'BMJUA';
  font-size: 24px;
`

export const DetailTypo = styled.div`
  font-family: 'TmoneyR';
  font-size: 16px;
`

export const BtnsWrap = styled.div`
  width: 100%;
  display: flex;
  gap: 22px;
`

export const Btn = styled(Link)`
  width: 100%;
  height: 35px;
  background-color: #B2EB78;
  border-radius: 10px;
  font-family: "BMJUA";
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`