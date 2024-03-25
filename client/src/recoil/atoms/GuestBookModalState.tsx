import { atom } from 'recoil';

export const guestBookModalState = atom<boolean>({
    key: 'guestBookModalState',
    default: false,
});
