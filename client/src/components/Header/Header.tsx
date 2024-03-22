import * as H from './Header.style'
import React from 'react';
import { Link } from "react-router-dom";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <H.Container>
      <Link to="/">
        <H.Logo />
      </Link>
      <Link to="/chatbot">
        <H.ChatBot />
      </Link>
    </H.Container>
  );
};

export default Header;