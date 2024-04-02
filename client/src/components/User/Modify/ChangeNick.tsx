import { useNavigate } from 'react-router-dom';
import * as R from '../../EmailVerification/Verification.style';
import * as G from '../../../styles/globalCSS';
import { useState } from 'react';

import * as U from '../../../api/user';

import { useRecoilState, useSetRecoilState } from 'recoil';
import * as S from '../../../recoil/atoms/SettingState';
import { userInfoState } from '../../../recoil/atoms/UserState';

export default function ChangeNick() {
  const setIsModal = useSetRecoilState<boolean>(S.isModalState);
  const setIsModalNo = useSetRecoilState<number>(S.isModalNo);
  const [userInfo,setUserInfo] = useRecoilState(userInfoState);

  const navigate = useNavigate();

  // 입력 값
  const [nick, setNick] = useState('');

  // 오류 메시지
  const [nickMsg, setNickMsg] = useState('');

  // 입력이 정확한지 체크
  const [isNick, setIsNick] = useState(false);

  const nickRegex = /^[a-zA-Z0-9가-힣]{2,10}$/;

  // 닉네임 유효성 검사
  const validateNick = async (s: string) => {
    setNick(s);

    if (nickRegex.test(s)) {
      await U.nickNameCheck(
        s,
        (response) => {
          if (typeof response.data === 'string') {
            if (response.data === '중복닉네임없음') {
              setIsNick(true);
              setNickMsg('');
            } else {
              setIsNick(false);
              setNickMsg('이미 사용 중인 닉네임입니다.');
            }
          } else {
            setIsNick(false);
            setNickMsg('통신 오류! 다시시도');
          }
        },
        () => {
          setIsNick(false);
          setNickMsg('통신 오류! 다시시도');
        }
      );
    } else {
      setIsNick(false);
      setNickMsg(
        '영어 대/소문자, 숫자, 한글 자모음 조합, 2~10자 이내만 허용됩니다.'
      );
    }
  };

  const back = () => {
    navigate(-1);
  };

  const handleClick = async () => {
    // 비밀번호 입력 체크
    // 추후 에러메시지 강조 효과 주기.

    if (!isNick) {
      setNickMsg('입력값을 확인하세요.');
      return;
    }


    // 회원가입, 비밀번호 재설정 페이지에 따라 이동이 다름.
    const params = {
      nickname : nick,
    }

    await U.userChange(
      params,
      () => {
        setUserInfo({...userInfo, nickname:nick});
        setIsModalNo(7);
        setIsModal(true);
        navigate(-1);
      },
      () => {
        setIsModalNo(4);
        setIsModal(true);
      }
    );
  };

  return (
    <div className="flex flex-col">
      <R.VerificationText className="mt-7">
        새롭게 설정할 닉네임을 입력해주세요.
      </R.VerificationText>
      <G.InputContainer className="mt-10">
        <span>닉네임</span>
        <G.InputBox
          type="text"
          placeholder="닉네임"
          onChange={(e) => validateNick(e.target.value)}
        />
        <G.InputError>{nickMsg}</G.InputError>
      </G.InputContainer>
      <G.InputButtonDisabled onClick={back}>취소</G.InputButtonDisabled>
      <G.InputButtonActive className="mt-3" onClick={handleClick}>
        설정완료
      </G.InputButtonActive>
    </div>
  );
}
