import React from 'react';
import EncyHeader from '../components/Encyclopedia/EncyHeader/EncyHeader';
import { useRecoilValue } from 'recoil';
import { headerState } from '../recoil/EncyHeaderState';
import Chart from '../components/Encyclopedia/Chart/Chart';
import Collection from '../components/Encyclopedia/Collection/Collection';
import GuestBook from '../components/Encyclopedia/GuestBook/GuestBook';
import styled from 'styled-components';

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
interface EncyclopediaProps {}

const Encyclopedia: React.FC<EncyclopediaProps> = () => {
  const encyLocate = useRecoilValue(headerState)

  return (
    <div>
      <EncyHeader />
      <EncyBody>
        {encyLocate === 'chart' ? <Chart /> : encyLocate === 'collection' ? <Collection /> : <GuestBook />}
      </EncyBody>
    </div>
  );
};

export default Encyclopedia;