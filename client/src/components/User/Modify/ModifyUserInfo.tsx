import React, { useRef } from 'react';
import { useState } from 'react';
import * as M from './ModifyUserInfo.style';

import { changeProfileImg } from '../../../api/user';

import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../../recoil/atoms/UserState';

import profileUrl from '../../../assets/icon/profile.png';
import changeIcon from '../../../assets/icon/change.png';
import { useNavigate } from 'react-router';

import { useSetRecoilState } from 'recoil';
import * as S from '../../../recoil/atoms/SettingState'

export const ModifyUserInfo: React.FC = () => {
  const userInfo = useRecoilValue(userInfoState);
  const navigate = useNavigate();

  const setIsModal = useSetRecoilState<boolean>(S.isModalState);
  const setIsModalNo = useSetRecoilState<number>(S.isModalNo);

  // 이미지 선택
  const inputImgRef = useRef<HTMLInputElement>(null);
  const [profileImg, setProfileImg] = useState(userInfo.profileImage);

  // 이미지 선택 후 이미지 미리보기 변경.
  const imageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      await changeProfileImg(
        formData,
        () => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setProfileImg(reader.result as string);
          };
          reader.readAsDataURL(file);
          setIsModal(true);
          setIsModalNo(7);
        },
        () => {
          setIsModal(true);
          setIsModalNo(9);
        }
      );
    }
  };

  const changeMove = (e: number) => {
    if (e === 1) navigate('/userinfo/nick');
    else navigate('/userinfo/pw');
  };

  return (
    <div className="flex flex-col">
      <div className="flex mt-10 items-center self-center">
        <form>
          <M.ProfileImg
            src={profileImg || profileUrl}
            onClick={() => inputImgRef.current?.click()}
          />
          <M.ProfileImgInput
            type="file"
            accept="image/jpg,impge/png,image/jpeg"
            ref={inputImgRef}
            onChange={imageChange}
          />
        </form>
      </div>
      <M.InfoContainer className="mt-5">
        <M.InfoTitel>이름</M.InfoTitel>
        <M.InfoText>{userInfo.name}</M.InfoText>
      </M.InfoContainer>
      <M.InfoContainer>
        <M.InfoTitel>이메일</M.InfoTitel>
        <M.InfoText>{userInfo.email}</M.InfoText>
      </M.InfoContainer>
      <M.InfoContainer
        onClick={() => {
          changeMove(1);
        }}
      >
        <M.InfoTitel>닉네임</M.InfoTitel>
        <M.InfoText>{userInfo.nickname}</M.InfoText>
        <M.ChangeBtn>
          <img src={changeIcon} />
        </M.ChangeBtn>
      </M.InfoContainer>
      <M.InfoContainer
        onClick={() => {
          changeMove(2);
        }}
      >
        <M.InfoTitel>비밀번호</M.InfoTitel>
        <M.InfoText>변경하기</M.InfoText>
        <M.ChangeBtn>
          <img src={changeIcon} />
        </M.ChangeBtn>
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
