import { AxiosResponse } from 'axios';
import { noneApi, privateApi } from '../utils/http-commons';
import { UserInfoType, OwnerInfoType } from '../type/UserType';

const url = 'user';

interface MyResponseData {
  data: string;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: string;
}

export const userLogin = async (
  params: { email: string; password: string },
  Response: (Response: AxiosResponse<MyResponseData>) => void,
  Error: (Error: AxiosResponse<MyResponseData>) => void
) => {
  await noneApi.post(`/${url}/login`, params).then(Response).catch(Error);
};

export const userLogout = async () => {
  await privateApi.post(`/${url}/logout`)
  .then((e) => {console.log(e)})
  .catch((e) => {console.log(e)});
}

export const userInfo = async (
  Response: (Response: UserInfoType) => void,
  Error: (Error: AxiosResponse<MyResponseData>) => void
) => {
  await privateApi
    .get(`/${url}/info/my`)
    .then((e) => {
      Response(e.data);
    })
    .catch(Error);
};

export const userJoin = async (
  params: {
    email: string;
    password: string;
    nickname: string;
    name: string;
    birth: string;
    gender: string;
  },
  Response: (Response: AxiosResponse<MyResponseData>) => void,
  Error: (Error: AxiosResponse<MyResponseData>) => void
) => {
  await noneApi.post(`/${url}/join`, params).then(Response).catch(Error);
};

export const emailVerification = async (
  params: { email: string; type: number },
  Response: (Response: AxiosResponse<MyResponseData>) => void,
  Error: (Error: AxiosResponse<MyResponseData>) => void
) => {
  await noneApi
    .post(`/${url}/auth/emails/verification-requests`, params)
    .then(Response)
    .catch(Error);
};

export const emailCodeVerification = async (
  params: { email: string; code: number },
  Response: (Response: AxiosResponse<MyResponseData>) => void,
  Error: (Error: AxiosResponse<MyResponseData>) => void
) => {
  await noneApi
    .post(`/${url}/auth/emails/verification`, params)
    .then(Response)
    .catch(Error);
};

export const nickNameCheck = async (
  params: string,
  Response: (Response: AxiosResponse<MyResponseData>) => void,
  Error: (Error: AxiosResponse<MyResponseData>) => void
) => {
  await noneApi
    .get(`/${url}/look/nickname/${params}`)
    .then(Response)
    .catch(Error);
};

export const passwordChange = async (
  params: string,
  Response: (Response: AxiosResponse<MyResponseData>) => void,
  Error: (Error: AxiosResponse<MyResponseData>) => void
) => {
  console.log(params);
  await privateApi
    .post(`/${url}/password/change`, params)
    .then(Response)
    .catch(Error);
};

export const emailDuplicationCheck = async(params : string,
  Response : (Response : AxiosResponse<MyResponseData>) => void, 
  Error : (Error : AxiosResponse<MyResponseData>) => void) => {
      await noneApi.get(`/${url}/look/email/${params}`)
      .then(Response)
      .catch(Error);
}

export const TokenRefresh = async(
  Response : (Response : AxiosResponse<MyResponseData>) => void, 
  Error : (Error : AxiosResponse<MyResponseData>) => void) => {
  await noneApi.post(`/${url}/reissue`,{withCredentials: true})
  .then(Response)
  .catch(Error)
}

export const getUserInfo = async (userId: number) => {
  try {
    const res = await privateApi.get(`/${url}/info/${userId}`);
    console.log(res.data);

    const userDetails: OwnerInfoType = res.data;

    return userDetails;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
