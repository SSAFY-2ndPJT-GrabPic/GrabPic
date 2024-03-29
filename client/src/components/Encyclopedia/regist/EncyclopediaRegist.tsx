import { useLocation, useNavigate } from 'react-router';
import * as E from './EncyclopediaResgist.style';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import * as R from '../../../recoil/atoms/SettingState';
import { registEncy } from '../../../api/encyclopedia';
import { UserInfoType } from '../../../type/UserType';
import { userInfoState } from '../../../recoil/atoms/UserState';
import { headerState } from '../../../recoil/atoms/EncyHeaderState';

const dummyData = {
  biologyId : 1,
  registDate : "2020-01-01",
  latitude : 36.12123,
  longitude : 128.121121,
  address : "우리집 옆집",
  content : "안녕 나는 메모",
  imageUrl : "tmp"
}

export const EncyclopediaResgist: React.FC = () => {
    const {state} = useLocation();
    const image = state.image;
    const info = state.info;
    const autoSave = state.autoSave;
    // const boxXY = localStorage.getItem('boxXY');

    const [,setIsModal] = useRecoilState<boolean>(R.isModalState);
    const [,setIsModalNo] = useRecoilState<number>(R.isModalNo);
    
    const cancelCilck = () => {
      setIsModal(true);
      setIsModalNo(3);
    }
    
    const navigate = useNavigate();
    const userInfo = useRecoilValue<UserInfoType>(userInfoState)
    const setEncyLocate = useSetRecoilState(headerState)

    const registClick = () => {

      const boxParmas = {
        x : 99,
        y : 99,
        h : 99,
        w : 99,
      }
      const dummyBlob = new Blob([JSON.stringify(dummyData)], {type: "application/json"}) 
      const boxBlob = new Blob([JSON.stringify(boxParmas)], {type: "application/json"}) 

      const formData = new FormData();

      const frameArr: Blob[] = [];

      autoSave.forEach((url : string) => {
        const blob = dataURLtoBlob(url);
        // console.log(blob);
        frameArr.push(blob)
        // formData.append('frame',blob);
      })

      const blob = dataURLtoBlob(image);
      formData.append('frame',new Blob(frameArr, { type: 'image/jpeg' }));
      formData.append('image', blob);
      formData.append('info', dummyBlob);
      formData.append('box',boxBlob);

      registEncy(formData,      
        (res) => {
          console.log(res);
          setEncyLocate('collection')
          navigate(`/encyclopedia/${userInfo.nickname}`, { state: { userId: userInfo.userId} })
        },
        (err) => { console.error(err) }
      )
    }

  // 데이터 URL을 Blob으로 변환하는 함수
  const dataURLtoBlob = (dataURL: string): Blob => {
    const byteString = atob(dataURL.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([uint8Array], { type: 'image/jpeg' });
  };

  return (
    <>
      <E.TopContainer>
        <E.NoBtn onClick={cancelCilck}>취소</E.NoBtn>
        <E.Tilte>컬렉션 등록</E.Tilte>
        <E.YesBtn onClick={registClick}>저장</E.YesBtn>
      </E.TopContainer>
      <E.MainContainer>
        <div className='flex flex-col justify-center items-center mt-5'>
            <E.RegistImg src={image}/>
            <E.RegistName className='mt-2'>{info.name}</E.RegistName>
        </div>
        <E.ObjectInfoContainer className='mt-5'>
            <E.ObjectTitle>개체설명</E.ObjectTitle>
            <E.ObjectContent>{info.content}</E.ObjectContent>
            <E.ObjectLine></E.ObjectLine>
        </E.ObjectInfoContainer>
        <E.ObjectInfoContainer className='mt-5'>
            <E.ObjectTitle>수집위치</E.ObjectTitle>
            <E.ObjectContent></E.ObjectContent>
            <E.ObjectLine></E.ObjectLine>
        </E.ObjectInfoContainer>
        <E.ObjectInfoContainer className='mt-5'>
            <E.ObjectTitle>메모</E.ObjectTitle>
            <E.ObjectTextarea></E.ObjectTextarea>
            <E.ObjectLine></E.ObjectLine>
        </E.ObjectInfoContainer>
      </E.MainContainer>
    </>
  );
};
