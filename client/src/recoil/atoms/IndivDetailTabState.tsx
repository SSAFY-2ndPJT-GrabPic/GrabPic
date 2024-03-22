import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist();

export const tabState = atom<string>({
    key: 'tabState',
    default: 'indivInfo',
    effects_UNSTABLE: [persistAtom],
});