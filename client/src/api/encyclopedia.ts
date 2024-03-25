import { privateApi } from '../utils/http-commons';

const url = 'encyclopedia';

export const getCollectList = async (userId: number) => {
  try {
    const res = await privateApi.get(`/${url}/preview/${userId}`);
    const collectList = res.data;
    console.log(collectList)

    return collectList;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
