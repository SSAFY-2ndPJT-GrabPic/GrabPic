import { AxiosResponse } from "axios";
import { privateApi } from "../utils/http-commons"
import { RequestData, PinData } from "../types/CustomMap";

export const dataLoad = async (params : RequestData,
    Response : (Response : AxiosResponse<PinData[]>) => void, 
    Error : (Error : AxiosResponse<PinData[]>) => void) => {
        await privateApi.post(`/map/search`, params)
        .then(Response)
        .catch(Error);
}