import { atom } from 'recoil';
import { UserInfoType } from '../../type/UserType';

export const isLoginState = atom<boolean>({
  key: 'isLogin',
  default: false,
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
});
