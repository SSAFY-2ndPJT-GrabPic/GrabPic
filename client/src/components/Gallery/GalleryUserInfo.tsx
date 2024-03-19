import React from 'react';
import * as G from './GalleryUserInfo.style'

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
      <G.UserProfileImg src={galleryItem.userProfileImg} />
      <G.UserTxt>
        <G.NickTxt>{galleryItem.userNickname}</G.NickTxt>
        <G.DateTxt>{galleryItem.getDate[0]}. {galleryItem.getDate[1]}. {galleryItem.getDate[2]}</G.DateTxt>
      </G.UserTxt>
    </G.Container>
  );
};

export default GalleryUserInfo;