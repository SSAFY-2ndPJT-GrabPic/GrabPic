import { atom } from 'recoil';
import { ElementsParams } from '../../type/CameraType';

export const elementsState = atom<ElementsParams[]>({
    key: 'elementsState',
    default: [],
})