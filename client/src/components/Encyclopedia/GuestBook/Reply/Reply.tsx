import React, { useEffect, useRef, useState } from 'react';
import * as R from './Reply.style'
import ReplyItem from './ReplyItem';
import { getGuestBookData, postReply } from '../../../../api/guestBook';

interface replyItem {
  guestBookId: number;
  writerNickName: string;
  content: string;
  registDateTime: string;
}

interface replyInputData {
  ownerId: number;
  content: string;
}

// const replyList: replyItem[] = [
//   {
//     nickname: '성규몬',
//     profileImgUrl: 'https://s3.peing.net/t/uploads/user/icon/13630736/4ea0868e.jpeg',
//     createdDate: '2024.02.28',
//     content: '┏┓┏┓♡━━┓┏━━┓┏━━┓┏┓┏┓\n'+
//     '┃┗┛┃┃┏┓┃┃┏┓┃★┏┓┃┃┃☆┃\n' +
//     '┃┏┓┃┃┗┛┃┃┗┛┃┃┗┛┃┃┗┛┃\n' +
//     '┃♡┃┃┃┏┓┃┃♡━┛┃┏━┛♡┓┏┛\n' +
//     '┗┛┗┛┗┛┗┛┗┛♡♡┗┛♡♡♡┗┛♡',
//   },
//   {
//     nickname: '손동동',
//     profileImgUrl: 'https://mblogthumb-phinf.pstatic.net/data18/2007/8/15/228/npe14_bellland.jpg?type=w420',
//     createdDate: '2024.01.02',
//     content: '★━━━━━━\n' +
//     'ㅂㅂ ㅏ ㅅ ㅑ~!!!\n' +
//     '━━━━━━★',
//   },
//   {
//     nickname: '훈지박',
//     profileImgUrl: 'https://t1.daumcdn.net/news/202402/19/trend_a_word/20240219095401317wjns.png',
//     createdDate: '2023.12.30',
//     content: '┎──────......................................★☆★\n' +
//     '┃맑고고운 햇살처럼 해맑은 미소 지으시며~\n' +
//     '┖☆★☆\n',
//   },
//   {
//     nickname: '주니주니',
//     profileImgUrl: 'https://pbs.twimg.com/media/Dyt7HHwVAAIg2Oy.jpg',
//     createdDate: '2023.12.19',
//     content: '┏〓〓┓┏〓〓┓┏〓〓┓┏〓〓┓┏〓〓┓\n' +
//     '┃♡수┃┃♡집┃┃♡화┃┃♡이┃┃♡팅┃\n' +
//     '┗〓〓┛┗〓〓┛┗〓〓┛┗〓〓┛┗〓〓┛',
//   },
//   {
//     nickname: '조조',
//     profileImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEyOPtKP1Vs9PPLF3ie2qo6t7uLtZgrCd58Q&usqp=CAU',
//     createdDate: '2023.11.05',
//     content: '┏▶◀┓선물로\n' +
//     '┃남극┃보낼께요\n' +
//     '┃얼음┃더위 ~\n' +
//     '┗━━┛식히시고\n' +
//     '시원한 웃음 지어요^^*',
//   },
// ]

interface ReplyProps {
  userId: number;
}

const Reply: React.FC<ReplyProps> = ({ userId }) => {
  const [replyList, setReplyList] = useState<replyItem[]>([])
  const replyInput = useRef<HTMLInputElement>(null)
  const [replyData, setReplyData] = useState<replyInputData>({
    ownerId: userId,
    content: ''
  })

  useEffect(() => {
    getGuestBookData(userId)
      .then((res) => {
        setReplyList(res)
      })
      .catch((err) => console.error(err))
  }, [replyList])

  const handleReplyChange = (e: any) => {
    setReplyData({ ...replyData, ['content']: e.target.value });
  };
  
	const handlePost = () => {
    console.log(replyData)
		if (replyData.content.length < 1) {
			replyInput.current!.focus();
			return;
		}
    
		postReply(replyData)
		.then ((res) => {
      console.log(res)
		})
		.catch ((err) => {
			console.error(err)
		})
	}

  // const handleEnter = (e: any) => {
  //   if (e.key === "Enter") {
  //     handlePost(e);
  //   }
  // };

  return (
    <>
      <R.Container>
        {replyList.map((replyItem, index) => (
          <ReplyItem key={index} {...replyItem} />
        ))}
      </R.Container>
      <R.InputContainer>
        <R.InputWrap>
          <R.ReplyInput
            ref={replyInput}
            name='reply'
            type='text'
            // value={}
            autoComplete='off'
            placeholder='방명록을 남겨보세요!'
            onChange={(e) => handleReplyChange(e)}
            // onKeyDown={(e) => handleEnter(e)}
          />
          <R.ReplyBtn onClick={handlePost} />
        </R.InputWrap>
      </R.InputContainer>
    </>
  );
};

export default Reply;