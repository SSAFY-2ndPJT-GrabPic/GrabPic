import { useLocation, useNavigate } from 'react-router';
import * as E from './EncyclopediaResgist.style';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import * as R from '../../../recoil/atoms/SettingState';
import { registEncy } from '../../../api/encyclopedia';
import { UserInfoType } from '../../../type/UserType';
import { userInfoState } from '../../../recoil/atoms/UserState';
import { headerState } from '../../../recoil/atoms/EncyHeaderState';
import { ChangeEvent, useEffect, useState } from 'react';
import { registState } from '../../../recoil/atoms/RegistState';



export const EncyclopediaResgist: React.FC = () => {
  // 카메라 페이지에서 가져온 정보들..
  const { state } = useLocation();
  const image = state.image;
  const info = state.info;
  const autoSave = state.autoSave;
  const boxXYString = localStorage.getItem('boxXY');
  const boxXY = boxXYString ? JSON.parse(boxXYString) : null;

  const locationString = localStorage.getItem('location')
  const location = locationString ? JSON.parse(locationString) : null;

  // 화면 전환
  const navigate = useNavigate();
  const userInfo = useRecoilValue<UserInfoType>(userInfoState);
  const setEncyLocate = useSetRecoilState(headerState);

  // 서버로 보낼 info정보
  const [inputData, setInputData] = useState<string>('');
  // 서버로 보낼 주소 정보
  const [address, setAddress] = useState<string>('');

  // 취소, 실패 모달
  const setIsModal = useSetRecoilState<boolean>(R.isModalState);
  const setIsModalNo = useSetRecoilState<number>(R.isModalNo);

  // 전송 로딩.
  const setIsLoadingState = useSetRecoilState(R.isLoadingState);
  const setIsLoadingNo = useSetRecoilState(R.isLoadingNo);

  const setRegistState = useSetRecoilState(registState)

  useEffect(() => {
    const fetchAddress = async () => {
      const fetchedAddress = await reverseGeocode(location.latitude, location.longitude);
      setAddress(fetchedAddress);
    };
  
    fetchAddress(); // 비동기 함수 호출
  })


  // 취소 버튼
  const cancelCilck = () => {
    localStorage.removeItem('location')
    localStorage.removeItem('biologyId')
    localStorage.removeItem('boxXY')
    setIsModal(true);
    setIsModalNo(3);
  };

  // 등록 버튼
  const registClick = async () => {
    // 버튼 누르면 바로 로딩이 돌아간다.
    setIsLoadingState({ loading: true, progress: 0 });
    setIsLoadingNo(1);

    // 박스 좌표를 가져온다.
    const boxParmas = {
      x: parseFloat(boxXY.x),
      y: parseFloat(boxXY.y),
      h: parseFloat(boxXY.w),
      w: parseFloat(boxXY.h),
    };

    const infoData = {
      biologyId: info.biologyListId,
      latitude: location.latitude,
      longitude: location.longitude,
      address: address,
      content: inputData,
    };
    // type을 변경.
    const infoBlob = new Blob([JSON.stringify(infoData)], {
      type: 'application/json',
    });
    const boxBlob = new Blob([JSON.stringify(boxParmas)], {
      type: 'application/json',
    });

    const formData = new FormData();

    // 앞 뒤 20장 사진 추가.
    autoSave.forEach((url: string, index: number) => {
      // url을 blob로 변환후 blob를 file로 변환해야 formData로 전송 가능.
      const blob = dataURLtoBlob(url,1);
      const file = new File([blob], `${index + 1}.jpeg`);
      formData.append('frame', file);
    });

    const blob = dataURLtoBlob(image,2);
    const file = new File([blob], `image.png`);
    formData.append('image', file);
    formData.append('info', infoBlob);
    formData.append('box', boxBlob);

    // api 호출.
    registEncy(
      formData,
      () => {
        localStorage.removeItem('location')
        localStorage.removeItem('biologyId')
        localStorage.removeItem('boxXY')
        // 성공 시 로딩 해제, 페이지 넘김.
        setRegistState(true)
        setEncyLocate('collection');
        setIsLoadingState({ loading: false, progress: 0 });
        setIsLoadingNo(0);
        navigate(`/encyclopedia/${userInfo.nickname}`, {
          state: { userId: userInfo.userId },
        });
      },
      () => {
        // 실패 시 로딩 해제, 모달.
        setIsLoadingState({ loading: false, progress: 0 });
        setIsLoadingNo(0);
        setIsModal(true);
        setIsModalNo(6);
      }
    );
  };

  // 데이터 URL을 Blob으로 변환하는 함수
  const dataURLtoBlob = (dataURL: string, flag : number): Blob => {
    const byteString = atob(dataURL.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return flag === 1 ? new Blob([uint8Array], { type: 'image/jpeg' }) : new Blob([uint8Array], { type: 'image/png' });
  };


  // 주소 변환.
  const reverseGeocode = async (lat: number, lon: number) => {
    try {
      const apiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;
      const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}`;
  
      const response = await fetch(url, {
        headers: {
          Authorization: `KakaoAK ${apiKey}`,
        },
      });
  
      if (!response.ok) {
        throw '주소를 가져오는데 실패했습니다.';
      }
  
      const data = await response.json();
      if (data.documents && data.documents.length > 0) {  
        return data.documents[0].address.address_name;
      } else {
        throw '주소를 찾을 수 없습니다.';
      }
    } catch (error) {
      throw '주소를 가져오는데 오류가 발생했습니다.';
    }
  }

  // 메모 값.
  const textInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputData(e.target.value);
  };

  return (
    <>
      <E.TopContainer>
        <E.NoBtn onClick={cancelCilck}>취소</E.NoBtn>
        <E.Tilte>컬렉션 등록</E.Tilte>
        <E.YesBtn onClick={registClick}>저장</E.YesBtn>
      </E.TopContainer>
      <E.MainContainer>
        <div className="flex flex-col justify-center items-center mt-5">
          <E.RegistImg src={image} />
          <E.RegistName className="mt-2">{info.name}</E.RegistName>
        </div>
        <E.ObjectInfoContainer className="mt-5">
          <E.ObjectTitle>개체설명</E.ObjectTitle>
          <E.ObjectContent>{info.summary}</E.ObjectContent>
          <E.ObjectLine></E.ObjectLine>
        </E.ObjectInfoContainer>
        <E.ObjectInfoContainer className="mt-5">
          <E.ObjectTitle>수집위치</E.ObjectTitle>
          <E.ObjectContent>{address}</E.ObjectContent>
          <E.ObjectLine></E.ObjectLine>
        </E.ObjectInfoContainer>
        <E.ObjectInfoContainer className="mt-5">
          <E.ObjectTitle>메모</E.ObjectTitle>
          <E.ObjectTextarea
            value={inputData}
            onChange={(e) => {
              textInputChange(e);
            }}
          ></E.ObjectTextarea>
          <E.ObjectLine></E.ObjectLine>
        </E.ObjectInfoContainer>
      </E.MainContainer>
    </>
  );
};
