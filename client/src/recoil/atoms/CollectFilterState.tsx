import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'
import { chartParamType } from '../../type/CollectType';

const { persistAtom } = recoilPersist();

export const filterState = atom<boolean>({
  key: 'filterState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const catecoryState = atom<chartParamType>({
  key: 'categoryState',
  default: {},
})

export const filterDoneState = atom<boolean>({
  key: 'filterDoneState',
  default: false
})