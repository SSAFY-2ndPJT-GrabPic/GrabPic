import { AxiosResponse } from 'axios';
import { privateApi } from '../utils/http-commons';
import { MyResponseData } from '../type/ApiResponseType';
import { GalleryItemType } from '../type/GalleryType';

const url = 'gallery';

export const getGalleryList = async(
  page: number,
  Response : (Response : AxiosResponse<GalleryItemType[]>) => void, 
  Error : (Error : AxiosResponse<MyResponseData>) => void) => {
  await privateApi.get(`/${url}/recommend`, {params:{'page': page, 'limit': 21}})
  .then(Response)
  .catch(Error)
}

export const galleryLog = async(
  ency : number,
  Response : (Response : AxiosResponse<GalleryItemType[]>) => void, 
  Error : (Error : AxiosResponse<MyResponseData>) => void) => {
  await privateApi.get(`/${url}/log`, {params:{'ency': ency}})
  .then(Response)
  .catch(Error)
}