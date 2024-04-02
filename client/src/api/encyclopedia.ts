import { AxiosResponse } from 'axios';
import { privateApi,formDataApi } from '../utils/http-commons';
import { CollectDetailType, CollectItem, RegistType, chartParamType } from '../type/CollectType';
import { MyResponseData } from '../type/ApiResponseType';
import { ChartList } from '../type/ChartType';
import { CategoryType } from '../type/CategoryType';

const url = 'encyclopedia';

export const getCollectDetail = async(
  encyclopediaId : number,
  Response : (Response : AxiosResponse<CollectDetailType>) => void, 
  Error : (Error : AxiosResponse<MyResponseData>) => void) => {
  await privateApi.get(`/${url}/detail/${encyclopediaId}`)
  .then(Response)
  .catch(Error)
}

export const registEncy = async(
  params:FormData,
  Response : (Response : AxiosResponse<RegistType>) => void, 
  Error : (Error : AxiosResponse<MyResponseData>) => void) => {
  await formDataApi.post(`/${url}/add`, params)
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

export const getFilterList = async(
  param: chartParamType,
  page: number,
  userId: number,
  Response : (Response : AxiosResponse<CollectItem[]>) => void, 
  Error : (Error : AxiosResponse<MyResponseData>) => void) => {
  await privateApi.get(`/${url}/search/${userId}`, {params: {...param, 'page': page, 'limit': 40}})
  .then(Response)
  .catch(Error)
}

export const categoryFilter = async(
  param: chartParamType,
  userId: number,
  Response : (Response : AxiosResponse<CategoryType>) => void, 
  Error : (Error : AxiosResponse<MyResponseData>) => void) => {
  await privateApi.get(`/${url}/category/${userId}`, {params: param})
  .then(Response)
  .catch(Error)
}
