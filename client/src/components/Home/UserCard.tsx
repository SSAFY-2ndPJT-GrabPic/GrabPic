import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { headerState } from '../../recoil/atoms/EncyHeaderState'
import * as U from './UserCard.style'
import { Link } from 'react-router-dom';
import { userInfo } from '../../recoil/atoms/UserState';

// const userInfo = {
//   nickname: "해진해뜸",
//   profileImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMWgn_TKOeao6JafiNJb9MoJVTfF9zsmNAlRygzSuCbCjeqUjV',
//   sub: 529,
//   email: "sun@ssafy.com"
// }

interface UserCardProps {}

const UserCard: React.FC<UserCardProps> = () => {
  const userInformation = useRecoilValue(userInfo)
  const setEncyLocate = useSetRecoilState(headerState)

  return (
    <U.Container>
      <U.UserInfoWrap>
        <Link to='/setting'>
          <U.ProfileImg src={userInformation.profilePicture}/>
        </Link>
        
        <U.DetailInfo>
          <div className='flex items-center'>
            <Link to='/setting'>
              <U.NickName>{userInformation.nickName}</U.NickName>
            </Link>
            <U.DetailTypo>&nbsp; &nbsp;| 구독자 &nbsp;<b>{userInformation.subsCount}</b> &nbsp;명</U.DetailTypo>
          </div>
          <U.DetailTypo>{userInformation.email}</U.DetailTypo>
        </U.DetailInfo>
      </U.UserInfoWrap>

      <U.BtnsWrap>
        <U.Btn to={`/encyclopedia/${userInformation.nickName}`} onClick={() => setEncyLocate('chart')}>차트</U.Btn>
        <U.Btn to={`/encyclopedia/${userInformation.nickName}`} onClick={() => setEncyLocate('guestBook')}>방명록</U.Btn>
      </U.BtnsWrap>
    </U.Container>
  );
};

export default UserCard;