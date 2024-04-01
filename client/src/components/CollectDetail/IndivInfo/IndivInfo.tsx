import React from 'react';
import * as I from '../DetailInfo.style'
import { CollectDetailType } from '../../../type/CollectType';

interface IndivInfoProps {
  indivInfo: CollectDetailType
}

const IndivInfo: React.FC<IndivInfoProps> = ({ indivInfo }) => {
  return (
    <I.Container>

      {
        indivInfo.summury ?
        <I.Wrap>
          <I.Title>요약</I.Title>
          <I.Context>{indivInfo.summury}</I.Context>
        </I.Wrap>
        : null
      }

      {
        indivInfo.title1 ? 
        <I.Wrap>
          <I.Title>{indivInfo.title1}</I.Title>
          <I.Context>{indivInfo.content1}</I.Context>
        </I.Wrap>
        : null      
      }

      {
        indivInfo.title2 ?
        <I.Wrap>
          <I.Title>{indivInfo.title2}</I.Title>
          <I.Context>{indivInfo.content2}</I.Context>
        </I.Wrap>
        : null
      }

      { 
        indivInfo.title3 ?
        <I.Wrap>
          <I.Title>{indivInfo.title3}</I.Title>
          <I.Context>{indivInfo.content3}</I.Context>
        </I.Wrap>
        : null
      }
      
    </I.Container>
  );
};

export default IndivInfo;