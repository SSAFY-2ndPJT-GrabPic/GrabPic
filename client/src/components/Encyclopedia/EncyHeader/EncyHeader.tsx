import * as E from './EncyHeader.style'
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { headerState } from '../../../recoil/atoms/EncyHeaderState'

interface EncyHeaderProps {}

const EncyHeader: React.FC<EncyHeaderProps> = () => {
  const [encyLocate, setEncyLocate] = useRecoilState(headerState)
  
  const routHandler = (lookWhere: string) => {
    const beforeBtn = document.getElementById(encyLocate)
    if (beforeBtn) {
      beforeBtn.style.backgroundColor = '#E1E1E1';
      beforeBtn.style.color = '#5C5C5C';
    }
    
    const goBtn = document.getElementById(lookWhere)
    
    if (goBtn) {
      setEncyLocate(lookWhere)
      goBtn.style.backgroundColor = '#81D42E';
      goBtn.style.color = '#FFFFFF';
    }
  }

  useEffect(() => {
    routHandler(encyLocate);

    return () => {
      setEncyLocate('chart')
    }
  }, [])

  return (
    <E.Container>
      <E.Btns id='chart' onClick={() => routHandler('chart')}>차트</E.Btns>
      <E.Btns id='collection' onClick={() => routHandler('collection')}>컬렉션</E.Btns>
      <E.Btns id='guestBook' onClick={() => routHandler('guestBook')}>방명록</E.Btns>
    </E.Container>
  );
};

export default EncyHeader;