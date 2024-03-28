import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  /* height: 360px; */
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
`

export const ItemImg = styled.img.attrs(({ src }) => ({
  src: src, alt: 'indivImg'
}))`
  width: 100%;
  /* height: 360px; */
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
  background-color: #E0E0E0;
  opacity: 0.5;
  font-family: 'BMJUA';
  font-size: 18px;
  color: #363636;
`