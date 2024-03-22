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
registDate: string;
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

export interface ResponseData {
    data: string;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: string;
}
