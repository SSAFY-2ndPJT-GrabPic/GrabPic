import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as U from './UserInfo.style'
import subImg from '../../../assets/CollectDetail/subIcon.png'
import { OwnerInfoType } from '../../../type/UserType';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { headerState } from '../../../recoil/atoms/EncyHeaderState';
import { backState } from '../../../recoil/atoms/DetailBackState';

interface UserInfoProps {
  userInfo: OwnerInfoType
}

const UserInfo: React.FC<UserInfoProps> = ({ userInfo }) => {
  const setEncyLocate = useSetRecoilState(headerState)
  const backWhereState = useRecoilValue(backState)
  const navigate = useNavigate();

  const backHandler = (isGuestBook: string) => {
    console.log(isGuestBook)
    if (isGuestBook) {
      navigate(`/encyclopedia/${userInfo.nickname}`, {
        state: { userId: userInfo.userId }
      });
      setEncyLocate('guestBook');
    } else if (backWhereState === 'collect') {
      navigate(`/encyclopedia/${userInfo.nickname}`, {state:{ userId: userInfo.userId}})
      setEncyLocate('collection')
    } else if (backWhereState === 'gallery') {
      navigate('/gallery')
    } else if (backWhereState === 'map') {
      navigate('/map')
    }
  }

  return (
    <U.Container>
      <U.InfoWrap>
        <U.UserImg src={userInfo.profileImage} onClick={() => backHandler('guestBook')} />

        <U.UserTxtWrap>
          <U.nickName onClick={() => backHandler('guestBook')}>
            {userInfo.nickname}
          </U.nickName>

          <U.subWrap>
            <U.subNum>{userInfo.subsCount}</U.subNum>
            <U.subIcon src={subImg} />
          </U.subWrap>
        </U.UserTxtWrap>
      </U.InfoWrap>

      <U.BackBtn onClick={() => backHandler('')}>뒤로가기</U.BackBtn>
    </U.Container> 
  );
};

export default UserInfo;