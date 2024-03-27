import React, { useEffect, useState } from 'react';
import * as C from './Collection.style';
import filterBtnImg from '../../../assets/Encyclopedia/filterBtn.png';
import { useRecoilState, useRecoilValue } from 'recoil';
import { filterState, wantState } from '../../../recoil/atoms/CollectFilterState';
import Filter from './Filter';
import { getCollectList } from '../../../api/encyclopedia';
import { useLocation } from 'react-router-dom';

interface CollectItem {
  encyclopediaId: number;
  name: string;
  thumbnailImageUrl: string;
}

interface CollectionProps {
  userId: number;
}

const Collection: React.FC<CollectionProps> = ({ userId }) => {
  const [isOpen, setIsOpenState] = useRecoilState(filterState);
  const want = useRecoilValue(wantState);

  const location = useLocation();
  let userIdData = userId;

  const [collectList, setCollectList] = useState<CollectItem[]>([]);

  useEffect(() => {
    if (location.state) {
      userIdData = location.state.userId;
    }
    getCollectList(userIdData)
      .then((res) => {
        setCollectList(res);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {isOpen && <Filter />}
      <C.Container>
        <C.BtnAlign>
          <C.FilterBtn onClick={() => setIsOpenState(true)}>
            <C.FilterImg src={filterBtnImg} />
            <C.FilterTxt>{want}</C.FilterTxt>
          </C.FilterBtn>
        </C.BtnAlign>

        <C.CollectContainer className="grid gird-cols-3">
          {collectList.map((collectItem, index) => (
            <C.CollectItem
              key={index}
              to={`/detail/${collectItem.name}`}
              state={{
                encyclopediaId: collectItem.encyclopediaId,
                userId: userId,
              }}
            >
              <C.ItemImg src={collectItem.thumbnailImageUrl} />
              <C.ItemName>{collectItem.name}</C.ItemName>
            </C.CollectItem>
          ))}
        </C.CollectContainer>
      </C.Container>
    </>
  );
};

export default Collection;
