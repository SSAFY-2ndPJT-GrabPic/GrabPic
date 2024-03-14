import { createGlobalStyle } from "styled-components"
import bmJUA from "../fonts/BMJUA_ttf.ttf";
import jalnan from "../fonts/Jalnan2TTF.ttf";
import tmoneyExtra from "../fonts/TmoneyRoundWindExtraBold.ttf";
import tmoneyReqular from "../fonts/TmoneyRoundWindRegular.ttf";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'BMJUA';
    src: url(${bmJUA}) format('truetype');
    font-weight: normal;
  }

  @font-face {
    font-family: 'Jalnan';
    src: url(${jalnan}) format('truetype');
    font-weight: normal;
  }

  @font-face {
    font-family: 'TmoneyEB';
    src: url(${tmoneyExtra}) format('truetype');
    font-weight: 800;
  }

  @font-face {
    font-family: 'TmoneyR';
    src: url(${tmoneyReqular}) format('truetype');
    font-weight: normal;
  }

  /* 박병조 테스트 코드 추후 적용 공지 및 설명 예정*/
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  #root {
    width: 100%;
    height: 100%;
  }
`;