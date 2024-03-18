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
        <>{galleryItem.userNickname}</>
        <>{galleryItem.getDate[0]}</>
      </G.UserTxt>
    </G.Container>
  );
};

export default GalleryUserInfo;