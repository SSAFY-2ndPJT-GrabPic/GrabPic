import React from 'react';
import { Link } from 'react-router-dom';
import * as U from './UserInfo.style'
import subImg from '../../../assets/CollectDetail/subIcon.png'
import { OwnerInfoType } from '../../../type/UserType';
import { useSetRecoilState } from 'recoil';
import { headerState } from '../../../recoil/atoms/EncyHeaderState';

interface UserInfoProps {
  userInfo: OwnerInfoType
}

const UserInfo: React.FC<UserInfoProps> = ({ userInfo }) => {
  const setEncyLocate = useSetRecoilState(headerState)

  return (
    <U.Container>
      <U.InfoWrap>
        <Link to={`/encyclopedia/${userInfo.nickname}`} state={{ userId: userInfo.userId}} onClick={() => setEncyLocate('collection')}>
          <U.UserImg src={userInfo.profileImage} />
        </Link>
        <U.UserTxtWrap>
          <U.nickName to={`/encyclopedia/${userInfo.nickname}`} state={{ userId: userInfo.userId}} onClick={() => setEncyLocate('collection')}>
            {userInfo.nickname}
          </U.nickName>

          <U.subWrap>
            <U.subNum>{userInfo.subsCount}</U.subNum>
            <U.subIcon src={subImg} />
          </U.subWrap>
        </U.UserTxtWrap>
      </U.InfoWrap>

      <U.BackBtn to={`/encyclopedia/${userInfo.nickname}`} state={{ userId: userInfo.userId}} onClick={() => setEncyLocate('collection')}>뒤로가기</U.BackBtn>
    </U.Container> 
  );
};

export default UserInfo;