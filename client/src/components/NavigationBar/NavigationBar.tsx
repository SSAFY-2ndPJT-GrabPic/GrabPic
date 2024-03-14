import * as N from './NavigationBar.style'
import React from 'react';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <N.Container>
      <N.NavCol to="/encyclopedia">
        <img src="src/assets/NavigationBar/encyIcon.png" alt="" />
      </N.NavCol>


      <N.NavCol to="/map">
        <img src="src/assets/NavigationBar/mapIcon.png" alt="" />
      </N.NavCol>

      <N.NavCol to="/camera">
        <img id='camIcon' src="src/assets/NavigationBar/cameraIcon.png" alt="" />
      </N.NavCol>

      <N.NavCol to="/gallery">
        <img src="src/assets/NavigationBar/galleryIcon.png" alt="" />
      </N.NavCol>

      <N.NavCol to="/setting">
        <img src="src/assets/NavigationBar/settingIcon.png" alt="" />
      </N.NavCol>
    </N.Container>
  );
};

export default Header;