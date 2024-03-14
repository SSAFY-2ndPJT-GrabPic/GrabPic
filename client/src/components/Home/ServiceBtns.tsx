import * as S from './ServiceBtns.style'
import React from 'react';
import MapIconUrl from '../../assets/Home/MapIcon.png'
import CameraIconUrl from '../../assets/Home/CameraIcon.png'
import GalleryIconUrl from '../../assets/Home/GalleryIcon.png'


interface ServiceBtnsProps {}

const ServiceBtns: React.FC<ServiceBtnsProps> = () => {
  return (
    <S.Container>
      <S.Title>서비스 바로 이용해보기</S.Title>

      <S.BtnsWrap>
        <div className='flex gap-4'>
          <S.MapBtn to='/map'>
            <S.BtnsGap>
              <S.BtnTitle>지도</S.BtnTitle>
              <S.BtnSub>
                현재 위치를 기반으로 <br/>개체를 확인해보세요!
              </S.BtnSub>
            </S.BtnsGap>
            <S.IconAlign>
              <S.MapIcon src={MapIconUrl} alt="" />
            </S.IconAlign>
          </S.MapBtn>

          <S.CamBtn to='/camera'>
            <S.BtnsGap>
              <S.BtnTitle>카메라</S.BtnTitle>
              <S.BtnSub>
                카메라를 통해 실시간으로 <br/>개체 정보를 확인해보세요!
              </S.BtnSub>
            </S.BtnsGap>
            <S.IconAlign>
              <S.CamIcon src={CameraIconUrl} alt="" />
            </S.IconAlign>

          </S.CamBtn>
        </div>

        <S.GallBtn to='/gallery'>
          <S.BtnsGap>
            <S.BtnTitle>갤러리</S.BtnTitle>
            <S.BtnSub>
            갤러리에서 다른 유저들이 수집한 <br/> 다양한 개체를 확인해보세요!
            </S.BtnSub>
          </S.BtnsGap>
          <S.GallIcon src={GalleryIconUrl} alt="" />
        </S.GallBtn>
      </S.BtnsWrap>
    </S.Container>
  );
};

export default ServiceBtns;