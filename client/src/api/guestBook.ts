import { AxiosResponse } from 'axios';
import { privateApi } from '../utils/http-commons';
import { MyResponseData } from '../type/ApiResponseType';
import { replyInputData, replyItem } from '../type/GuestBookType';

const url = 'guestbook';

export const getGuestBookData = async (
  ownerId: number,
  page: number,
  Response: (Response: AxiosResponse<replyItem[]>) => void,
  Error: (Error: AxiosResponse<MyResponseData>) => void
) => {
  await privateApi
  .get(`/${url}/${ownerId}`, {params:{'page': page, 'limit': 200}})
  .then(Response)
  .catch(Error);
};

export const postReply = async (
  replyData: replyInputData,
  Response: (Response: AxiosResponse<replyItem>) => void,
  Error: (Error: AxiosResponse<MyResponseData>) => void
) => {
  await privateApi
  .post(`/${url}/add`, replyData)
  .then(Response)
  .catch(Error);
};
