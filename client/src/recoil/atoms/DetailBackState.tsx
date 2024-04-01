import { atom } from 'recoil';
// import { recoilPersist } from 'recoil-persist'

// const { persistAtom } = recoilPersist();

export const backState = atom<string>({
    key: 'backState',
    default: 'collection',
    // effects_UNSTABLE: [persistAtom],
});