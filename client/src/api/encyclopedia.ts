import { AxiosResponse } from 'axios';
import { privateApi } from '../utils/http-commons';
import { CollectDetailType, CollectItem, RegistType } from '../type/CollectType';
import { MyResponseData } from '../type/ApiResponseType';
import { GalleryItemType } from '../type/GalleryType';
import { ChartList } from '../type/ChartType';

const url = 'encyclopedia';

export const getCollectList = async(
  userId : number,
  Response : (Response : AxiosResponse<CollectItem[]>) => void, 
  Error : (Error : AxiosResponse<MyResponseData>) => void) => {
  await privateApi.get(`/${url}/preview/${userId}`)
  .then(Response)
  .catch(Error)
}

export const getCollectDetail = async(
  encyclopediaId : number,
  Response : (Response : AxiosResponse<CollectDetailType>) => void, 
  Error : (Error : AxiosResponse<MyResponseData>) => void) => {
  await privateApi.get(`/${url}/detail/${encyclopediaId}`)
  .then(Response)
  .catch(Error)
}

export const registEncy = async(
  params: {
    biologyId : number;
    registDate : string;
    latitude : number;
    longitude : number;
    address : string;
    content : string;
    imageUrl : string;
  },
  Response : (Response : AxiosResponse<RegistType>) => void, 
  Error : (Error : AxiosResponse<MyResponseData>) => void) => {
  await privateApi.post(`/${url}/add`, params)
  .then(Response)
  .catch(Error)
}

export const getGalleryList = async(
  page: number,
  Response : (Response : AxiosResponse<GalleryItemType[]>) => void, 
  Error : (Error : AxiosResponse<MyResponseData>) => void) => {
  await privateApi.get(`/${url}/gallery/list`, {params:{'page': page, 'limit': 20}})
  .then(Response)
  .catch(Error)
}

export const getChartList = async(
  userId: number,
  Response : (Response : AxiosResponse<ChartList>) => void, 
  Error : (Error : AxiosResponse<MyResponseData>) => void) => {
  await privateApi.get(`/${url}/chart/${userId}`)
  .then(Response)
  .catch(Error)
}