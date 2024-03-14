import { useNavigate } from 'react-router-dom';
import * as R from './Reset.style';
import * as G from '../../styles/globalCSS';

export default function ResetPwSet() {
  const navigate = useNavigate();

  const back = () => {
    navigate('/resetpw/code');
  };

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row mt-10 items-center">
        <R.ResetTitle>비밀번호 재설정</R.ResetTitle>
        <R.ResetProgressContainer>
          <R.ResetProgressYes />
          <R.ResetProgressNo className="mr-3" />
          <R.ResetProgressNo className="mr-3" />
        </R.ResetProgressContainer>
      </div>
      <div className="flex flex-col mt-3">
        <R.ResetText>새로 설정한 비밀번호를 입력해주세요.</R.ResetText>
        <R.ResetText>비밀번호는 아래 조건을 만족해야 합니다.</R.ResetText>
        <R.ResetTextGreen className='mt-2'>조건 : 소문자,숫자,특수문자를 포함한 8자리 이상</R.ResetTextGreen>
      </div>
      <G.InputContainer className="mt-14">
        <span>인증코드</span>
        <div className="flex flex-row">
          <G.InputBox placeholder="인증코드" className='grow'/>
          <G.InputButtonSmall>재전송</G.InputButtonSmall>
        </div>
        {/* <G.InputError>test</G.InputError> */}
      </G.InputContainer>
      <G.InputButtonDisabled onClick={back}>이전단계</G.InputButtonDisabled>
      <G.InputButtonActive className='mt-3' onClick={handleClick}>설정완료</G.InputButtonActive>
    </div>
  );
}
