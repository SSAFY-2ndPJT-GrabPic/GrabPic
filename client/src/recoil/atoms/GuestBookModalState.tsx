import { atom } from 'recoil';

interface modalState {
    what: string;
    userId: number;
}

export const guestBookModalState = atom<modalState>({
    key: 'guestBookModalState',
    default: {
        what: '',
        userId: 0
    },
});
