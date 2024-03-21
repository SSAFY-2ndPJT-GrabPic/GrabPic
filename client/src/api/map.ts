import { AxiosResponse } from "axios";
import { noneApi } from "../utils/http-commons"

interface MyResponseData {
    data: string;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: string;
}

export const userLogin = async (params : {email:string; password:string},
    Response : (Response : AxiosResponse<MyResponseData>) => void, 
    Error : (Error : AxiosResponse<MyResponseData>) => void) => {
        await noneApi.post(`/map/search`,params)
        .then(Response)
        .catch(Error);
}