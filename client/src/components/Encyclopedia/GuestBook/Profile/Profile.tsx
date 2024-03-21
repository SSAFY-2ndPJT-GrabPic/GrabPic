import React, { useEffect } from 'react';
// import { Link } from "react-router-dom";
import * as P from './Profile.style';
import { useParams } from 'react-router-dom';
import { getUserInfo } from '../../../../api/user';

const userInfo = {
  isMine: false,
  isSub: false,
  nickname: "해진해뜸",
  profileImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMWgn_TKOeao6JafiNJb9MoJVTfF9zsmNAlRygzSuCbCjeqUjV',
  collect: 417,
  sub: 529,
  email: "sun@ssafy.com"
}

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const { userId = '' } = useParams<string>();

  useEffect(() => {
    getUserInfo(userId)
      .then((res) => {
        console.log(res);
      })
  })


  const btnColor = (() => {
    if (userInfo.isMine) {
      return { backgroundColor: '#BDBDBD', color: '#FFFFFF'}
    } else if (userInfo.isSub) {
      return { backgroundColor: '#50940C', color: '#FFFFFF'}
    } else {
      return { backgroundColor: '#B2EB78', color: '#5C5C5C'}
    }
  })();

  return (
    <P.Container>
      <P.UserContainer>
        <P.ProfileImg src={userInfo.profileImgUrl} />
        <P.NickName>{userInfo.nickname}</P.NickName>
      </P.UserContainer>
      <P.SubContainer>
        <P.TxtContainer>
          <div>
            <P.NumTxt>{userInfo.collect}</P.NumTxt>
            <P.ExplainTxt>수집 수</P.ExplainTxt>
          </div>
          <div>
            <P.NumTxt>{userInfo.sub}</P.NumTxt>
            <P.ExplainTxt>구독자 수</P.ExplainTxt>
          </div>
        </P.TxtContainer>
        <P.SubBtn style={btnColor}>{userInfo.isMine ? '회원 정보 수정' : userInfo.isSub ? '구독 중' : '구독하기'}</P.SubBtn>
      </P.SubContainer>
    </P.Container>
  );
};

export default Profile;
