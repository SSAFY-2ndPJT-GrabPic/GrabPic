import React, { useState } from 'react';
import * as I from './IndivTitle.style'
import { CollectDetailType } from '../../../type/CollectType';
import PauseImg from '../../../assets/CollectDetail/pause.png'
import PlayImg from '../../../assets/CollectDetail/play.png'
import ReactPlayer from 'react-player';
// import testVideo from '../../../assets/CollectDetail/testVideo.mp4'

interface IndivTitleProps {
  indivInfo: CollectDetailType
}

const IndivTitle: React.FC<IndivTitleProps> = ({ indivInfo }) => {
  const [isImage, setIsImage] = useState<boolean>(true)

  return (
    <I.Container>
        {isImage
          ? <I.RepresentImg src={indivInfo.imageUrl === 'tmp' || null ? '' : indivInfo.imageUrl} />
          // : <I.AIVideo src={testVideo} autoPlay loop muted />}
          // : <I.AIVideo autoPlay loop muted controls>
          //     <source src={indivInfo.shortsVideoUrl ? indivInfo.shortsVideoUrl : ''} />
          //   </I.AIVideo>
          : <ReactPlayer url={indivInfo.shortsVideoUrl} />
        }
          {/* <I.AIVideo src="https://grabpic.s3.ap-northeast-2.amazonaws.com/frame/118.mp4" autoPlay loop muted controls />
          <I.AIVideo src="https://va.media.tumblr.com/tumblr_o600t8hzf51qcbnq0_480.mp4" autoPlay loop muted controls />
          <I.AIVideo src="https://media.w3.org/2010/05/sintel/trailer.mp4" autoPlay loop muted controls /> */}
      <I.InfoWrap>
        <I.NamePlyContainer>
          <I.NameTxt>
            {indivInfo.name}
          </I.NameTxt>
          <I.PlayBtn onClick={() => {setIsImage(!isImage)}}>
            <I.PlayBtnImg src={isImage ? PlayImg : PauseImg} />
          </I.PlayBtn>
        </I.NamePlyContainer>


        {/* <I.EngNameTxt>{indivInfo.indivEngName}</I.EngNameTxt> */}
        <I.ClassifyTxt>
          {/* {indivInfo.indivClassify.map((item, idx) => (
            `${item} ${idx === (indivInfo.indivClassify.length - 1) ? '' : '/ '}`
          ))} */}
          {indivInfo.ordo} / {indivInfo.familia} / {indivInfo.genus} / {indivInfo.species}
        </I.ClassifyTxt>
      </I.InfoWrap>
    </I.Container>
  );
};

export default IndivTitle;
