export interface CollectDetailType {
  address: string;
  content1?: string;
  content2?: string;
  content3?: string;
  encyclopediaId: number;
  familia: string;
  genus: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  memo: string;
  name: string;
  ordo: string;
  registDateTime: string;
  shortsVideoUrl: string;
  species: string;
  summary: string;
  title1: string;
  title2: string;
  title3: string;
}

export interface CollectItem {
  encyclopediaId: number;
  name: string;
  thumbnailImageUrl: string;
}

export interface RegistType {
  biologyId : number;
  registDate : string;
  latitude : number;
  longitude : number;
  address : string;
  content : string;
  imageUrl : string;
}

export interface chartParamType {
  ordo?:string;
  familia?:string;
  species?:string;
  genus?:string;
}