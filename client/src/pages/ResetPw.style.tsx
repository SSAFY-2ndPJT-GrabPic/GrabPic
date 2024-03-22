import styled from "styled-components";
import { Link } from "react-router-dom";

export const Close = styled(Link)`
    width: 20%;
    position: absolute;
    left: 5%;

    img {
    width: 25px;
    height: 25px;
    }
`

export const ResetPwText = styled.span`
    font-family: 'BMJUA';
    font-size: x-large;
`