import React, { useEffect } from 'react';
import * as I from './InfoTab.style';
import { useRecoilState } from 'recoil';
import { tabState } from '../../../recoil/IndivDetailTabState';

interface InfoTabProps {}

const InfoTab: React.FC<InfoTabProps> = () => {
  const [tabInfo, setTabInfoState] = useRecoilState(tabState)
  
  const renderHandler = (lookWhere: string) => {
    const beforeBtn = document.getElementById(tabInfo)
    if (beforeBtn) {
      beforeBtn.style.color = '#5C5C5C';
    }
    
    const goBtn = document.getElementById(lookWhere)
    
    if (goBtn) {
      setTabInfoState(lookWhere)
      goBtn.style.color = '#50940C';
    }
  }

  useEffect(() => {
    renderHandler('indivInfo');
  }, [])
  
  return (
    <I.Container>
      <I.BorderBox>
        <I.Tab id='indivInfo' onClick={() => renderHandler('indivInfo')}>개체 정보</I.Tab>
        <I.Tab id='getInfo' onClick={() => renderHandler('getInfo')}>수집 정보</I.Tab>
      </I.BorderBox>
    </I.Container>
  );
};

export default InfoTab;