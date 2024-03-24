import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { headerState } from '../../recoil/atoms/EncyHeaderState';
import * as U from './UserCard.style';
import { Link } from 'react-router-dom';
import { userInfoState } from '../../recoil/atoms/UserState';

interface UserCardProps {}

const UserCard: React.FC<UserCardProps> = () => {
  const userInformation = useRecoilValue(userInfoState);
  const setEncyLocate = useSetRecoilState(headerState);

  return (
    <U.Container>
      <U.UserInfoWrap>
        <Link to="/setting">
          <U.ProfileImg src={userInformation.profilePicture} />
        </Link>

        <U.DetailInfo>
          <div className="flex items-center">
            <Link to="/setting">
              <U.NickName>{userInformation.nickname}</U.NickName>
            </Link>
            <U.DetailTypo>
              &nbsp; &nbsp;| 구독자 &nbsp;<b>{userInformation.subsCount}</b>{' '}
              &nbsp;명
            </U.DetailTypo>
          </div>
          <U.DetailTypo>{userInformation.email}</U.DetailTypo>
        </U.DetailInfo>
      </U.UserInfoWrap>

      <U.BtnsWrap>
        <U.Btn
          to={`/encyclopedia/${userInformation.nickname}`}
          onClick={() => setEncyLocate('chart')}
        >
          차트
        </U.Btn>
        <U.Btn
          to={`/encyclopedia/${userInformation.nickname}`}
          onClick={() => setEncyLocate('guestBook')}
        >
          방명록
        </U.Btn>
      </U.BtnsWrap>
    </U.Container>
  );
};

export default UserCard;
