import React from 'react';
import * as G from './GalleryUserInfo.style'
import { Link } from 'react-router-dom';

interface GalleryUserInfoProps {
  galleryItem : {
    userNickname: string;
    userProfileImg: string;
    getDate: number[];
    indivImgUrl: string;
    indivName: string;
  }
}

const GalleryUserInfo: React.FC<GalleryUserInfoProps> = ({ galleryItem }) => {
  return (
    <G.Container>
      <Link to={`/encyclopedia/${galleryItem.userNickname}`}>
        <G.UserProfileImg src={galleryItem.userProfileImg} />
      </Link>
      <G.UserTxt>
        <Link to={`/encyclopedia/${galleryItem.userNickname}`}>
          <G.NickTxt>{galleryItem.userNickname}</G.NickTxt>
        </Link>
        <G.DateTxt>{galleryItem.getDate[0]}. {galleryItem.getDate[1]}. {galleryItem.getDate[2]}</G.DateTxt>
      </G.UserTxt>
    </G.Container>
  );
};

export default GalleryUserInfo;