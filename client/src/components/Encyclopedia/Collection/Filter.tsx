import React from 'react';
import * as F from './Filter.style';
import { useSetRecoilState } from 'recoil';
import { filterDoneState, filterState } from '../../../recoil/atoms/CollectFilterState';
import DropDown from './DropDown';

interface CollectionProps {
  userId: number;
}

const Collection: React.FC<CollectionProps> = ({ userId }) => {
  const setIsOpenState = useSetRecoilState(filterState)
  const setIsDone = useSetRecoilState(filterDoneState)
  const DoneHandler = () => {
    setIsOpenState(false)
    setIsDone(true)
  }

  return (
    <F.Container >
      <F.BackDrop onClick={() => setIsOpenState(false)} />
      <F.FilterBox>
        <F.TitleBox>개체 찾기</F.TitleBox>

        <F.ListBox>
          <DropDown userId={userId} depth={1} />
          <DropDown userId={userId} depth={2} />
          <DropDown userId={userId} depth={3} />
          <DropDown userId={userId} depth={4} />
          {/* <DropDown userId={userId} depth={5} /> */}
        </F.ListBox>

        <F.DoneBtn onClick={() => DoneHandler()}>완료</F.DoneBtn>
      </F.FilterBox>
    </F.Container>
  );
};

export default Collection;