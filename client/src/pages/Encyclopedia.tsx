import React from 'react';
import EncyHeader from '../components/Encyclopedia/EncyHeader/EncyHeader';
import { useRecoilValue } from 'recoil';
import { headerState } from '../recoil/EncyHeaderState';
import Chart from '../components/Encyclopedia/EncyBody/Chart';
import Collection from '../components/Encyclopedia/EncyBody/Collection';
import GuestBook from '../components/Encyclopedia/EncyBody/GuestBook';

interface EncyclopediaProps {}

const Encyclopedia: React.FC<EncyclopediaProps> = () => {
  const encyLocate = useRecoilValue(headerState)

  return (
    <>
      <EncyHeader />
      <div className="px-4">
        {encyLocate === 'chart' ? <Chart /> : encyLocate === 'collection' ? <Collection /> : <GuestBook />}
      </div>
    </>
  );
};

export default Encyclopedia;