import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { ModifyUserInfo } from '../components/User/Modify/ModifyUserInfo';
import ChangePw from '../components/User/Modify/ChangePw';
import ChangeNick from '../components/User/Modify/ChangeNick';

import closeIcon from '../assets/icon/close.png';
import * as R from './ResetPw.style';
import { useEffect, useState } from 'react';

export default function UserInfo() {

  const location = useLocation();
  const navigate = useNavigate();

  const [title,setTitle] = useState('회원정보 수정');

  useEffect(() => {
    if(location.pathname === '/userinfo'){
      setTitle('회원정보 수정')
    }else if(location.pathname === '/userinfo/pw'){
      setTitle('비밀번호 재설정')
    }else{
      setTitle('닉네임 재설정')
    }
  },[location.pathname])

  const backCheck = () => {
    if(location.pathname === '/userinfo'){
      navigate('/setting')
    }else {
      navigate('/userinfo')
    }
  }

  return (
    <div className="flex flex-col px-6">
      <div className="flex flex-row items-center self-center mt-5">
        <R.CloseBtn onClick={backCheck}>
          <img src={closeIcon} alt="" />
        </R.CloseBtn>
        <R.ResetPwText>{title}</R.ResetPwText>
      </div>
      <Routes>
        <Route index element={<ModifyUserInfo />} />
        <Route path='nick' element={<ChangeNick/>}/>
        <Route path="pw" element={<ChangePw />} />
      </Routes>
    </div>
  );
}
