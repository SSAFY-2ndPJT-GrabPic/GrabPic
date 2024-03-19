import React from 'react';
import * as F from './Filter.style';
import { useRecoilValue } from 'recoil';
import { filterState } from '../../../recoil/atoms/CollectFilterState';

interface CollectionProps {}

const Collection: React.FC<CollectionProps> = () => {
  const isOpen = useRecoilValue(filterState)

  return (
    isOpen && (
      <F.Container>
        
      </F.Container>
    )
  );
};

export default Collection;