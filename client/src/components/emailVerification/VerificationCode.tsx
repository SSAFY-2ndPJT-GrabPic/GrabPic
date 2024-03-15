// import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as R from './Verification.style';
import * as G from '../../styles/globalCSS';
import { useEffect, useState } from 'react';

export default function ResetPwCode() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isJoinPage,setIsJoinPage] = useState(false);

  useEffect(() => {
    if(state.page == 'join'){
      setIsJoinPage(true);
    }
  }, [state.page]); // 빈 배열을 넣어 초기 렌더링 시에만 실행되도록 설정합니다.

  const back = () => {
    navigate(`/${state.page}`, {state : state}); 
  };

  const handleClick = () => {
    navigate(`/${state.page}/pwset`, {state : state}); 
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row mt-10 items-center">
        <R.VerificationTitle>인증코드 확인</R.VerificationTitle>
        <R.VerificationProgressContainer>
          <R.VerificationProgressNo />
          {isJoinPage && <R.VerificationProgressNo className="mr-2" />}
          <R.VerificationProgressYes className="mr-2" />
          <R.VerificationProgressNo className="mr-2" />
        </R.VerificationProgressContainer>
      </div>
      <div className="flex flex-col mt-3">
        <R.VerificationText>입력한 이메일로 인증코드가 전송되었습니다.</R.VerificationText>
        <R.VerificationText>확인 후 인증코드를 입력해주세요.</R.VerificationText>
      </div>
      <G.InputContainer className="mt-20">
        <span>인증코드</span>
        <div className="flex flex-row">
          <G.InputBox placeholder="인증코드" className='grow'/>
          <G.InputButtonSmall>재전송</G.InputButtonSmall>
        </div>
        {/* <G.InputError>test</G.InputError> */}
      </G.InputContainer>
      <G.InputButtonDisabled onClick={back}>이전단계</G.InputButtonDisabled>
      <G.InputButtonActive className='mt-3' onClick={handleClick}>인증코드 전송</G.InputButtonActive>
    </div>
  );
}
