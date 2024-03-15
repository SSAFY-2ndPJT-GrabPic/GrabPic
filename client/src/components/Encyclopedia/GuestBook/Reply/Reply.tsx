import React from 'react';
import * as R from './Reply.style'
import ReplyItem from './ReplyItem';

interface replyItem {
  nickname: string;
  profileImgUrl: string;
  createdDate: string;
  content: string;
}

const replyList: replyItem[] = [
  {
    nickname: '성규몬',
    profileImgUrl: 'https://s3.peing.net/t/uploads/user/icon/13630736/4ea0868e.jpeg',
    createdDate: '2024.02.28',
    content: '┏┓┏┓♡━━┓┏━━┓┏━━┓┏┓┏┓\n'+
    '┃┗┛┃┃┏┓┃┃┏┓┃★┏┓┃┃┃☆┃\n' +
    '┃┏┓┃┃┗┛┃┃┗┛┃┃┗┛┃┃┗┛┃\n' +
    '┃♡┃┃┃┏┓┃┃♡━┛┃┏━┛♡┓┏┛\n' +
    '┗┛┗┛┗┛┗┛┗┛♡♡┗┛♡♡♡┗┛♡',
  },
  {
    nickname: '손동동',
    profileImgUrl: 'https://mblogthumb-phinf.pstatic.net/data18/2007/8/15/228/npe14_bellland.jpg?type=w420',
    createdDate: '2024.01.02',
    content: '★━━━━━━\n' +
    'ㅂㅂ ㅏ ㅅ ㅑ~!!!\n' +
    '━━━━━━★',
  },
  {
    nickname: '훈지박',
    profileImgUrl: 'https://t1.daumcdn.net/news/202402/19/trend_a_word/20240219095401317wjns.png',
    createdDate: '2023.12.30',
    content: '┎──────......................................★☆★\n' +
    '┃맑고고운 햇살처럼 해맑은 미소 지으시며~\n' +
    '┖☆★☆\n',
  },
  {
    nickname: '주니주니',
    profileImgUrl: 'data:image/jpeg;base64,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',
    createdDate: '2023.12.19',
    content: '┏〓〓┓┏〓〓┓┏〓〓┓┏〓〓┓┏〓〓┓\n' +
    '┃♡수┃┃♡집┃┃♡화┃┃♡이┃┃♡팅┃\n' +
    '┗〓〓┛┗〓〓┛┗〓〓┛┗〓〓┛┗〓〓┛',
  },
  {
    nickname: '조조',
    profileImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEyOPtKP1Vs9PPLF3ie2qo6t7uLtZgrCd58Q&usqp=CAU',
    createdDate: '2023.11.05',
    content: '┏▶◀┓선물로\n' +
    '┃남극┃보낼께요\n' +
    '┃얼음┃더위 ~\n' +
    '┗━━┛식히시고\n' +
    '시원한 웃음 지어요^^*',
  },
]

interface ReplyProps {}

const Reply: React.FC<ReplyProps> = () => {
  return (
    <R.Container>
      {replyList.map((replyItem, index) => (
        <ReplyItem key={index} {...replyItem} />
      ))}
      <R.InputContainer>
        <R.InputWrap>
          <R.ReplyInput autoComplete='off' />
          <R.ReplyBtn />
        </R.InputWrap>
      </R.InputContainer>
    </R.Container>
  );
};

export default Reply;