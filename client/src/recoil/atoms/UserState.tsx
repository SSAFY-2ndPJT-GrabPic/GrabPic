import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'
import { UserInfoType } from '../../type/UserType';

const { persistAtom } = recoilPersist();

export const isLoginState = atom<boolean>({
  key: 'isLogin',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const userInfoState = atom<UserInfoType>({
  key: 'userInfo',
  default: {
    userId: 0,
    email: '',
    name: '',
    nickname: '',
    birth: '',
    gender: '',
    profilePicture: '',
    subsCount: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
