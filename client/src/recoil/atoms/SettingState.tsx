import { atom } from 'recoil';

export const isModalState = atom<boolean>({
  key: 'isModal',
  default: false,
});

export const isModalNo = atom<number>({
  key: 'isModalNo',
  default: 0,
});

export const isLoadingState = atom<{loading : boolean, progress : number}>({
  key: 'isLoading',
  default: {
    loading : false,
    progress : 0
  },
});