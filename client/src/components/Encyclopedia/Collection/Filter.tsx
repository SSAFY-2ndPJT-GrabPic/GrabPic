import React, { useState } from 'react';
import * as F from './Filter.style';
import { useSetRecoilState } from 'recoil';
import { filterState, wantState } from '../../../recoil/atoms/CollectFilterState';

const filterList = {
  '오목': {
    '치과': {
      '숲속': {
        '시종': ['시종은', '노예다'],
        '수종': ['최수종', '스윗가이'],
        '세종': ['세종이다', '정종이다']
      }
    },
    '소아과': {
      '마음속': {
        '시종': ['시종은', '노예다'],
        '수종': ['최수종', '스윗가이'],
        '세종': ['세종이다', '정종이다']
      }
    }
  },
  '거북목': {
    '수정과': {
      '과속': {
        '시종': ['시종은', '노예다'],
        '수종': ['최수종', '스윗가이'],
        '세종': ['세종이다', '정종이다']
      }
    },
    '안녕하수과': {
      '긴급구속': {
        '시종': ['시종은', '노예다'],
        '수종': ['최수종', '스윗가이'],
        '세종': ['세종이다', '정종이다']
      }
    }
  }
}

interface CollectionProps {}

const Collection: React.FC<CollectionProps> = () => {
  const setIsOpenState = useSetRecoilState(filterState)
  const setWantState = useSetRecoilState(wantState)

  const [title, setTitle] = useState('필터 선택')
  const [list, setList] = useState<any>(filterList)

  // setList(filterList)

  const [depth, setDepth] = useState(0)

  const filterHandler = (item: any) => {
    setDepth(depth + 1)
    setTitle(item[0])
    setList(item[1])
  }

  const wantHandler = (where: string) => {
    setWantState(where)
    setIsOpenState(false)
  }

  return (
    <F.Container >
      <F.BackDrop  onClick={() => setIsOpenState(false)} />
      <F.FilterBox>
        <F.TitleBox>{title}</F.TitleBox>
        <F.ListBox>
          {depth === 4 ?
              list.map((item: string, idx: number) => (
                <F.ListItem key={idx} onClick={() => wantHandler(item)}>
                  {item}
                </F.ListItem>
              ))
            :
            Object.entries(list).map((item, idx) => (
              <F.ListItem key={idx} onClick={() => filterHandler(item)}>
                {item[0]}
              </F.ListItem>
            ))
          }

          
        </F.ListBox>
      </F.FilterBox>
    </F.Container>
  );
};

export default Collection;