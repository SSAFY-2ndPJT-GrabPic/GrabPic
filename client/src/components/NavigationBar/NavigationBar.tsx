import * as N from './NavigationBar.style'
import React from 'react';
import EncyIconUrl from '../../assets/NavigationBar/encyIcon.png'
import MapIconUrl from '../../assets/NavigationBar/mapIcon.png'
import CameraIconUrl from '../../assets/NavigationBar/cameraIcon.png'
import GalleryIconUrl from '../../assets/NavigationBar/galleryIcon.png'
import SettingIconUrl from '../../assets/NavigationBar/settingIcon.png'


interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const userNickname = '해진해뜸'
  
  return (
    <N.Container>
      <N.NavCol to={`/encyclopedia/${userNickname}`}>
        <img src={EncyIconUrl} alt="" />
      </N.NavCol>


      <N.NavCol to="/map">
        <img src={MapIconUrl} alt="" />
      </N.NavCol>

      <N.NavCol to="/camera">
        <img id='camIcon' src={CameraIconUrl} alt="" />
      </N.NavCol>

      <N.NavCol to="/gallery">
        <img src={GalleryIconUrl} alt="" />
      </N.NavCol>

      <N.NavCol to="/setting">
        <img src={SettingIconUrl} alt="" />
      </N.NavCol>
    </N.Container>
  );
};

export default Header;