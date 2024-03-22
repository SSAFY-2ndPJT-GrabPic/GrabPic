import { useEffect, useState } from 'react';
import * as M from './Modal.style';
import { useRecoilValue, useRecoilState } from 'recoil';
import * as R from '../../recoil/atoms/SettingState';
import { isLoginState } from '../../recoil/atoms/UserState';
import { useNavigate } from 'react-router';

export const Modal: React.FC = () => {
  const [modalTitle, setModalTitle] = useState('정말 로그아웃하시겠습니까?');
  const [modalText, setModalText] = useState('');

  const [,setIsLogin] = useRecoilState(isLoginState);
  const [isModal, setIsModal] = useRecoilState(R.isModalState);
  const isModalNo = useRecoilValue(R.isModalNo);

  const navgiate = useNavigate();

  useEffect(() => {
    if (isModalNo === 0){
      setModalTitle('오류가 발생하였습니다.');
      setModalText('잠시후 다시 시도해주세요.');
      setOneBtn(true);
    } else if (isModalNo === 1) {
      setModalTitle('정말 로그아웃 하시겠습니까?');
      setModalText('');
    } else if (isModalNo === 2) {
      setModalTitle('정말 탈퇴하시겠습니까?');
      setModalText('회원 정보는 모두 삭제됩니다.');
    } else if (isModalNo === 3){
      setModalTitle('정말 취소하시겠습니까?');
      setModalText('');
    }
  }, [isModal, isModalNo]);

  const modalBtnNoClick = () => {
    setIsModal(false);
  };

  const modalBtnYesClick = () => {
    setIsModal(false);
    if(isModalNo === 1 || isModalNo === 2){
      localStorage.removeItem("accessToken");
      localStorage.removeItem("recoil-persist");
      setIsLogin(false);
    }else if(isModalNo === 3){
      navgiate('/camera')
    }

  };

  return (
    isModal && (
      <M.modalContainer>
        <M.modalBox>
          <M.modalTitle>{modalTitle}</M.modalTitle>
          <M.modalText>{modalText}</M.modalText>

          <div className="flex flex-row mt-10">
            <div className="flex flex-row w-1/2 justify-center">
              <M.modalNoBtn onClick={modalBtnNoClick}>취소</M.modalNoBtn>
            </div>
            <div className="flex flex-row w-1/2 justify-center">
              <M.modalYesBtn onClick={modalBtnYesClick}>확인</M.modalYesBtn>
            </div>
          </div>
        </M.modalBox>
      </M.modalContainer>
    )
  );
};
