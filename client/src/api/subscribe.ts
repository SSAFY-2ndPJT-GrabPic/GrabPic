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

export const wantSubscribe = async (ownerId: number) => {
  try {
    const res = await privateApi.get(`/${url}/add/${ownerId}`);
    const compSub: string = res.data;

    return compSub;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const cancelSubscribe = async (ownerId: number) => {
  try {
    const res = await privateApi.get(`/${url}/delete/${ownerId}`);
    const cancelSub: string = res.data;

    return cancelSub;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
