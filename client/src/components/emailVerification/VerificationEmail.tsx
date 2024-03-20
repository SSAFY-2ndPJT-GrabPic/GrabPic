import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as R from './Verification.style';
import * as G from '../../styles/globalCSS';

import { emailVerification } from '../../api/user';

const ResetPwEmail: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isJoinPage, setIsJoinPage] = useState(false);
  const [emailText, setEmailText] = useState('가입한 이메일을 입력해주세요.');

  const emailReg =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

  // 이메일 입력 상태 관리
  const [email, setEmail] = useState('');
  // 입력된 이메일의 유효성 여부를 나타내는 상태
  const [isEmailValid, setIsEmailValid] = useState(false);

  useEffect(() => {
    if (state.page == 'join') {
      setIsJoinPage(true);
      setEmailText('가입할 이메일을 입력해주세요.');
    }
  }, [state.page]); // 빈 배열을 넣어 초기 렌더링 시에만 실행되도록 설정합니다.

  // 이메일 유효성 검사 함수
  const validateEmail = (s: string) => {
    // 이메일 유효성 검사 로직을 여기에 구현합니다.
    // 예를 들어, 정규 표현식을 사용하여 이메일 형식을 검증할 수 있습니다.
    setEmail(s);
    setIsEmailValid(emailReg.test(s));
    return setIsEmailValid;
  };

  // 버튼 클릭 시 이벤트 핸들러
  const handleClick = async () => {

    if(!isEmailValid) return;

    // 요청에 필요한 파라미터 설정
    const params = { email: email, type: isJoinPage ? 1 : 2 };

    // emailVerification 함수 호출
    await emailVerification(
      params,
      () => {
        // 성공 시 처리하는 로직 작성
        const newState = { ...state, email: email };
        navigate(`/${state.page}/code`, { state: newState });
      },
      (error) => {
        // 에러 시 처리하는 로직 작성
        console.error('에러:', error);
      }
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row mt-10 items-center">
        <R.VerificationTitle>이메일 입력</R.VerificationTitle>
        <R.VerificationProgressContainer>
          <R.VerificationProgressNo />
          {isJoinPage && <R.VerificationProgressNo className="mr-2" />}
          <R.VerificationProgressNo className="mr-2" />
          <R.VerificationProgressYes className="mr-2" />
        </R.VerificationProgressContainer>
      </div>
      <div className="flex flex-col mt-3">
        <R.VerificationText>{emailText}</R.VerificationText>
        <R.VerificationText>
          본인 인증을 위한 메일을 전송해드립니다.
        </R.VerificationText>
      </div>
      <G.InputContainer className="mt-20">
        <span>이메일</span>
        <G.InputBox
          placeholder="test@test.com"
          onChange={(e) => validateEmail(e.target.value)}
        />
        {!isEmailValid && (
          <G.InputError>이메일의 형식이 올바르지 않습니다!</G.InputError>
        )}
      </G.InputContainer>
      <G.InputButtonActive onClick={handleClick}>
        인증코드 전송
      </G.InputButtonActive>
    </div>
  );
};

export default ResetPwEmail;
