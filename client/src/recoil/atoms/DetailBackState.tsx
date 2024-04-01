import { atom } from 'recoil';

export const backState = atom<string>({
    key: 'backState',
    default: 'collection',
});