import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as R from './Reset.style';
import * as G from '../../styles/globalCSS';

const ResetPwEmail : React.FC = () => {
  const navigate = useNavigate();

  // 이메일 입력 상태 관리
  const [email, setEmail] = useState('');
  // 입력된 이메일의 유효성 여부를 나타내는 상태
  const [isEmailValid, setIsEmailValid] = useState(false);

  // 이메일 유효성 검사 함수
  const validateEmail  = () => {
    // 이메일 유효성 검사 로직을 여기에 구현합니다.
    // 예를 들어, 정규 표현식을 사용하여 이메일 형식을 검증할 수 있습니다.
    return true;
  };
  // 버튼 클릭 시 이벤트 핸들러
  const handleClick = () => {
    // 이메일 유효성 검사를 수행합니다.
    if (validateEmail()) {
      // 원하는 조건을 충족하면 경로를 이동합니다.
      navigate('/resetpw/code');
    } else {
      // 유효성 검사에 실패한 경우 사용자에게 알림을 표시할 수 있습니다.
      setIsEmailValid(true);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-row mt-10 items-center">
        <R.ResetTitle>이메일 입력</R.ResetTitle>
        <R.ResetProgressContainer>
          <R.ResetProgressNo />
          <R.ResetProgressNo className="mr-3" />
          <R.ResetProgressYes className="mr-3" />
        </R.ResetProgressContainer>
      </div>
      <div className="flex flex-col mt-3">
        <R.ResetText>가입한 이메일을 입력해주세요.</R.ResetText>
        <R.ResetText>본인 인증을 위한 메일을 전송해드립니다.</R.ResetText>
      </div>
      <G.InputContainer className="mt-20">
        <span>이메일</span>
        <G.InputBox
          placeholder="test@test.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {isEmailValid && <G.InputError>test</G.InputError>}
      </G.InputContainer>
      <G.InputButtonActive onClick={handleClick}>인증코드 전송</G.InputButtonActive>
    </div>
  );
}

export default ResetPwEmail;