import { privateApi } from '../utils/http-commons';

const url = 'guestbook';

export const getGuestBookData = async (ownerId: number) => {
  try {
    const res = await privateApi.get(`/${url}/${ownerId}`, {params:{'page': 1, 'limit': 200}});
    const guestBookList = res.data;

    return guestBookList;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
