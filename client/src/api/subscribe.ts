import { privateApi } from '../utils/http-commons';

const url = 'subscribe';

export const checkIsSub = async (ownerId: number) => {
  try {
    const res = await privateApi.get(`/${url}/relationship/${ownerId}`);
    const isSub: boolean = res.data;

    return isSub;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
