import React, { useEffect, useRef, useState } from 'react';
import * as R from './Reply.style'
import ReplyItem from './ReplyItem';
import { getGuestBookData, postReply } from '../../../../api/guestBook';
import { replyInputData, replyItem } from '../../../../type/GuestBookType';


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
		postReply(
      replyData,
      
      (res) => {
        // 방명록 작성 데이터 새로고침 없이 바로 갱신
        setReplyList([{
          'guestBookId': res.data.guestBookId,
          'writerId': res.data.writerId,
          'writerNickName': res.data.writerNickName,
          'content': res.data.content,
          'registDateTime': res.data.registDateTime
        }, ...replyList])
        
        setReplyData({
          ownerId: userId,
          content: ''
        })
      },
      (err) => {
        console.error(err)
      }
    )
	}

  // 엔터 클릭해도 작성 가능하도록
  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      handlePost();
    }
  };

  // ========== 무한스크롤 ==================
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // observer 컴포넌트 만나면 발생하는 콜백 함수 -> loading중 표시
  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];

    if (target.isIntersecting && !isLoading) {
      setIsLoading(true)
    }
  };
  
  // threshold : Intersection Observer의 옵션, 0 ~ 1 (0: 일 때는 교차점이 한 번만 발생해도 실행, 1은 모든 영역이 교차해야 콜백 함수가 실행)
  const observer = new IntersectionObserver(handleObserver, { threshold: 0 });

  useEffect(() => {
    // 최하단 요소를 관찰 대상으로 지정함
    const observerTarget = document.getElementById("observer");
    // 관찰 시작
    if (observerTarget) {
      observer.observe(observerTarget);
    }
  }, [])

  // 로딩중이면 페이지 상승 + api 요청
  // useEffect가 isLoading의 상태 변화를 계속 추적하며 api 쏘므로
  // setTimeout을 통해 api 요청 한번만 갈 수 있도록 수정
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setPage((page) => page + 1);
        fetchDataHandler();
      }, 10)
    }
  }, [isLoading])

  useEffect(() => {
    setReplyList([])
    setPage(1)
    setIsLoading(false)
  }, [userId])

  // replyList에 데이터 추가 및 loading상태 변경
  const fetchDataHandler = async () => {
    await getGuestBookData(
      userId,
      page,
      (res) => {
        setReplyList(prevList => prevList.concat(res.data))
      },
      (err) => { console.error(err) }
    )
    setIsLoading(false)
  }

  // // 방명록 리스트 조회 api
  // useEffect(() => {
  //   getGuestBookData(
  //     userId,
  //     1,
  //     (res) => {
  //       setReplyList(res.data)
  //     },
  //     (err) => { console.error(err) }
  //   )
  // }, [userId])


  return (
    <>
      <R.Container>
        {replyList.map((replyItem, index) => (
          <ReplyItem key={index} {...replyItem} />
        ))}
        <div id='observer' />
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