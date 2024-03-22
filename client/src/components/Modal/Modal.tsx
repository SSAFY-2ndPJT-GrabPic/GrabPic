import { useEffect, useState } from 'react';
import * as M from './Modal.style';
import { useRecoilValue, useRecoilState } from 'recoil';
import * as R from '../../recoil/atoms/SettingState';
import { isLoginState } from '../../recoil/atoms/UserState';
import { useNavigate } from 'react-router';

export const Modal: React.FC = () => {
  const [modalTitle, setModalTitle] = useState('정말 로그아웃하시겠습니까?');
  const [modalText, setModalText] = useState('');

  const [, setIsLogin] = useRecoilState(isLoginState);
  const [isModal, setIsModal] = useRecoilState(R.isModalState);
  const isModalNo = useRecoilValue(R.isModalNo);

  const navgiate = useNavigate();

  const [isOneBtn, setOneBtn] = useState(false);

  useEffect(() => {
    if (isModalNo === 0){
      setModalTitle('오류가 발생하였습니다.');
      setModalText('잠시후 다시 시도해주세요.');
      setOneBtn(true);
    } else if (isModalNo === 1) {
      setModalTitle('정말 로그아웃 하시겠습니까?');
      setModalText('');
      setOneBtn(false);
    } else if (isModalNo === 2) {
      setModalTitle('정말 탈퇴하시겠습니까?');
      setModalText('회원 정보는 모두 삭제됩니다.');
      setOneBtn(false);
    } else if (isModalNo === 3) {
      setModalTitle('정말 취소하시겠습니까?');
      setModalText('');
      setOneBtn(false);
    } else if (isModalNo === 4) {
      setModalTitle('오류가 발생하였습니다.');
      setModalText('처음부터 다시 시도해주세요.');
      setOneBtn(true);
    } else if (isModalNo === 5){
      setModalTitle('회원 정보가 일치하지 않습니다.')
      setModalText('다시 시도해주세요.')
      setOneBtn(true);
    }
  }, [isModal, isModalNo]);

  const modalBtnNoClick = () => {
    setIsModal(false);
  };

  const modalBtnYesClick = () => {
    setIsModal(false);
    if (isModalNo === 1 || isModalNo === 2) {
      localStorage.removeItem('accessToken');
      setIsLogin(false);
      navgiate('/login');
    } else if (isModalNo === 3) {
      navgiate('/camera');
    } else if (isModalNo === 4) {
      navgiate('/resetpw', { state: { page: 'resetpw' } });
    } else if (isModalNo === 5){
      navgiate('/login');
    }
  };

  return (
    isModal && (
      <M.modalContainer>
        <M.modalBox>
          <M.modalTitle>{modalTitle}</M.modalTitle>
          <M.modalText>{modalText}</M.modalText>

          {!isOneBtn && (
            <div className="flex flex-row mt-10">
              <div className="flex flex-row w-1/2 justify-center">
                <M.modalNoBtn onClick={modalBtnNoClick}>취소</M.modalNoBtn>
              </div>
              <div className="flex flex-row w-1/2 justify-center">
                <M.modalYesBtn onClick={modalBtnYesClick}>확인</M.modalYesBtn>
              </div>
            </div>
          )}
          {isOneBtn && (
            <div className="flex justify-center mt-7">
              <M.modalYesBtn onClick={modalBtnYesClick}>확인</M.modalYesBtn>
            </div>
          )}
        </M.modalBox>
      </M.modalContainer>
    )
  );
};
