import * as N from './NavigationBar.style'
import React from 'react';
import EncyIconUrl from '../../assets/NavigationBar/encyIcon.png'
import MapIconUrl from '../../assets/NavigationBar/mapIcon.png'
import CameraIconUrl from '../../assets/NavigationBar/cameraIcon.png'
import GalleryIconUrl from '../../assets/NavigationBar/galleryIcon.png'
import HomeIconUrl from '../../assets/NavigationBar/homeIcon.png'
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/atoms/UserState';


interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  // const userNickname = '해진해뜸'
  const myInfo = useRecoilValue(userInfoState)
  
  return (
    <N.Container>
      <N.NavCol to="/">
        <img src={HomeIconUrl} alt="" style={{height:'22px', width: '22px'}}/>
      </N.NavCol>

      <N.NavCol to="/map">
        <img src={MapIconUrl} alt="" />
      </N.NavCol>

      <N.NavCol to="/camera">
        <img id='camIcon' src={CameraIconUrl} alt="" />
      </N.NavCol>

      <N.NavCol to={`/encyclopedia/${myInfo.nickname}`}>
        <img src={EncyIconUrl} alt="" />
      </N.NavCol>

      <N.NavCol to="/gallery">
        <img src={GalleryIconUrl} alt="" />
      </N.NavCol>
    </N.Container>
  );
};

export default Header;