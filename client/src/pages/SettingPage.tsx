import * as S from './Setting.style'

import { useRecoilState } from 'recoil'
import * as R from '../recoil/atoms/SettingState'

import modifyIconUrl from '../assets/Setting/modify.png'
import logoutIconUrl from '../assets/Setting/logout.png'
import secessionIconUrl from '../assets/Setting/secession.png'
import { useNavigate } from 'react-router-dom'


export default function Setting () {
  const [,setIsModal] = useRecoilState<boolean>(R.isModalState);
  const [,setIsModalNo] = useRecoilState<number>(R.isModalNo);

  const navigate = useNavigate();

  const settingClick = (no:number) => {
    setIsModal(true);
    setIsModalNo(no);
  }

  const moveUserInfo = () => {
    navigate("/userinfo")
  }

  return (
    <div className="flex flex-col">
      <S.SettingTitle>환경설정</S.SettingTitle>
      <S.SettingBtn onClick={moveUserInfo}><img src={modifyIconUrl} className='mr-8'/>회원정보 수정</S.SettingBtn>
      <S.SettingBtn onClick={() => settingClick(1)}><img src={logoutIconUrl} className='mr-8'/>로그아웃</S.SettingBtn>
      <S.SettingBtn onClick={() => settingClick(2)}><img src={secessionIconUrl} className='mr-8'/>회원탈퇴</S.SettingBtn>
    </div>
  )
}