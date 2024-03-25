import { privateApi } from '../utils/http-commons';

const url = 'guestbook';

interface replyInputData {
  ownerId: number;
  content: string;
}

export const getGuestBookData = async (ownerId: number) => {
  try {
    const res = await privateApi.get(`/${url}/${ownerId}`, {params:{'page': 1, 'limit': 200}});
    const guestBookList = res.data;
    console.log(guestBookList)

    return guestBookList;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postReply = async (replyData: replyInputData) => {
  try {
    const res = await privateApi.post(`/${url}/add`, replyData);
    const isThen = res.data;

    return isThen;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
