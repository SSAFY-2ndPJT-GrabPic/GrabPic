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
      <Link to={`/encyclopedia/${nickname}`}>
        <R.ProfileImg src={profileImgUrl} />
      </Link>
      <R.ContentContainer>
        <R.NickNDateContainer>
          <Link to={`/encyclopedia/${nickname}`}>
            <R.NickName>{nickname}</R.NickName>
          </Link>
          <R.SmallTxt>{createdDate}</R.SmallTxt>
        </R.NickNDateContainer>
        <R.Content>{content}</R.Content>
      </R.ContentContainer>
    </R.Container>
  );
};

export default ReplyItem;
