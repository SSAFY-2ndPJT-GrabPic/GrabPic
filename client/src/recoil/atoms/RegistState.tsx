import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist();

export const registState = atom<boolean>({
    key: 'registState',
    default: false,
    effects_UNSTABLE: [persistAtom],
});