import styled from "styled-components";

export const MapContainer = styled.div`
  position:relative;
  width: 100%;
  height: 100%; /* 화면 높이에서 112px 제외 */
  overflow: hidden;
`;

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
`;

export const HandleContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FilterContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* FilterContainer를 기준으로 손잡이를 위치시킬 수 있도록 설정 */
  gap: 20px;
`;

export const FilterButton = styled.button<{ clickActive: boolean }>`
  width: 88px;
  height: 30px;
  border-radius: 20px;
  border: ${props => props.clickActive ? 'solid 1px #50940C' : 'solid 1px #5C5C5C'};
  color: #5C5C5C;
  font-family: 'BMJUA';
  font-size: 16px;
  background-color: ${props => props.clickActive ? '#B2EB78' : ''}; 
`;

export const PinList = styled.div`
  margin-top: 5px;
  padding-top: 10px;
  width:100%;
  height: calc(100% - 70px);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
`;

export const PinDataContainer = styled.div`
  display: flex;
  width: 40px;
  max-height: 40px;
  min-height: 40px;
`;

export const PinImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 2px solid #67b816;
`;

export const PinSpan = styled.span`
  font-size: 16px;
  color: #001ba7;
  text-align: center;
`;

export const ItemContainer = styled.div`
  width: 90%;
  min-height: 100px;
  max-height: 100px;
  display: flex;
  padding: 5px 0px;
  gap: 20px;
`;

export const ItemImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 20px;
`;

export const ItemDataContainer = styled.div`
  font-family: 'BMJUA';
  width: calc(100% - 100px);
  height: 100%;
  display: flex;
  flex-direction: column;
  /* padding: 5px 0px; */
  border-bottom: 1px solid #e0e0e0;
`;

export const ItemNameSpan = styled.span`
  font-size: 16px;
  color: #3bc600;
  margin-bottom: 7px;
`;

export const ItemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const ItemInfoSpan = styled.span`
  font-family: 'TmoneyR';
  font-size: 12px;
  color: #363636;
`;

export const LocationBtn_Container = styled.div`
  position:absolute;
  top:140px;
  right:10px;
  width:36px;
  height:80px;
  overflow:hidden;
  z-index:1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const LocationBtn = styled.button`
  display: flex; 
  justify-content: center; 
  align-items: center; 
  width:36px;
  height:36px;
  text-align:center;
  background-color:#f5f5f5;
  border:1px solid #50940C;
  border-radius: 50%;
`;

export const ReLoadImg = styled.img`
width: 25px;
border:none;
`;

export const SetCenterImg = styled.img`
width: 32px;
border:none;
`;

// 줌 버튼 컨테이너
export const ZoomBtnContainer = styled.div`
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

export const Loader = styled.div`
  &.loader {
  opacity: 1;
  transition: opacity 0.3s ease; /* 투명도에 대한 transition 적용 */
  }

  &.loader.hidden {
    opacity: 0; /* 숨겨진 상태일 때 투명도 조정 */
    pointer-events: none; /* 숨겨진 상태일 때 이벤트 차단 */
  }
`
