import { privateApi } from '../utils/http-commons';
import { subItem } from '../type/SubListType';

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

interface subReturn {
  actionTypeForBackEnd: number;
  ownerSubCount: number;
}

export const wantSubscribe = async (ownerId: number) => {
  try {
    const res = await privateApi.get(`/${url}/add/${ownerId}`);
    const compSub: subReturn = res.data;

    return compSub;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const cancelSubscribe = async (ownerId: number) => {
  try {
    const res = await privateApi.get(`/${url}/delete/${ownerId}`);
    const cancelSub: subReturn = res.data;

    return cancelSub;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSubUsers = async (ownerId: number) => {
  try {
    const res = await privateApi.get(`/${url}/relationer/list/${ownerId}`);
    const subUserList: subItem[] = res.data;

    return subUserList;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSubEncys = async (ownerId: number) => {
  try {
    const res = await privateApi.get(`/${url}/relationing/list/${ownerId}`);
    const subEncyList: subItem[] = res.data;

    return subEncyList;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

