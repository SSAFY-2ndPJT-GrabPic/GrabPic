import * as R from './ResetPw.style';
import { Routes, Route } from 'react-router-dom';
import ResetPwEmail from '../components/ResetPw/ResetPwEmail';
import ResetPwCode from '../components/ResetPw/ResetPwCode';
import ResetPwSet from '../components/ResetPw/ResetPwSet';

export default function ResetPw() {
    return (
    <div className="flex flex-col px-6">
        <div className="flex flex-row items-center self-center mt-5">
        <R.Close to="/login">
            <img src="src/assets/icon/close.png" alt="" />
        </R.Close>
        <R.ResetPwText>비밀번호 재설정</R.ResetPwText>
        </div>
        <Routes>
        <Route index element={<ResetPwEmail />} />
        <Route path="code" element={<ResetPwCode />} />
        <Route path="set" element={<ResetPwSet />} />
        </Routes>
    </div>
    );
}
