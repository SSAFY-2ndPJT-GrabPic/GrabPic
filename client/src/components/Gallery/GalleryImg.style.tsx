import styled from "styled-components";
import galleryDefault from '../../assets/Gallery/galleryDefaultImg.png'

export const Container = styled.div`
  position: relative;
  width: 100%;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
`

export const ItemImg = styled.img.attrs(({ src }) => ({
  src: src === "tmp" || src === null ? galleryDefault : src, alt: 'indivImg'
}))`
  width: 100%;
  object-fit: contain;

  ${props => (props.src === 'tmp' || props.src === null) &&`
    height: 360px;
  `}
`

export const NameTag = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 8px;
  right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85px;
  height: 30px;
  border-radius: 5px;
  background-color: rgba(224, 224, 224, 0.5);
  font-family: 'BMJUA';
  font-size: 18px;
  color: #363636;
`