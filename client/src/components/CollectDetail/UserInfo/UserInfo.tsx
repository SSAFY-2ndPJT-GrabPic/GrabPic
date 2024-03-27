import React from 'react';
import * as U from './UserInfo.style'
import subImg from '../../../assets/CollectDetail/subIcon.png'
import { OwnerInfoType } from '../../../type/UserType';

interface UserInfoProps {
  userInfo: OwnerInfoType
}

const UserInfo: React.FC<UserInfoProps> = ({ userInfo }) => {
  return (
    <U.Container>
      <U.InfoWrap>
        <U.UserImg src={userInfo.profileImage} />
        <U.UserTxtWrap>
          <U.nickName>{userInfo.nickname}</U.nickName>
          <U.subWrap>
            <U.subNum>{userInfo.subsCount}</U.subNum>
            <U.subIcon src={subImg} />
          </U.subWrap>
        </U.UserTxtWrap>
      </U.InfoWrap>
      <U.BackBtn to={`/encyclopedia/${userInfo.nickname}`} state={{ userId: userInfo.userId}}>뒤로가기</U.BackBtn>
    </U.Container> 
  );
};

export default UserInfo;