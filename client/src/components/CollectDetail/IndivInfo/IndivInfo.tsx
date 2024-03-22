import React from 'react';
import * as I from '../DetailInfo.style'

interface IndivInfoProps {
  indivInfo: {
    indivImageUrl: string;
    indivName: string;
    indivEngName: string;
    indivClassify: string[];
    summaryDetail: string;
    details: string;
  }
}

const IndivInfo: React.FC<IndivInfoProps> = ({ indivInfo }) => {
  return (
    <I.Container>
      <I.Wrap>
        <I.Title>요약</I.Title>
        <I.Context>{indivInfo.summaryDetail}</I.Context>
      </I.Wrap>

      <I.Wrap>
        <I.Title>상세 설명</I.Title>
        <I.Context>{indivInfo.details}</I.Context>
      </I.Wrap>
    </I.Container>
  );
};

export default IndivInfo;