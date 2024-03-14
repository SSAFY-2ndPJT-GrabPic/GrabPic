// import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as R from './Reset.style';
import * as G from '../../styles/globalCSS';

export default function ResetPwCode() {
  const navigate = useNavigate();

  const back = () => {
    navigate("/resetpw")
  };

  const handleClick = () => {
    navigate("/resetpw/set")
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row mt-10 items-center">
        <R.ResetTitle>인증코드 확인</R.ResetTitle>
        <R.ResetProgressContainer>
          <R.ResetProgressNo />
          <R.ResetProgressYes className="mr-3" />
          <R.ResetProgressNo className="mr-3" />
        </R.ResetProgressContainer>
      </div>
      <div className="flex flex-col mt-3">
        <R.ResetText>입력한 이메일로 인증코드가 전송되었습니다.</R.ResetText>
        <R.ResetText>확인 후 인증코드를 입력해주세요.</R.ResetText>
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
