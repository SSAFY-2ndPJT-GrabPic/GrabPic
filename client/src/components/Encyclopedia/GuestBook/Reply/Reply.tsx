import React, { useEffect, useRef, useState } from 'react';
import * as R from './Reply.style'
import ReplyItem from './ReplyItem';
import { getGuestBookData, postReply } from '../../../../api/guestBook';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../../../recoil/atoms/UserState';

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

interface ReplyProps {
  userId: number;
}

const Reply: React.FC<ReplyProps> = ({ userId }) => {
  const [replyList, setReplyList] = useState<replyItem[]>([])
  const replyInput = useRef<HTMLInputElement>(null)
  const myId = useRecoilValue(userInfoState)

  const [replyData, setReplyData] = useState<replyInputData>({
    ownerId: userId,
    content: ''
  })

  // 방명록 리스트 조회 api
  useEffect(() => {
    getGuestBookData(userId)
      .then((res) => {
        console.log(res)
        setReplyList(res)
      })
      .catch((err) => console.error(err))
  }, [])

  // 방명록 작성 input값 변동될 때마다 replyData 갱신
  const handleReplyChange = (e: any) => {
    setReplyData({ ...replyData, ['content']: e.target.value });
  };
  
  // 방명록 작성 요청
	const handlePost = () => {
    // 방명록 작성 input값 1 미만이면 작성 창으로 포커싱
		if (replyData.content.length < 1) {
			replyInput.current!.focus();
			return;
		}
    
    // 방명록 작성 api 요청 
		postReply(replyData)
		.then ((res) => {
      console.log(res)
      // 방명록 작성 데이터 새로고침 없이 바로 갱신
      setReplyList([{
        'guestBookId': replyData.ownerId,
        'writerNickName': myId.nickname,
        'content': replyData.content,
        'registDateTime': ''
      }, ...replyList])
		})
    .then(() => {
      // 데이터 초기화
      setReplyData({
        ownerId: userId,
        content: ''
      })
    })
		.catch ((err) => {
			console.error(err)
		})
	}

  // 엔터 클릭해도 작성 가능하도록
  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      handlePost();
    }
  };

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
            value={replyData.content}    // input창에 보이는 값
            autoComplete='off'
            placeholder='방명록을 남겨보세요!'
            onChange={(e) => handleReplyChange(e)}
            onKeyDown={(e) => handleEnter(e)}
          />
          <R.ReplyBtn onClick={handlePost} />
        </R.InputWrap>
      </R.InputContainer>
    </>
  );
};

export default Reply;