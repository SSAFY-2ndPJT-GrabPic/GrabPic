import { AxiosResponse } from "axios";
import { noneApi } from "../utils/http-commons"

const url = 'user';

interface MyResponseData {
    data: string;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: string;
}

export const emailVerification = async (params : {email : string; type:number},
     Response : (Response : AxiosResponse<MyResponseData>) => void, 
     Error : (Error : AxiosResponse<MyResponseData>) => void) => {
    await noneApi.post(`/${url}/auth/emails/verification-requests`, params)
    .then(Response)
    .catch(Error);
}

export const emailCodeVerification = async(params : {email: string; code:number},
    Response : (Response : AxiosResponse<MyResponseData>) => void, 
    Error : (Error : AxiosResponse<MyResponseData>) => void) => {
        await noneApi.post(`/${url}/auth/emails/verification`,params)
        .then(Response)
        .catch(Error)
}