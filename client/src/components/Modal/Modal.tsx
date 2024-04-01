import { ChangeEvent, useEffect, useState } from 'react';
import * as M from './Modal.style';
import {  useRecoilState } from 'recoil';
import * as R from '../../recoil/atoms/SettingState';
import { isLoginState } from '../../recoil/atoms/UserState';
import { useNavigate } from 'react-router';

import * as U from '../../api/user';

export const Modal: React.FC = () => {
  const [modalTitle, setModalTitle] = useState('정말 로그아웃하시겠습니까?');
  const [modalText, setModalText] = useState('');

  const [, setIsLogin] = useRecoilState(isLoginState);
  const [isModal, setIsModal] = useRecoilState(R.isModalState);
  const [isModalNo,setIsModalNo] = useRecoilState(R.isModalNo);

  const [isDelete, setIsDelete] = useState(false);

  const navgiate = useNavigate();

  const [isOneBtn, setOneBtn] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState('');

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
    } else if (isModalNo === 6){
      setModalTitle('저장에 실패하였습니다.')
      setModalText('다시 시도해주세요.')
      setOneBtn(true);
    } else if (isModalNo === 7){
      setModalTitle('성공')
      setModalText('변경이 완료되었습니다.')
      setOneBtn(true);
    } else if (isModalNo === 8){
      setModalTitle('탈퇴 처리가 완료되었습니다.')
      setModalText('그동안 감사했습니다..')
      setOneBtn(true);
    } else if (isModalNo === 9){
      setModalTitle('오류가 발생하였습니다.');
      setModalText('처음부터 다시 시도해주세요.');
      setOneBtn(true);
    } else if (isModalNo === 10){
      setModalTitle('탈퇴된 회원입니다.')
      setModalText('다른 이메일로 로그인해주세요.')
      setOneBtn(true);
    } else if (isModalNo === 11){
      setModalTitle('인증코드가 재전송 되었습니다.')
      setModalText('인증코드를 입력하세요.')
      setOneBtn(true);
    } else if (isModalNo === 12){
      setModalTitle('회원가입 되었습니다.')
      setModalText('')
      setOneBtn(true);
    }
  }, [isModal, isModalNo]);

  const modalBtnNoClick = () => {
    setIsModal(false);
  };

  const modalBtnYesClick = async () => {
    setIsModal(false);
    if (isModalNo === 1) {
      await U.userLogout(
        () => {
          // localStorage.removeItem('accessToken');
          // localStorage.removeItem('recoil-persist');
          localStorage.clear();
          setIsLogin(false);
          navgiate('/login');
        },
        () => {
          setIsModalNo(9);
        }
      );
    } else if (isModalNo === 2){
      setIsModal(true);
      if(!isDelete) {
        setDeleteMsg('정확히 입력해주세요.')
        return ;
      }
      await U.userDelete(
        () => { 
          setDeleteMsg('');
          setIsDelete(false);
          setIsModalNo(8) 
        },
        () => { setIsModalNo(9) }
      )
    } else if (isModalNo === 3) {
      localStorage.removeItem('biologyId');
      localStorage.removeItem('boxXY');
      navgiate('/camera');
    } else if (isModalNo === 4) {
      navgiate('/resetpw', { state: { page: 'resetpw' } });
    } else if (isModalNo === 5){
      navgiate('/login');
    } else if (isModalNo === 8){
      localStorage.clear();
      setIsLogin(false);
      navgiate('/login');
    } 
  };

  const deleteInputChane = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.value === '회원 탈퇴를 진행합니다.'){
      setDeleteMsg('');
      setIsDelete(true);
    }else{
      setIsDelete(false);
    }
  }

  return (
    isModal && (
      <M.modalContainer>
        <M.modalBox>
          <M.modalTitle>{modalTitle}</M.modalTitle>
          <M.modalText>{modalText}</M.modalText>

          {isModalNo === 2 && (
            <>
              <div className='flex'>
                <M.modalDeleteTest>"회원 탈퇴를 진행합니다."</M.modalDeleteTest>
                <M.modalText>똑같이 입력하시오.</M.modalText>
              </div>
              <M.modalDeleteInput type='text' onChange={(e) => {deleteInputChane(e)}}/>
              <M.modalMsg>{deleteMsg}</M.modalMsg>
            </>
          )}

          {!isOneBtn && (
            <div className="flex flex-row mt-5">
              <div className="flex flex-row w-1/2 justify-center">
                <M.modalNoBtn onClick={modalBtnNoClick}>취소</M.modalNoBtn>
              </div>
              <div className="flex flex-row w-1/2 justify-center">
                <M.modalYesBtn onClick={modalBtnYesClick}>확인</M.modalYesBtn>
              </div>
            </div>
          )}
          {isOneBtn && (
            <div className="flex justify-center mt-5">
              <M.modalYesBtn onClick={modalBtnYesClick}>확인</M.modalYesBtn>
            </div>
          )}
        </M.modalBox>
      </M.modalContainer>
    )
  );
};
