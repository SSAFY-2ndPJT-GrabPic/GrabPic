import { atom } from "recoil";

type UserInfoType = {
  userId: number;
  email: string;
  nickName: string;
  name: string;
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
  default: {userId: 0, email: '', name: '', nickName: '', birth: '', gender: '', profilePicture: '', subsCount: 0}
});