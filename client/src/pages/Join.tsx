import * as R from './ResetPw.style';
import { Routes, Route } from 'react-router-dom';
import VerificationEmail from '../components/emailVerification/VerificationEmail';
import VerificationCode from '../components/emailVerification/VerificationCode';
import VerificationSet from '../components/emailVerification/VerificationPwSet';
import { JoinUserInfo } from '../components/User/JoinUserInfo';
import closeIcon from '../assets/icon/close.png'

export default function Join() {
    return (
    <div className="flex flex-col px-6">
        <div className="flex flex-row items-center self-center mt-5">
        <R.Close to="/login">
            <img src={closeIcon} alt="" />
        </R.Close>
        <R.ResetPwText>회원 가입</R.ResetPwText>
        </div>
        <Routes>
        <Route index element={<VerificationEmail />} />
        <Route path="code" element={<VerificationCode />} />
        <Route path="pwset" element={<VerificationSet />} />
        <Route path="userinfo" element={<JoinUserInfo />} />
        </Routes>
    </div>
    );
}
