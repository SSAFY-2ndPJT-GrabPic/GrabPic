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
      registEncy(dummyData)
      .then(() => {
        setEncyLocate('collection')
        navigate(`/encyclopedia/${userInfo.nickname}`, { state: { userId: userInfo.userId} })
      })
    }

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
            <E.RegistName className='mt-2'>고양이</E.RegistName>
        </div>
        <E.ObjectInfoContainer className='mt-5'>
            <E.ObjectTitle>개체설명</E.ObjectTitle>
            <E.ObjectContent>  개체설명이다이건 개체설명이다이건 개체설명이다이건 개체설명이다이건 개체설명이다이건 개체설명이다이건 개체설명이다</E.ObjectContent>
            <E.ObjectLine></E.ObjectLine>
        </E.ObjectInfoContainer>
        <E.ObjectInfoContainer className='mt-5'>
            <E.ObjectTitle>수집일자</E.ObjectTitle>
            <E.ObjectContent> </E.ObjectContent>
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
