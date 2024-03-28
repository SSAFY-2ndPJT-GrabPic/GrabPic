import React from 'react';
import * as G from './GalleryImg.style'
import { GalleryItemType } from '../../type/GalleryType';

interface GalleryImgProps {
  galleryItem : GalleryItemType
}

const GalleryImg: React.FC<GalleryImgProps> = ({ galleryItem }) => {
  return (
    <G.Container>
      <G.ItemImg src={galleryItem.thumbnailImageUrl} />
      <G.NameTag>{galleryItem.name}</G.NameTag>
    </G.Container>
  );
};

export default GalleryImg;