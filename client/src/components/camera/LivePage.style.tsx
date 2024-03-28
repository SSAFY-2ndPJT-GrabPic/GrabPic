import styled from "styled-components";

export const LiveVideo = styled.video`
    position: fixed;
    width: 100%;
    height: 100%;
    object-fit: cover;
`

export const CameraExitBtn = styled.button`
  position: fixed;
  top: 26px;
  right: 26px;
  z-index: 2;
  width: 30px;
`;

export const CameraCanvas = styled.canvas`
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`
