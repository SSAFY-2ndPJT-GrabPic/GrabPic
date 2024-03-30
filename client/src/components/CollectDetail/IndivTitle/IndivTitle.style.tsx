import styled from "styled-components";
import loadingDefault from '../../../assets/CollectDetail/loadingGif.gif'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const NamePlyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

export const PlayBtn = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(86, 86, 86, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
`

export const PlayBtnImg = styled.img`
  width: 18px;
`

export const RepresentImg = styled.img.attrs(({ src }) => ({
  src: src || loadingDefault, alt: '대표이미지'
}))`
  width: 100%;
  height: 250px;
  object-fit: cover;
  object-position: 50% 50%;

  ${({ src }) => src === loadingDefault && `
      height: 150px;
      object-fit: contain;
  `}
`

export const AIVideo = styled.video`
  width: 100%;
  height: 250px;
  object-fit: cover;
  object-position: 50% 50%;

  ${({ src }) => src === loadingDefault && `
      height: 150px;
      object-fit: contain;
  `}
`

export const InfoWrap = styled.div`
  width: 100%;
  height: 104px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const NameTxt = styled.div`
  font-family: 'BMJUA';
  font-size: 28px;
  text-align: center;
  color: #363636;
`

export const EngNameTxt = styled.div`
  font-family: 'TmoneyR';
  font-size: 16px;
  color: #363636;
  text-align: center;
`

export const ClassifyTxt = styled.div`
  font-family: 'TmoneyR';
  font-size: 12px;
  color: #363636;
  text-align: center;
`