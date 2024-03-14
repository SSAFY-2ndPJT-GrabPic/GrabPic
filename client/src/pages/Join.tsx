import * as R from './ResetPw.style';
import { Routes, Route } from 'react-router-dom';
import ResetPwEmail from '../components/ResetPw/ResetPwEmail';
import ResetPwCode from '../components/ResetPw/ResetPwCode';
import ResetPwSet from '../components/ResetPw/ResetPwSet';
import closeIcon from '../assets/icon/close.png'

export default function Join() {
    return (
    <div className="flex flex-col px-6">
        <div className="flex flex-row items-center self-center mt-5">
        <R.Close to="/login">
            <img src={closeIcon} alt="" />
        </R.Close>
        <R.ResetPwText>회원가입</R.ResetPwText>
        </div>
        <Routes>
        <Route index element={<ResetPwEmail />} />
        <Route path="code" element={<ResetPwCode />} />
        <Route path="set" element={<ResetPwSet />} />
        </Routes>
    </div>
    );
}
