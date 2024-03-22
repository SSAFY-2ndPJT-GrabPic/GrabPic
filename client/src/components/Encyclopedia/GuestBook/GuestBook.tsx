import React from 'react';
import * as G from './GuestBook.style'
import Profile from './Profile/Profile';
import Reply from './Reply/Reply';

interface GuestBookProps {}

const GuestBook: React.FC<GuestBookProps> = () => {
  return (
    <G.Container>
      <Profile />
      <Reply />
    </G.Container>
  );
};

export default GuestBook;