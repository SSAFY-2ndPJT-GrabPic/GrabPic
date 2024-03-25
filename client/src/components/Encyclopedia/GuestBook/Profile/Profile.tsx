import React, { useEffect, useState } from 'react';
import * as P from './Profile.style';
import { getUserInfo } from '../../../../api/user';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoState } from '../../../../recoil/atoms/UserState';
import { cancelSubscribe, checkIsSub, wantSubscribe } from '../../../../api/subscribe';
import { OwnerInfoType } from '../../../../type/UserType';
import { useNavigate } from 'react-router-dom';
import SubListModal from './SubListModal';
import { guestBookModalState } from '../../../../recoil/atoms/GuestBookModalState';

interface ProfileProps {
  userId: number;
}

const Profile: React.FC<ProfileProps> = ({ userId }) => {
  const myInfo = useRecoilValue(userInfoState);     // 내 정보
  // 지금 보고 있는 도감 주인에 대한 사용자 정보
  const [ownerInfo, setOwnerInfo] = useState<OwnerInfoType>({ 
    userId: 0,
    nickname: '',
    gender: '',
    profileImage: '',
    subsCount: 0,
    collectCount: 0,
  });

  const [isMine, setIsMine] = useState<boolean>(false);  // 내 도감인지 판별
  const [isSub, setIsSub] = useState<boolean>(false);    // 구독한 사용자인지 판별

  useEffect(() => {
    if (userId === myInfo.userId) {   // 내 도감 O -> user정보 갱신 + 내 도감임을 표시
      setIsMine(true);
      setOwnerInfo(myInfo);
    } 
    
    else {
      setIsMine(false);               // 내 도감 X -> 타 유저 정보 조회 및 갱신

      getUserInfo(userId)             
        .then((res: OwnerInfoType) => {
          setOwnerInfo(res);
        })
        .catch((err) => console.error(err));

      checkIsSub(userId)              // 해당 사용자를 구독했는지 판별 및 갱신
        .then((res) => {
          setIsSub(res);
        })
        .catch((err) => console.error(err));
    }
    console.log(isMine)
  }, [userId]);

  // 내 도감 O : 회원정보 수정 버튼 컬러
  // 내 도감 X & 구독 O : 구독 중 버튼 컬러
  // 내 도감 X & 구독 X : 구독하기 버튼 컬러
  const btnColor = (() => {
    if (isMine) {
      return { backgroundColor: '#BDBDBD', color: '#FFFFFF' };
    } else if (isSub) {
      return { backgroundColor: '#50940C', color: '#FFFFFF' };
    } else {
      return { backgroundColor: '#B2EB78', color: '#5C5C5C' };
    }
  })();

  const navigate = useNavigate();

  // 내 도감인지, 구독한 사용자인지 여부에 따라 <P.SubBtn> 발생 이벤트 변경
  const subBtnHandler = (() => {
    if (isMine) {
      navigate('/userinfo')
      return 
    } 
    
    else if (isSub) {
      cancelSubscribe(ownerInfo.userId)
      .then((res) => {
        setIsSub(false)
        setOwnerInfo({
          ...ownerInfo,
          subsCount: res.ownerSubCount
        })
      })
      .catch((err) => alert(err))

      return
    } 
    
    else {
      wantSubscribe(ownerInfo.userId)
      .then((res) => {
        setIsSub(true)
        setOwnerInfo({
          ...ownerInfo,
          subsCount: res.ownerSubCount
        })
      })
      .catch((err) => alert(err))

      return
    }  
  })

  const [isOpen, setIsOpen] = useRecoilState(guestBookModalState)

  return (
    <P.Container>
      {isOpen.what && <SubListModal/>}
      <P.UserContainer>
        <P.ProfileImg src={ownerInfo.profileImage} />
        <P.NickName>{ownerInfo.nickname}</P.NickName>
      </P.UserContainer>
      <P.SubContainer>
        <P.TxtContainer>
          <div>
            <P.NumTxt>{ownerInfo.collectCount}</P.NumTxt>
            <P.ExplainTxt>수집 수</P.ExplainTxt>
          </div>
          <div onClick={() => setIsOpen({ what: 'ency', userId: ownerInfo.userId})}>
            <P.NumTxt>{ownerInfo.subsCount}</P.NumTxt>
            <P.ExplainTxt>구독 도감</P.ExplainTxt>
          </div>
          <div onClick={() => setIsOpen({ what: 'user', userId: ownerInfo.userId})}>
            <P.NumTxt>{ownerInfo.subsCount}</P.NumTxt>
            <P.ExplainTxt>구독자</P.ExplainTxt>
          </div>
        </P.TxtContainer>
        <P.SubBtn style={btnColor} onClick={() => subBtnHandler()}>
          {isMine ? '회원 정보 수정' : isSub ? '구독 중' : '구독하기'}
        </P.SubBtn>
      </P.SubContainer>
    </P.Container>
  );
};

export default Profile;
