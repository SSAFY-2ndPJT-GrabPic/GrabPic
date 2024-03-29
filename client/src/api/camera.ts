import { AxiosResponse } from 'axios';
import { privateApi } from '../utils/http-commons';
import { MyResponseData } from '../type/ApiResponseType';
import { biologyInfoType } from '../type/CameraType';

export const getBiologyInfo = async (
    params: number,
    Response: (Response: AxiosResponse<biologyInfoType>) => void,
    Error: (Error: AxiosResponse<MyResponseData>) => void) => {
        await privateApi(`/biology/info/${params}`)
        .then(Response)
        .catch(Error);
}