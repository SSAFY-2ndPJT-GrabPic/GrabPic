import { privateApi } from '../utils/http-commons';

const url = 'encyclopedia';

export const getCollectList = async (userId: number) => {
  try {
    const res = await privateApi.get(`/${url}/preview/${userId}`);
    const collectList = res.data;

    return collectList;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCollectDetail = async (encyclopediaId: number) => {
  try {
    const res = await privateApi.get(`/${url}/detail/${encyclopediaId}`);
    const collectDetail = res.data;

    return collectDetail;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const registEncy = async (params: {
  biologyId : number;
  registDate : string;
  latitude : number;
  longitude : number;
  address : string;
  content : string;
  imageUrl : string;
}) => {
  try {
    const res = await privateApi.post(`/${url}/add`, params);
    const isRegist = res.data;

    return isRegist;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
