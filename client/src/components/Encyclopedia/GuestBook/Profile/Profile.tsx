import React, { useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import * as P from './Profile.style';
// import { useParams } from 'react-router-dom';
import { getUserInfo } from '../../../../api/user';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../../../recoil/atoms/UserState';
import { checkIsSub } from '../../../../api/subscribe';

interface OwnerInfo {
  userId: number;
  nickname: string;
  gender: string;
  profilePicture: string;
  subsCount: number;
}

interface ProfileProps {
  userId: number;
}

const Profile: React.FC<ProfileProps> = ({ userId }) => {
  const myInfo = useRecoilValue(userInfoState);
  const [ownerInfo, setOwnerInfo] = useState<OwnerInfo>({
    userId: 0,
    nickname: '',
    gender: '',
    profilePicture: '',
    subsCount: 0,
  });

  const [isMine, setIsMine] = useState<boolean>(false);
  const [isSub, setIsSub] = useState<boolean>(false);

  useEffect(() => {
    if (userId === myInfo.userId) {
      console.log(userId, myInfo.userId)
      setOwnerInfo(myInfo);
      setIsMine(true);
    } else {
      getUserInfo(userId)
        .then((res: OwnerInfo) => {
          setOwnerInfo(res);
        })
        .catch((err) => console.error(err));

      checkIsSub(userId)
        .then((res) => {
          setIsSub(res);
        })
        .catch((err) => console.error(err));
    }
  }, [userId, myInfo]);

  const btnColor = (() => {
    if (isMine) {
      return { backgroundColor: '#BDBDBD', color: '#FFFFFF' };
    } else if (isSub) {
      return { backgroundColor: '#50940C', color: '#FFFFFF' };
    } else {
      return { backgroundColor: '#B2EB78', color: '#5C5C5C' };
    }
  })();

  return (
    <P.Container>
      <P.UserContainer>
        <P.ProfileImg src={ownerInfo.profilePicture} />
        <P.NickName>{ownerInfo.nickname}</P.NickName>
      </P.UserContainer>
      <P.SubContainer>
        <P.TxtContainer>
          <div>
            <P.NumTxt>{ownerInfo.subsCount}수정필요</P.NumTxt>
            <P.ExplainTxt>수집 수</P.ExplainTxt>
          </div>
          <div>
            <P.NumTxt>{ownerInfo.subsCount}</P.NumTxt>
            <P.ExplainTxt>구독자 수</P.ExplainTxt>
          </div>
        </P.TxtContainer>
        <P.SubBtn style={btnColor}>
          {isMine ? '회원 정보 수정' : isSub ? '구독 중' : '구독하기'}
        </P.SubBtn>
      </P.SubContainer>
    </P.Container>
  );
};

export default Profile;
