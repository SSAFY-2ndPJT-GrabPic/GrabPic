import React from 'react';
import GalleryUserInfo from './GalleryUserInfo';
import GalleryImg from './GalleryImg';
import * as G from './GalleryItem.style'

interface GalleryItemProps {
  galleryItem : {
    userNickname: string;
    userProfileImg: string;
    getDate: number[];
    indivImgUrl: string;
    indivName: string;
  }
}

const GalleryItem: React.FC<GalleryItemProps> = ({ galleryItem }) => {
  return (
    <G.Container>
      <GalleryUserInfo galleryItem={galleryItem}  />
      <GalleryImg galleryItem={galleryItem} />
    </G.Container>
  );
};

export default GalleryItem;