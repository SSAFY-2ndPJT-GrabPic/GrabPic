import React from 'react';
import * as I from './IndivTitle.style'
import { CollectDetailType } from '../../../type/CollectType';

interface IndivTitleProps {
  indivInfo: CollectDetailType
}

const IndivTitle: React.FC<IndivTitleProps> = ({ indivInfo }) => {
  return (
    <I.Container>
      <I.RepresentImg src={indivInfo.imageUrl === 'tmp' || null ? '' : indivInfo.imageUrl} />
      <I.InfoWrap>
        <I.NameTxt>{indivInfo.name}</I.NameTxt>
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
