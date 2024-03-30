import styled from 'styled-components';
import { Link } from "react-router-dom";

export const ProfileImgInput = styled.input`
  display: none;
`;

export const ProfileImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;

export const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #bdbdbd;
  align-items: center;
  font-family: 'BMJUA';
`;

export const InfoTitel = styled.span`
  width: 20%;
  color: #5c5c5c;
  font-size: 14px;
`;

export const InfoText = styled.span`
  width: 70%;
  color: black;
  font-size: 18px;
`;

export const InfoClose = styled(Link)`
  width: 20%;
  position: absolute;
  left: 5%;

  img {
    width: 25px;
    height: 25px;
  }
`;

export const MainTitle = styled.span`
  font-family: 'BMJUA';
  font-size: x-large;
`;

export const ChangeBtn = styled.button`
    width: 10%;
    position: absolute;
    right: 0;

    img{
        width: 25px;
    }
`