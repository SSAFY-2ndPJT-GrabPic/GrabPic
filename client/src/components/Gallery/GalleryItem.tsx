import React from 'react';
import GalleryUserInfo from './GalleryUserInfo';
import GalleryImg from './GalleryImg';
import * as G from './GalleryItem.style'
import { GalleryItemType } from '../../type/GalleryType';

interface GalleryItemProps {
  galleryItem : GalleryItemType
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