import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist();

export const headerState = atom<string>({
    key: 'headerState',
    default: 'chart',
    effects_UNSTABLE: [persistAtom],
});