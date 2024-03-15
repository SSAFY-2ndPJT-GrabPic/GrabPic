import React from 'react';
import * as C from './Collection.style';
import filterBtnImg from '../../../assets/Encyclopedia/filterBtn.png'

interface CollectItem {
  name: string;
  url: string;
}

const collectList: CollectItem[] = [
  {name: '앵무새', url: 'src/assets/Encyclopedia/dummy/Ellipse 21.png'},
  {name: '토끼', url: 'src/assets/Encyclopedia/dummy/Ellipse 21-1.png'},
  {name: '햄스터', url: 'src/assets/Encyclopedia/dummy/Ellipse 21-2.png'},
  {name: '리트리버', url: 'src/assets/Encyclopedia/dummy/Ellipse 21-3.png'},
  {name: '해파리', url: 'src/assets/Encyclopedia/dummy/Ellipse 22.png'},
  {name: '북극 곰', url: 'src/assets/Encyclopedia/dummy/Ellipse 22-1.png'},
  {name: '기린', url: 'src/assets/Encyclopedia/dummy/Ellipse 22-2.png'},
  {name: '바다 거북', url: 'src/assets/Encyclopedia/dummy/Ellipse 22-3.png'},
  {name: '닭', url: 'src/assets/Encyclopedia/dummy/Ellipse 23.png'},
  {name: '독수리', url: 'src/assets/Encyclopedia/dummy/Ellipse 23-1.png'},
  {name: '금붕어', url: 'src/assets/Encyclopedia/dummy/Ellipse 23-2.png'},
  {name: '다람쥐', url: 'src/assets/Encyclopedia/dummy/Ellipse 23-3.png'},
]

interface CollectionProps {}

const Collection: React.FC<CollectionProps> = () => {
  return (
    <C.Container>
      <C.BtnAlign>
        <C.FilterBtn>
          <C.FilterImg src={ filterBtnImg } />
          <C.FilterTxt>전체</C.FilterTxt>
        </C.FilterBtn>
      </C.BtnAlign>

      <C.CollectContainer>
        {collectList.map((collectItem, index) => (
          <C.CollectItem key={index}>
            <C.ItemImg src={collectItem.url} />
            <C.ItemName>{collectItem.name}</C.ItemName>
          </C.CollectItem>
        ))}
      </C.CollectContainer>
    </C.Container>
  );
};

export default Collection;