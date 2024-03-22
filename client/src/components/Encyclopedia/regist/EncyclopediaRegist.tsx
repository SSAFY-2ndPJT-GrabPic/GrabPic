import { useLocation } from 'react-router';
import * as E from './EncyclopediaResgist.style';

import { useRecoilState } from 'recoil';
import * as R from '../../../recoil/atoms/SettingState';

export const EncyclopediaResgist: React.FC = () => {
    const {state} = useLocation();
    const image = state.image;

    const [,setIsModal] = useRecoilState<boolean>(R.isModalState);
    const [,setIsModalNo] = useRecoilState<number>(R.isModalNo);

    const cancelCilck = () => {
        setIsModal(true);
        setIsModalNo(3);
    }

    const registClick = () => {
        // const params = {}
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
