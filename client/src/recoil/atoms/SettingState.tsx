import { atom } from 'recoil';

export const isModalState = atom<boolean>({
  key: 'isModal',
  default: false,
});

export const isModalNo = atom<number>({
  key: 'isModalNo',
  default: 0,
});
