import React from 'react';
import * as G from './GalleryImg.style';
import { GalleryItemType } from '../../type/GalleryType';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { backState } from '../../recoil/atoms/DetailBackState';
import { galleryLog } from '../../api/gallery';

interface GalleryImgProps {
  galleryItem: GalleryItemType;
}

const GalleryImg: React.FC<GalleryImgProps> = ({ galleryItem }) => {
  const setBackWhereState = useSetRecoilState(backState);
  const navigate = useNavigate();

  const navigateHandler = () => {
    galleryLog(
      galleryItem.encyclopediaId,
      () => {},
      (err) => { console.error(err) },
    )

    navigate(`/detail/${galleryItem.name}`, {
      state: {
        encyclopediaId: galleryItem.encyclopediaId,
        userId: galleryItem.writerId,
      },
    });
    setBackWhereState('gallery')
  };

  return (
    <G.Container>
      <div onClick={() => navigateHandler()}>
        <G.ItemImg src={galleryItem.thumbnailImageUrl} />
        <G.NameTag>{galleryItem.name}</G.NameTag>
      </div>
    </G.Container>
  );
};

export default GalleryImg;
