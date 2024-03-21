import { AxiosResponse } from "axios";
import { noneApi,privateApi } from "../utils/http-commons";
import { UserInfoType } from "../type/UserType";

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

export const userInfo = async (
    Response : (Response : UserInfoType) => void, 
    Error : (Error : AxiosResponse<MyResponseData>) => void) =>{
        await privateApi.get(`/${url}/info/my`)
        .then((e) => {Response(e.data)})
        .catch(Error);
}

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

export const getUserInfo = async (userId: number) => {
  try {
    const res = await privateApi.get(`/${url}/info/${userId}`);
    console.log(res.data);

    const userDetails: object = res.data;

    return userDetails;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
