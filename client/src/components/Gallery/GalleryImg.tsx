import React from 'react';
// import * as G from './GalleryImg.style'

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
    <h1>GalleryImg</h1>
  );
};

export default GalleryImg;