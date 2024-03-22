import React from 'react';
import { Link } from "react-router-dom";
import * as R from './ReplyItem.style'

interface ReplyItemProps {
  guestBookId: number;
  writerNickName: string;
  content: string;
  registDateTime: string;
}

const ReplyItem: React.FC<ReplyItemProps> = ({ writerNickName, content, registDateTime}) => {
  return (
    <R.Container>
      <Link to={`/encyclopedia/${writerNickName}`}>
        <R.ProfileImg src={''} />
      </Link>
      <R.ContentContainer>
        <R.NickNDateContainer>
          <Link to={`/encyclopedia/${writerNickName}`}>
            <R.NickName>{writerNickName}</R.NickName>
          </Link>
          <R.SmallTxt>{registDateTime}</R.SmallTxt>
        </R.NickNDateContainer>
        <R.Content>{content}</R.Content>
      </R.ContentContainer>
    </R.Container>
  );
};

export default ReplyItem;
