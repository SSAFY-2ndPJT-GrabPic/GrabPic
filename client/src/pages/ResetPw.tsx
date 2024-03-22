import * as R from './ResetPw.style';
import { Routes, Route } from 'react-router-dom';
import VerificationEmail from '../components/EmailVerification/VerificationEmail';
import VerificationCode from '../components/EmailVerification/VerificationCode';
import VerificationSet from '../components/EmailVerification/VerificationPwSet';
import closeIcon from '../assets/icon/close.png'

export default function ResetPw() {
    return (
    <div className="flex flex-col px-6">
        <div className="flex flex-row items-center self-center mt-5">
        <R.Close to="/login">
            <img src={closeIcon} alt="" />
        </R.Close>
        <R.ResetPwText>비밀번호 재설정</R.ResetPwText>
        </div>
        <Routes>
        <Route index element={<VerificationEmail />} />
        <Route path="code" element={<VerificationCode />} />
        <Route path="pwset" element={<VerificationSet />} />
        </Routes>
    </div>
    );
}
