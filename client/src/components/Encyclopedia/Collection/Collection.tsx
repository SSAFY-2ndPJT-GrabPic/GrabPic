import React, { useEffect, useState } from 'react';
import * as C from './Collection.style';
import filterBtnImg from '../../../assets/Encyclopedia/filterBtn.png';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { filterState, wantState } from '../../../recoil/atoms/CollectFilterState';
import Filter from './Filter';
import { getCollectList } from '../../../api/encyclopedia';
import { useLocation, useNavigate } from 'react-router-dom';
import { CollectItem } from '../../../type/CollectType';
import { backState } from '../../../recoil/atoms/DetailBackState';

interface CollectionProps {
  userId: number;
}

const Collection: React.FC<CollectionProps> = ({ userId }) => {
  const [isOpen, setIsOpenState] = useRecoilState(filterState);
  const want = useRecoilValue(wantState);

  const location = useLocation();
  let userIdData = userId;

  const [collectList, setCollectList] = useState<CollectItem[]>([]);
  const navigate = useNavigate();
  const setBackState = useSetRecoilState(backState);

  useEffect(() => {
    if (location.state) {
      userIdData = location.state.userId;
    }
    getCollectList(
      userIdData,
      (res) => {
        setCollectList(res.data);
      },
      (err) => { console.error(err) }
    )
  }, []);

  const navigateHandler = (name: string, encyId: number) => {
    navigate(`/detail/${name}`, {state:{
      encyclopediaId: encyId,
      userId: userId,
    }})
    setBackState('collect')
  }

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
              onClick={() => navigateHandler(collectItem.name, collectItem.encyclopediaId)}
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
