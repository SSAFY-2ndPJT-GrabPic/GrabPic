import React from 'react';
import { Link } from "react-router-dom";
import * as P from './Profile.style';

const userInfo = {
  nickname: "해진해뜸",
  profileImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMWgn_TKOeao6JafiNJb9MoJVTfF9zsmNAlRygzSuCbCjeqUjV',
  collect: 417,
  sub: 529,
  email: "sun@ssafy.com"
}

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
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
        <P.SubBtn>구독</P.SubBtn>
      </P.SubContainer>
    </P.Container>
  );
};

export default Profile;