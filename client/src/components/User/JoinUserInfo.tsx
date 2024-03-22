import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import * as A from '../../api/user';

import * as R from '../EmailVerification/Verification.style';
import * as G from '../../styles/globalCSS';

export const JoinUserInfo: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [nickName, setNickName] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');

  const [isNickName, setIsNickName] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isBirth, setIsBirth] = useState(false);
  const [isGender, setIsGender] = useState(false);

  const [nickNameMsg, setNickNameMsg] = useState('');
  const [nameMsg, setNameMsg] = useState('');
  const [birthMsg, setBirthMsg] = useState('');
  const [genderMsg, setGenderMsg] = useState('');

  const nickRegex = /^[a-zA-Z0-9가-힣]{2,10}$/;
  const nameRegex = /^[a-zA-Z가-힣]{2,10}$/;

  const nickNameCheck = async (s: string) => {
    setNickName(s);

    if (nickRegex.test(s)) {
      
      await A.nickNameCheck(
        s,
        (response) => {
          if(typeof response.data === 'string'){
            if(response.data === '중복닉네임없음'){
              setIsNickName(true);
              setNickNameMsg('');
            }else{
              setIsNickName(false);
              setNickNameMsg('이미 사용 중인 닉네임입니다.');
            }
          }else{
            setIsNickName(false);
            setNickNameMsg('통신 오류! 다시시도');
          }
        },
        () => { 
          setIsNickName(false); 
          setNickNameMsg('통신 오류! 다시시도')
        }
      )
    } else {
      setIsNickName(false);
      setNickNameMsg(
        '영어 대/소문자, 숫자, 한글 자모음 조합, 2~10자 이내만 허용됩니다.'
      );
    }
  };

  // 이름 유효성 검사
  const nameCheck = async (s:string) => {
    setName(s);

    if(nameRegex.test(s)){
      setNameMsg('');
      setIsName(true);
    }else{
      setNameMsg('영어 대/소문자, 한글 자모음 조합, 2~10자 이내만 허용됩니다.');
      setIsName(false);
    }
  }

  // 생년월일 널값 체크
  const birthCheck = async (s:string) => {
    setBirth(s);

    if(s !== ''){
      setIsBirth(true);
      setBirthMsg('');
    }else{
      setIsBirth(false);
      setBirthMsg('생년월일을 선택하여주세요.');
    }
  }

  // 성별 체크박스 하나만. && 성별 널값 체크
  const checkBoxOne = (checkThis: React.ChangeEvent<HTMLInputElement>) => {
    const checkBoxes = document.getElementsByName(
      'checkbox'
    ) as NodeListOf<HTMLInputElement>;

    for (let i = 0; i < 2; i++) {
      if (checkBoxes[i] !== checkThis.target) {
        checkBoxes[i].checked = false;
      }
    }
    setGender(checkThis.target.defaultValue);

    if(checkThis.target.defaultValue !== ''){
      setIsGender(true);
      setGenderMsg('');
    }else{
      setIsGender(false);
      setGenderMsg('성별을 선택하여주세요.');
    }
  };

  // 뒤로.
  const back = () => {
    navigate('/join/pwset', { state: state });
  };

  // 회원가입
  const handleClick = async () => {

    if(!isNickName){
      setNickNameMsg('닉네임을 입력해주세요.')
    }else if(!isName){
      setNameMsg('이름을 입력해주세요.')
    }else if(!isBirth){
      setBirthMsg('생년월일을 선택해주세요.')
    }else if(!isGender){
      setGenderMsg('성별을 선택해주세요.')
    }else{
      const params = {
        email: state.email,
        password: state.pw,
        nickname: nickName,
        name: name,
        birth: birth,
        gender: gender,
      };
      
      await A.userJoin(
        params,
        () => { 
          navigate('/') },
        (error) => {console.log(error)}
      )

    }

    
    // navigate('/login');
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
          onChange={(e) => nickNameCheck(e.target.value)}
        />
        <G.InputError>{nickNameMsg}</G.InputError>
      </G.InputContainer>
      <G.InputContainer>
        <span>이름</span>
        <G.InputBox
          placeholder="이름"
          onChange={(e) => nameCheck(e.target.value)}
        />
        <G.InputError>{nameMsg}</G.InputError>
      </G.InputContainer>
      <G.InputContainer>
        <span>생년월일</span>
        <G.InputBox type="date" onChange={(e) => birthCheck(e.target.value)} />
        <G.InputError>{birthMsg}</G.InputError>
      </G.InputContainer>
      <G.InputContainerRow>
        <span>성별</span>
        <G.InputCheckBox
          value="남자"                     
          type="checkbox"
          name="checkbox"
          onChange={(e) => checkBoxOne(e)}
        />
        <span>남자</span>
        <G.InputCheckBox
          value="여자"
          type="checkbox"
          name="checkbox"
          onChange={(e) => checkBoxOne(e)}
        />
        <span>여자</span>
      </G.InputContainerRow>
        <G.InputError>{genderMsg}</G.InputError>
      <G.InputButtonDisabled onClick={back} className="mt-5">
        이전단계
      </G.InputButtonDisabled>
      <G.InputButtonActive className="mt-3" onClick={handleClick}>
        설정완료
      </G.InputButtonActive>
    </div>
  );
};
