import React from 'react';
import EncyHeader from '../components/Encyclopedia/EncyHeader/EncyHeader';
import { useRecoilValue } from 'recoil';
import { headerState } from '../recoil/atoms/EncyHeaderState';
import Chart from '../components/Encyclopedia/Chart/Chart';
import Collection from '../components/Encyclopedia/Collection/Collection';
import GuestBook from '../components/Encyclopedia/GuestBook/GuestBook';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const EncyBody = styled.div`
  width: 100%;
  position: fixed;
  top: 100px;
  bottom: 56px;
  /* padding-left: 16px;
  padding-right: 16px; */
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`
interface EncyclopediaProps {
  userId: number;
}

const Encyclopedia: React.FC<EncyclopediaProps> = ({ userId }) => {
  const encyLocate = useRecoilValue(headerState)
  let userIdData = userId
  const location = useLocation();

  if (location.state) {
    userIdData = location.state.userId
  }

  return (
    <div>
      <EncyHeader />
      <EncyBody>
        {encyLocate === 'chart' ? <Chart /> : encyLocate === 'collection' ? <Collection /> : <GuestBook userId={userIdData} />}
      </EncyBody>
    </div>
  );
};

export default Encyclopedia;