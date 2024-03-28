
export type UserInfoType = {
  userId: number;
  email: string;
  nickname: string;
  name: string;
  birth: string;
  gender: string;
  profileImage: string;
  subsCount: number;
  collectCount: number;
};

export interface OwnerInfoType {
  userId: number;
  nickname: string;
  gender: string;
  profileImage: string;
  subsCount: number;
  collectCount: number;
}