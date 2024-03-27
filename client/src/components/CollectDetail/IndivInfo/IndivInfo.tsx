import React from 'react';
import * as I from '../DetailInfo.style'
import { CollectDetailType } from '../../../type/CollectDetailType';

interface IndivInfoProps {
  indivInfo: CollectDetailType
}

const IndivInfo: React.FC<IndivInfoProps> = ({ indivInfo }) => {
  return (
    <I.Container>
      {/* <I.Wrap>
        <I.Title>요약</I.Title>
        <I.Context>{indivInfo.summaryDetail}</I.Context>
      </I.Wrap> */}

      <I.Wrap>
        <I.Title>상세 설명</I.Title>
        <I.Context>{indivInfo.content}</I.Context>
      </I.Wrap>
    </I.Container>
  );
};

export default IndivInfo;