import { AxiosResponse } from "axios";
import { privateApi } from "../utils/http-commons"
import { RequestData, ResponseData } from "../types/CustomMap";

export const dataLoad = async (params : RequestData,
    Response : (Response : AxiosResponse<ResponseData>) => void, 
    Error : (Error : AxiosResponse<ResponseData>) => void) => {
        await privateApi.post(`/map/search`, params)
        .then(Response)
        .catch(Error);
}