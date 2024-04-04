import styled from "styled-components";

export const LiveVideo = styled.video`
    position: fixed;
    width: 100%;
    height: 100%;
    /* object-fit: cover; */
`

export const CameraExitBtn = styled.button`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 2;
  width: 26px;
`;

export const CameraCanvas = styled.canvas`
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

export const ZoomPlueButton = styled.button`
  z-index: 3;
  position: fixed;
  width: 30px;
  top: 60px;
  right: 16px;
`
export const ZoomMinusButton = styled.button`
  z-index: 3;
  position: fixed;
  top: 110px;
  right: 16px;
  width: 30px;
`

// 줌 버튼 컨테이너
export const ZoomBtnContainer = styled.div`
  position:absolute;
  top:100px;
  right:10px;
  width:36px;
  height:80px;
  overflow:hidden;
  z-index:1;
  background-color:#f5f5f5;
  border:1px solid #919191;
  border-radius:5px;
`;

// 줌 버튼
export const ZoomBtn = styled.button`
  display: flex; 
  justify-content: center; 
  align-items: center; 
  width:36px;
  height:40px;
  text-align:center;

  &:first-child {
    border-bottom: 1px solid #bfbfbf;
  }
`;

// 줌 버튼 이미지
export const ZoomImg = styled.img`
  width: 18px;
  border:none;
`;