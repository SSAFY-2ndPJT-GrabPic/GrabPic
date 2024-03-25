import React, { useState } from 'react';
import * as S from './SubListModal.style';
import { useSetRecoilState } from 'recoil';
import { guestBookModalState } from '../../../../recoil/atoms/GuestBookModalState';

interface SubListModalProps {}

const SubListModal: React.FC<SubListModalProps> = () => {
  const setIsOpenState = useSetRecoilState(guestBookModalState)
  
  return (
    <S.Container>
      <S.BackDrop  onClick={() => setIsOpenState(false)} />
      <S.FilterBox>

      </S.FilterBox>
    </S.Container>
  );
};

export default SubListModal;