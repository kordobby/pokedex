import { createGlobalStyle } from 'styled-components';
import DotFont from './dotfont.woff';

export default createGlobalStyle`
@font-face {
  font-family : "DotFont"; // 폰트 사용할 때 부르는 이름 지정
  src: local("DotFont");   // 지정한 이름
  url(${DotFont}) format('woff');
}
`;