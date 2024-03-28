import React, { useEffect, useState } from 'react';
import * as R from './ReplyItem.style'
import { getUserInfo } from '../../../../api/user';

interface ReplyItemProps {
  guestBookId: number;
  writerId: number;
  writerNickName: string;
  content: string;
  registDateTime: string;
}

const ReplyItem: React.FC<ReplyItemProps> = ({ writerNickName, writerId, content, registDateTime}) => {
  const timeTransHandler = (registDateTime: string) => {
    const commentDateTime = new Date(registDateTime);  // 댓글 작성 시간
    const currentTime = new Date();                    // 현재 시간
    const difference = currentTime.getTime() - commentDateTime.getTime();    // 두 시간의 차
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks >= 1) {
      // .replace()는 첫번째 문자열만 치환 => "/-/g" //로 감싸진 모든 문자열을 치환해줌 (g = global match)
      const when = registDateTime.split('T')[0].replace(/-/g, '.')
      return when;
    } else if (1 == weeks && weeks > 0) {
      return `${weeks}주 전`;
    } else if (days > 0) {
      return `${days}일 전`;
    } else if (hours > 0) {
      return `${hours}시간 전`;
    } else if (minutes > 0) {
      return `${minutes}분 전`;
    } else {
      return `${seconds}초 전`;
    }
  }

  const [userImgUrl, setUserImgUrl] = useState<string>('')
  useEffect(() => {
    getUserInfo(
      writerId,
      (res) => {
        setUserImgUrl(res.data.profileImage)
      },
      (err) => console.error(err)
    )

  }, [])

  
  return (
    <R.Container>
      <R.ImgContainer to={`/encyclopedia/${writerNickName}`} state={{ userId: writerId }}>
        <R.ProfileImg src={userImgUrl} />
      </R.ImgContainer>
      <R.ContentContainer>
        <R.NickNDateContainer>
          <R.NickName to={`/encyclopedia/${writerNickName}`} state={{ userId: writerId }}>{writerNickName}</R.NickName>
          <R.SmallTxt>{timeTransHandler(registDateTime)}</R.SmallTxt>
        </R.NickNDateContainer>
        <R.Content>{content}</R.Content>
      </R.ContentContainer>
    </R.Container>
  );
};

export default ReplyItem;
