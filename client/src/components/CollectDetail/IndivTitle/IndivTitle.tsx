import React from 'react';
import * as I from './IndivTitle.style'

interface IndivTitleProps {
  indivInfo : {
    indivImageUrl: string;
    indivName: string;
    indivEngName: string;
    indivClassify: string[];
    summaryDetail: string;
    details: string;
  }
}

const IndivTitle: React.FC<IndivTitleProps> = ({ indivInfo }) => {
  return (
    <I.Container>
      <I.RepresentImg src={indivInfo.indivImageUrl} />
      <I.InfoWrap>
        <I.NameTxt>{indivInfo.indivName}</I.NameTxt>
        <I.EngNameTxt>{indivInfo.indivEngName}</I.EngNameTxt>
        <I.ClassifyTxt>
          {indivInfo.indivClassify.map((item, idx) => (
            `${item} ${idx === (indivInfo.indivClassify.length - 1) ? '' : '/ '}`
          ))}
        </I.ClassifyTxt>
      </I.InfoWrap>
    </I.Container>
  );
};

export default IndivTitle;