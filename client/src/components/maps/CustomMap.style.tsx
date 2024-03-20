import styled from "styled-components";

// 맵 컨테이너
export const MapContainer = styled.div`
  position:relative;
  width: 100%;
  height: 100%; /* 화면 높이에서 112px 제외 */
  overflow: hidden;
`;

// 리스트 컨테이너
export const ListContainer = styled.div<{ active:boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60%;
  transform: ${props => props.active ? 'translateY(0%)' : 'translateY(calc(60% + 90px))'};
  overflow: hidden;
  background-color: #fefefe; /* 예시 배경색 */
  z-index: 100;
  border-top-right-radius: 35px;
  border-top-left-radius: 35px;
  box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.175);
`;

export const DragHandle = styled.div`
  content: '-';
  position: absolute;
  width: 180px; /* 손잡이의 가로 크기 */
  height: 4px; /* 손잡이의 세로 크기 */
  background-color: #50940C; /* 연두색 */
  border-radius: 3px; /* 손잡이의 둥근 모양을 위해 반지름 설정 */
`
export const HandleContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const FilterContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* FilterContainer를 기준으로 손잡이를 위치시킬 수 있도록 설정 */
  gap: 20px;
`

export const FilterButton = styled.button<{ clickActive: boolean }>`
  width: 88px;
  height: 30px;
  border-radius: 20px;
  border: ${props => props.clickActive ? 'solid 1px #50940C' : 'solid 1px #5C5C5C'};
  color: #5C5C5C;
  font-family: 'BMJUA';
  font-size: 16px;
  background-color: ${props => props.clickActive ? '#B2EB78' : ''};
  
`
// 핀 리스트
export const PinList = styled.div`
  margin-top: 20px;
  width:100%;
  height: calc(100% - 70px);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
  gap: 20px;
`
// 핀 아이템 컨테이너
export const PinItemContainer = styled.div`
  width: 90%;
  min-height: 80px;
  max-height: 80px;
  display: flex;
  gap: 20px;
`

// 핀 이미지 컨테이너
export const PinImgContainer = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 20px;
`

// 핀 데이터 컨테이너
export const PinDataContainer = styled.div`
  font-family: 'BMJUA';
  width: calc(100% - 100px);
  display: flex;
  flex-direction: column;
  padding: 5px 0px;
`
export const PinNameSpan = styled.span`
  font-size: 16px;
  color: #001ba7;
  margin-bottom: 7px;
`
export const PinInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`
export const PinInfoSpan = styled.span`
  font-family: 'TmoneyR';
  font-size: 12px;
  color: #363636;
`



// 줌 버튼 컨테이너
export const Zoom_Control = styled.button`
  position:absolute;
  top:50px;
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
export const Zoom_Span = styled.span`
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
export const Zoom_Img = styled.img`
  width: 18px;
  border:none;
`;
