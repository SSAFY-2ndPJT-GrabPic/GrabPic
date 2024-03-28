export interface CollectDetailType {
  encyclopediaId: number;
  name: string;
  species: string;
  genus: string;
  familia: string;
  ordo: string;
  content: string;
  registDate: string;
  memo: string;
  latitude: number;
  longitude: number;
  address: string;
  imageUrl: string;
  shortsVideoUrl: null;
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