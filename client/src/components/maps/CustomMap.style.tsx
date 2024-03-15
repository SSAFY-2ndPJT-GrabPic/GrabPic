import styled from "styled-components";


export const MapContainer = styled.div`
  position:relative;
  width: 100%;
  height: 100%; /* 화면 높이에서 112px 제외 */
`;

export const Zoom_Control = styled.button`
  position:absolute;
  top:50px;
  right:10px;
  width:36px;
  height:80px;
  overflow:hidden;
  z-index:1;
  background-color:#f5f5f5;
  border:1px solid #919191;border-radius:5px;
`;

export const Zoom_Span = styled.span`
  display: flex; /* 부모 요소를 플렉스 박스로 설정합니다. */
  justify-content: center; /* 가로 방향 가운데 정렬합니다. */
  align-items: center; /* 세로 방향 가운데 정렬합니다. */
  width:36px;
  height:40px;
  text-align:center;

  &:first-child {
    border-bottom: 1px solid #bfbfbf;
  }
`;

export const Zoom_Img = styled.img`
  width: 22px;
  height: 22px;
  border:none;
`;
