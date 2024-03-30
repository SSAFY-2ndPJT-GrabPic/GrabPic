import React, { useRef } from 'react';
import { useState } from 'react';
import * as M from './ModifyUserInfo.style';

import profileUrl from '../../assets/icon/profile.png';

import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/atoms/UserState';

import closeIcon from '../../assets/icon/close.png'
import changeIcon from '../../assets/icon/change.png'

export const ModifyUserInfo: React.FC = () => {

  const userInfo = useRecoilValue(userInfoState);


  // 이미지 선택
  const inputImgRef = useRef<HTMLInputElement>(null);
  const [profileImg, setProfileImg] = useState(userInfo.profileImage);

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
      <div className="flex flex-row items-center self-center mt-5">
        <M.InfoClose to={'/setting'}>
            <img src={closeIcon} alt="" />
        </M.InfoClose>
        <M.MainTitle>회원정보 수정</M.MainTitle>
        </div>
      <div className="flex mt-10 items-center self-center">
        <form>
          <M.ProfileImg src={profileImg || profileUrl} onClick={() => inputImgRef.current?.click()}/>
          <M.ProfileImgInput
            type="file"
            accept="image/jpg,impge/png,image/jpeg"
            ref={inputImgRef}
            onChange={imageChange}
          />
        </form>
      </div>
      <M.InfoContainer className='mt-5'>
        <M.InfoTitel>이름</M.InfoTitel>
        <M.InfoText>{userInfo.name}</M.InfoText>
      </M.InfoContainer>
      <M.InfoContainer>
        <M.InfoTitel>이메일</M.InfoTitel>
        <M.InfoText>{userInfo.email}</M.InfoText>
      </M.InfoContainer>
      <M.InfoContainer>
        <M.InfoTitel>닉네임</M.InfoTitel>
        <M.InfoText>{userInfo.nickname}</M.InfoText>
        <M.ChangeBtn><img src={changeIcon}/></M.ChangeBtn>
      </M.InfoContainer>
      <M.InfoContainer>
        <M.InfoTitel>비밀번호</M.InfoTitel>
        <M.InfoText>변경하기</M.InfoText>
        <M.ChangeBtn><img src={changeIcon}/></M.ChangeBtn>
      </M.InfoContainer>
      <M.InfoContainer>
        <M.InfoTitel>생년월일</M.InfoTitel>
        <M.InfoText>{userInfo.birth}</M.InfoText>
      </M.InfoContainer>
      <M.InfoContainer>
        <M.InfoTitel>성별</M.InfoTitel>
        <M.InfoText>{userInfo.gender}</M.InfoText>
      </M.InfoContainer>
    </div>
  );
};
