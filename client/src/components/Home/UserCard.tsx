import * as U from './UserCard.style'
import React from 'react';

interface UserCardProps {}

const userInfo = {
  nickname: "해진해뜸",
  sub: 529,
  email: "sun@ssafy.com"
}

const UserCard: React.FC<UserCardProps> = () => {
  return (
    <U.Container>
      <U.UserInfoWrap>
        <U.ProfileImg src="src/assets/Home/Profile.png" />
        
        <U.DetailInfo>
          <div className='flex items-center'>
            <U.NickName>{userInfo.nickname}</U.NickName>
            <U.DetailTypo>&nbsp; &nbsp;| 구독자 &nbsp;<b>{userInfo.sub}</b> &nbsp;명</U.DetailTypo>
          </div>
          <U.DetailTypo>{userInfo.email}</U.DetailTypo>
        </U.DetailInfo>
      </U.UserInfoWrap>

      <U.BtnsWrap>
        <U.Btn to='/encyclopedia'>차트</U.Btn>
        <U.Btn to='/encyclopedia'>컬렉션</U.Btn>
      </U.BtnsWrap>
    </U.Container>
  );
};

export default UserCard;