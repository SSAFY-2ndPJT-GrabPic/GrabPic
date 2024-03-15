import React from 'react';
import { Link } from "react-router-dom";
import * as R from './ReplyItem.style'

interface ReplyItemProps {
  nickname: string;
  profileImgUrl: string;
  createdDate: string;
  content: string;
}

const ReplyItem: React.FC<ReplyItemProps> = ({ nickname, profileImgUrl, createdDate, content}) => {
  return (
    <R.Container>
      <R.ProfileImg src={profileImgUrl} />
      <R.ContentContainer>
        <R.NickNDateContainer>
          <R.NickName>{nickname}</R.NickName>
          <R.SmallTxt>{createdDate}</R.SmallTxt>
        </R.NickNDateContainer>
        <R.Content>{content}</R.Content>
      </R.ContentContainer>
    </R.Container>
  );
};

export default ReplyItem;