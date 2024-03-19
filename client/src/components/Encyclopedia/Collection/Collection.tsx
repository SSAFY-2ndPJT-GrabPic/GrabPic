import React from 'react';
import { Link } from 'react-router-dom'
import * as C from './Collection.style';
import filterBtnImg from '../../../assets/Encyclopedia/filterBtn.png'
import Img1 from '../../../assets/Encyclopedia/dummy/Ellipse 21.png'
import Img2 from '../../../assets/Encyclopedia/dummy/Ellipse 21-1.png'
import Img3 from '../../../assets/Encyclopedia/dummy/Ellipse 21-2.png'
import Img4 from '../../../assets/Encyclopedia/dummy/Ellipse 21-3.png'
import Img5 from '../../../assets/Encyclopedia/dummy/Ellipse 22.png'
import Img6 from '../../../assets/Encyclopedia/dummy/Ellipse 22-1.png'
import Img7 from '../../../assets/Encyclopedia/dummy/Ellipse 22-2.png'
import Img8 from '../../../assets/Encyclopedia/dummy/Ellipse 22-3.png'
import Img9 from '../../../assets/Encyclopedia/dummy/Ellipse 23.png'
import Img10 from '../../../assets/Encyclopedia/dummy/Ellipse 23-1.png'
import Img11 from '../../../assets/Encyclopedia/dummy/Ellipse 23-2.png'
import Img12 from '../../../assets/Encyclopedia/dummy/Ellipse 23-3.png'
interface CollectItem {
  name: string;
  url: string;
}

const collectList: CollectItem[] = [
  {name: '앵무새', url: Img1},
  {name: '토끼', url: Img2},
  {name: '햄스터', url: Img3},
  {name: '리트리버', url: Img4},
  {name: '해파리', url: Img5},
  {name: '북극 곰', url: Img6},
  {name: '기린', url: Img7},
  {name: '바다 거북', url: Img8},
  {name: '닭', url: Img9},
  {name: '독수리', url: Img10},
  {name: '금붕어', url: Img11},
  {name: '다람쥐', url: Img12},
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
          <Link to={`/encyclopedia/${collectItem.name}`} key={index}>
            <C.CollectItem>
              <C.ItemImg src={collectItem.url} />
              <C.ItemName>{collectItem.name}</C.ItemName>
            </C.CollectItem>
          </Link>
        ))}
      </C.CollectContainer>
    </C.Container>
  );
};

export default Collection;