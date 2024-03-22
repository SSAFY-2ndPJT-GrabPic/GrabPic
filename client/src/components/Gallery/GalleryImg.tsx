import React from 'react';
import * as G from './GalleryImg.style'

interface GalleryImgProps {
  galleryItem : {
    userNickname: string;
    userProfileImg: string;
    getDate: number[];
    indivImgUrl: string;
    indivName: string;
  }
}

const GalleryImg: React.FC<GalleryImgProps> = ({ galleryItem }) => {
  return (
    <G.Container>
      <G.ItemImg src={galleryItem.indivImgUrl} />
      <G.NameTag>{galleryItem.indivName}</G.NameTag>
    </G.Container>
  );
};

export default GalleryImg;