export interface MapCenter {
    lat: number;
    lng: number;
}
  
export interface MyCenter {
    lat: number;
    lng: number;
}

export interface PinData {
    encyclopedia: string;
    name: string;
    registDateTime: string;
    address: string;
    latitude: number;
    longitude: number;
    rareCount: 0;
}

export interface RequestData {
    latitude:  number;
    longitude:  number;
    range:  number;
    page : number;
    limit : number;
    sort : number
}

export enum ScaleDistance {
    level1 = 0.04,
    level2 = 0.09,
    level3 = 0.15,
    level4 = 0.3,
    level5 = 0.75,
    level6 = 1.5,
    level7 = 3,
    level8 = 6,
    level9 = 12,
    level10 = 24,
    level11 = 48,
    level12 = 96,
    level13 = 192,
    level14 = 384
}

export type ScaleDistanceKey = keyof typeof ScaleDistance;