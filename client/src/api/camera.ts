import { AxiosResponse } from 'axios';
import { privateApi } from '../utils/http-commons';
import { MyResponseData } from '../type/ApiResponseType';

export const getBiologyInfo = async (
    params: number,
    Response: (Response: AxiosResponse<MyResponseData>) => void,
    Error: (Error: AxiosResponse<MyResponseData>) => void) => {
        await privateApi(`/biology/info/${params}`)
        .then(Response)
        .catch(Error);
}