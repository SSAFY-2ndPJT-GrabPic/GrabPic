// import * as H from './Header.style'
import React from 'react';
import * as C from './Collection.style';

interface CollectionProps {}

const Collection: React.FC<CollectionProps> = () => {
  return (
    <C.Container>
      <C.filterBtn>전체</C.filterBtn>
    </C.Container>
  );
};

export default Collection;