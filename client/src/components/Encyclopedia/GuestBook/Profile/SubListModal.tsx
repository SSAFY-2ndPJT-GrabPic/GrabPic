import React, { useEffect, useState } from 'react';
import * as S from './SubListModal.style';
import { useRecoilState } from 'recoil';
import { guestBookModalState } from '../../../../recoil/atoms/GuestBookModalState';
import { getSubEncys, getSubUsers } from '../../../../api/subscribe';
import { subItem } from '../../../../type/SubListType';

interface SubListModalProps {}

const SubListModal: React.FC<SubListModalProps> = () => {
  const [isOpenState, setIsOpenState] = useRecoilState(guestBookModalState)
  const [subList, setSubList] = useState<subItem[]>([])

  useEffect(() => {
    if (isOpenState.what === 'ency') {
      getSubEncys(isOpenState.userId)
      .then((res) => {
        setSubList(res)
      })
      .catch((err) => console.error(err))

    } else if (isOpenState.what === 'user') {
      getSubUsers(isOpenState.userId)
      .then((res) => {
        setSubList(res)
      })
      .catch((err) => console.error(err))
    }
  }, [])

  return (
    <S.Container>
      <S.BackDrop  onClick={() => setIsOpenState({ what: '', userId: 0})} />
      <S.FilterBox>
        <S.TitleBox>
          { isOpenState.what === 'ency' 
            ? '구독한 도감'
            : '구독자'
          }
        </S.TitleBox>
        <S.ListBox>
          {subList.map((item, idx) => (
            <S.ListItem 
              to={`/encyclopedia/${item.nickname}`} 
              state={{ userId: item.userId}} 
              key={idx}
              onClick={() => setIsOpenState({ what: '', userId: 0})}
            >
              <S.UserImg src={item.profileImage} />
              <S.UserNickname>{item.nickname}</S.UserNickname>
            </S.ListItem>
          ))}
        </S.ListBox>
      </S.FilterBox>
    </S.Container>
  );
};

export default SubListModal;