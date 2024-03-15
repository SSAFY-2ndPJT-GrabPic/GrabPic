// import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as R from './Verification.style';
import * as G from '../../styles/globalCSS';

export default function ResetPwCode() {
  const navigate = useNavigate();
  console.log("coide")
  const back = () => {
    navigate("/resetpw")
  };

  const handleClick = () => {
    navigate("/resetpw/set")
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row mt-10 items-center">
        <R.VerificationTitle>인증코드 확인</R.VerificationTitle>
        <R.VerificationProgressContainer>
          <R.VerificationProgressNo />
          <R.VerificationProgressYes className="mr-3" />
          <R.VerificationProgressNo className="mr-3" />
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
