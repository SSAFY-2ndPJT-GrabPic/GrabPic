import React, { useEffect, useState } from 'react';
import * as D from './DropDown.style'
import filterBtnImg from '../../../assets/Encyclopedia/filterBtn.png';
import { categoryFilter } from '../../../api/encyclopedia';
import { chartParamType } from '../../../type/CollectType';
import { useRecoilState } from 'recoil';
import { catecoryState } from '../../../recoil/atoms/CollectFilterState';

interface DropDownProps {
  depth: number;
  userId: number;
}

const DropDown: React.FC<DropDownProps> = ({ depth, userId }) => {
  const [view, setView] = useState(false);
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (depth === 1) {
      setCategory("'목'을 선택해주세요.")
    } else if (depth === 2) {
      setCategory("'과'를 선택해주세요.")
    } else if (depth === 3) {
      setCategory("'속'을 선택해주세요.")
    } else if (depth === 4) {
      setCategory("'종'을 선택해주세요.")
    } else if (depth === 5) {
      setCategory("'개체'를 선택해주세요.")
    }
    filterHandler()
  }, [])

  const [param, setParam] = useRecoilState<chartParamType>(catecoryState)
  const [item, setItem] = useState<string[]>([] as string[])

  useEffect(() => {
    filterHandler()
  }, [param])

  const filterHandler = () => {
    categoryFilter(
      param,
      userId,
      (res) =>{
        if (depth === 1) {
          setItem(res.data.ordo ? [...res.data.ordo] : [])
        } else if (depth === 2) {
          setItem(res.data.familia ? [...res.data.familia] : [])
        } else if (depth === 3) {
          setItem(res.data.genus ? [...res.data.genus] : [])
        } else if (depth === 4) {
          setItem(res.data.species ? [...res.data.species] : [])
        }
      },
      (err) => {
        console.error(err)
      }
    )
  }

  const clickHandler = (item: string) => {
    setCategory(item)
    let key = ''
    if (depth === 1) {
      key = 'ordo';
    } else if (depth === 2) {
      key = 'familia';
      
    } else if (depth === 3) {
      key = 'genus';
      
    } else if (depth === 4) {
      key = 'species';
      
    }
    setParam({...param, [key]: item})
  }

  return (
    <>
      <D.FilterBtn onClick={() => {setView(!view)}}>
        <D.TitleTxt>
          {category}{" "} 
          {view ? <D.FilterImg src={filterBtnImg} /> : <D.FilterReverseImg src={filterBtnImg} />}
        </D.TitleTxt>

        {view && 
          <D.DownList>
            {item.length ? 
              item.map((item, idx) => (
                <D.DownItem key={idx} onClick={() => clickHandler(item)}>
                  {item}
                </D.DownItem>
              ))
              : <D.DownItem>하위 항목이 없습니다</D.DownItem> 
            }
          </D.DownList>
        }
      </D.FilterBtn>
    </>
  );
};

export default DropDown;