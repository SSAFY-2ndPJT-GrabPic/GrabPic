import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as R from '../EmailVerification/Verification.style';
import * as G from '../../styles/globalCSS';
import * as M from './ModifyUserInfo.style';

import profileUrl from '../../assets/icon/profile.png';

export const ModifyUserInfo: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [nickName, setNickName] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');

  // 이미지 선택
  const inputImgRef = useRef<HTMLInputElement>(null);
  const [profileImg, setProfileImg] = useState<string | null>(null);

  // 성별 체크. 회원정보 수정 페이지에서는 추후 삭제.
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
  };

  // 설정 완료 후 서버 전송용 데이터
  const handleClick = () => {
    const newState = {
      ...state,
      nickName: nickName,
      name: name,
      birth: birth,
      gender: gender,
    };
    console.log(newState);
    navigate('/');
  };

  // 이미지 선택 후 이미지 미리보기 변경.
  const imageChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file){
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result as string);
      }
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row mt-10 items-center">
        <R.VerificationTitle>회원정보 수정</R.VerificationTitle>
      </div>
      <div className="flex mt-10 items-center self-center">
        <form>
          <M.profileImg src={profileImg || profileUrl} onClick={() => inputImgRef.current?.click()}/>
          <M.profileImgInput
            type="file"
            accept="image/jpg,impge/png,image/jpeg"
            ref={inputImgRef}
            onChange={imageChange}
          />
        </form>
      </div>
      <G.InputContainer className="mt-6">
        <span>닉네임</span>
        <G.InputBox
          placeholder="닉네임"
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
          type="date"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
        />
        {/* <G.InputError>test</G.InputError> */}
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
      <G.InputButtonActive className="mt-3" onClick={handleClick}>
        설정완료
      </G.InputButtonActive>
    </div>
  );
};
