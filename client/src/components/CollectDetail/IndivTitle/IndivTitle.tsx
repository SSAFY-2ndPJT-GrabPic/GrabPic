import React, { useState } from 'react';
import * as I from './IndivTitle.style'
import { CollectDetailType } from '../../../type/CollectType';
import PauseImg from '../../../assets/CollectDetail/pause.png'
import PlayImg from '../../../assets/CollectDetail/play.png'
import testVideo from '../../../assets/CollectDetail/testVideo.mp4'

interface IndivTitleProps {
  indivInfo: CollectDetailType
}

const IndivTitle: React.FC<IndivTitleProps> = ({ indivInfo }) => {
  const [isImage, setIsImage] = useState<boolean>(true)

  return (
    <I.Container>
        {isImage
          ? <I.RepresentImg src={indivInfo.imageUrl === 'tmp' || null ? '' : indivInfo.imageUrl} />
          : <I.AIVideo src={testVideo} autoPlay loop muted />}

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
