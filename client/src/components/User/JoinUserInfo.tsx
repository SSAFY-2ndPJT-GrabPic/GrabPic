import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as R from '../emailVerification/Verification.style';
import * as G from '../../styles/globalCSS';

export const JoinUserInfo: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [nickName, setNickName] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');

  const checkBoxOne = (checkThis: React.ChangeEvent<HTMLInputElement>) => {    
    const checkBoxes = document.getElementsByName('checkbox')  as NodeListOf<HTMLInputElement>;

    for(let i = 0; i<2;i++){
      if(checkBoxes[i] !== checkThis.target){
        checkBoxes[i].checked = false;
      }
    }
    setGender(checkThis.target.defaultValue);
  }

  const back = () => {
    navigate('/join/pwset', { state: state });
  };

  const handleClick = () => {
    const newState = {
      ...state,
      nickName: nickName,
      name: name,
      birth: birth,
      gender: gender,
    };
    console.log(newState);
    navigate('/login');
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row mt-10 items-center">
        <R.VerificationTitle>회원정보 입력</R.VerificationTitle>
        <R.VerificationProgressContainer>
          <R.VerificationProgressYes />
          <R.VerificationProgressNo className="mr-2" />
          <R.VerificationProgressNo className="mr-2" />
          <R.VerificationProgressNo className="mr-2" />
        </R.VerificationProgressContainer>
      </div>
      <G.InputContainer className="mt-10">
        <span>닉네임</span>
        <G.InputBox
          placeholder="닉네임"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
        />
        {/* <G.InputError>test</G.InputError> */}
      </G.InputContainer>
      <G.InputContainer>
        <span>이름</span>
        <G.InputBox
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* <G.InputError>test</G.InputError> */}
      </G.InputContainer>
      <G.InputContainer>
        <span>생년월일</span>
        <G.InputBox
          type='date'
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
        />
        {/* <G.InputError>test</G.InputError> */}
      </G.InputContainer>
      <G.InputContainerRow>
        <span>성별</span>
        <G.InputCheckBox value="남자" type='checkbox' name='checkbox' onChange={(e) => checkBoxOne(e)}/>
        <span>남자</span>
        <G.InputCheckBox value="여자" type='checkbox' name='checkbox' onChange={(e) => checkBoxOne(e)}/>
        <span>여자</span>
      </G.InputContainerRow>
      <G.InputButtonDisabled onClick={back} className='mt-5'>이전단계</G.InputButtonDisabled>
      <G.InputButtonActive className="mt-3" onClick={handleClick}>
        설정완료
      </G.InputButtonActive>
    </div>
  );
};
