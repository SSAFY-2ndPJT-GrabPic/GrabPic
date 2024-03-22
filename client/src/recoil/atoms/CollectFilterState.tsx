import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist();

export const filterState = atom<boolean>({
    key: 'filterState',
    default: false,
    effects_UNSTABLE: [persistAtom],
});

export const wantState = atom<string>({
    key: 'wantState',
    default: '전체',
    // effects_UNSTABLE: [persistAtom],
});