import React from 'react';
import * as U from './UserInfo.style'
import subImg from '../../../assets/CollectDetail/subIcon.png'

interface UserInfoProps {
  userInfo: {
    nickName: string;
    profileImgUrl: string;
    subNum: number;
  };
}

const UserInfo: React.FC<UserInfoProps> = ({ userInfo }) => {
  return (
    <U.Container>
      <U.InfoWrap>
        <U.UserImg src={userInfo.profileImgUrl} />
        <U.UserTxtWrap>
          <U.nickName>{userInfo.nickName}</U.nickName>
          <U.subWrap>
            <U.subNum>{userInfo.subNum}</U.subNum>
            <U.subIcon src={subImg} />
          </U.subWrap>
        </U.UserTxtWrap>
      </U.InfoWrap>
      <U.BackBtn to={`/encyclopedia/${userInfo.nickName}`}>뒤로가기</U.BackBtn>
    </U.Container> 
  );
};

export default UserInfo;