import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 56px;
  background-color: #FFFFFF;
`

export const NavCol = styled(Link)`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;

  #camIcon {
    width: 46px;
    height: 46px;
  }

  img {
    width: 25px;
    height: 25px;
  }
`