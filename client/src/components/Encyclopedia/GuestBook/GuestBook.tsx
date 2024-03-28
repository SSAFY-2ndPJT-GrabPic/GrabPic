import React from 'react';
import * as G from './GuestBook.style'
import Profile from './Profile/Profile';
import Reply from './Reply/Reply';

interface GuestBookProps {
  userId: number;
}

const GuestBook: React.FC<GuestBookProps> = ({ userId }) => {
  return (
    <G.Container>
      <Reply userId={userId} />
      <Profile userId={userId} />
    </G.Container>
  );
};

export default GuestBook;