import {  useNavigate } from 'react-router-dom';
import * as R from '../../EmailVerification/Verification.style';
import * as G from '../../../styles/globalCSS';
import {  useState } from 'react';

import { passwordChange } from '../../../api/user';

import { useSetRecoilState } from 'recoil';
import * as S from '../../../recoil/atoms/SettingState';

export default function ChangePw() {
  const setIsModal = useSetRecoilState<boolean>(S.isModalState);
  const setIsModalNo = useSetRecoilState<number>(S.isModalNo);

  const navigate = useNavigate();

  // 입력 값
  const [pw, setPw] = useState('');
  const [, setCheckPw] = useState('');

  // 오류 메시지
  const [pwMsg, setPwMsg] = useState('');
  const [checkMsg, setCheckMsg] = useState('');

  // 입력이 정확한지 체크
  const [isPw, setIsPw] = useState(false);
  const [isCheckPw, setIsCheckPw] = useState(false);

  const pwRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

  // 비밀번호 유효성 검사
  const validatePw = (s: string) => {
    setPw(s);

    if (pwRegex.test(s)) {
      setIsPw(true);
      setPwMsg('');
    } else {
      setIsPw(false);
      setPwMsg('비밀번호 형식이 올바르지 않습니다!');
    }
  };

  // 비밀번호 재입력 검사
  const passwordDoubleCheck = (s: string) => {
    setCheckPw(s);

    if (s === pw) {
      setIsCheckPw(true);
      setCheckMsg('');
    } else {
      setIsCheckPw(false);
      setCheckMsg('비밀번호가 다릅니다.');
    }
  };

  const back = () => {
    navigate(-1);
  };

  const handleClick = async () => {
    // 비밀번호 입력 체크
    // 추후 에러메시지 강조 효과 주기.
    if (!isPw || !isCheckPw) {
      return;
    }

    await passwordChange(
      pw,
      () => {
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
      <div className="flex flex-col mt-7">
        <R.VerificationText>
          새롭게 설정할 비밀번호를 입력해주세요.
        </R.VerificationText>
        <R.VerificationText>
          비밀번호는 아래 조건을 만족해야 합니다.
        </R.VerificationText>
        <R.VerificationTextGreen className="mt-2">
          조건 : 대문자,소문자,숫자,특수문자를 포함한 8자리 이상
        </R.VerificationTextGreen>
      </div>
      <G.InputContainer className="mt-10">
        <span>비밀번호</span>
        <G.InputBox
          type="password"
          placeholder="비밀번호"
          onChange={(e) => validatePw(e.target.value)}
        />
        <G.InputError>{pwMsg}</G.InputError>
      </G.InputContainer>
      <G.InputContainer>
        <span>비밀번호 확인</span>
        <G.InputBox
          type="password"
          placeholder="비밀번호 재입력"
          onChange={(e) => passwordDoubleCheck(e.target.value)}
        />
        <G.InputError>{checkMsg}</G.InputError>
      </G.InputContainer>
      <G.InputButtonDisabled onClick={back}>취소</G.InputButtonDisabled>
      <G.InputButtonActive className="mt-3" onClick={handleClick}>
        설정완료
      </G.InputButtonActive>
    </div>
  );
}
