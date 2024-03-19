import { atom } from "recoil";

type UserInfoType = {
  userId: string;
  email: string;
  nickName: string;
  birth: string;
  gender: string;
  profilePicture: string;
  subsCount: number;
};

export const isLoginState = atom<boolean>({
  key: 'isLogin',
  default: false,
});

export const userInfo = atom<UserInfoType>({
  key: 'userInfo',
  default: {userId: '', email: '', nickName: '', birth: '', gender: '', profilePicture: '', subsCount: 0}
});