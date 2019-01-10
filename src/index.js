/* 강의 React JS로 웹 서비스 만들기! 2-3 */

import React from 'react'
import ReactDOM from 'react-dom';   									// Document Object Model
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));				// App.js - index.html(element ID : root) 매핑
serviceWorker.unregister();


// react는 라이브러리, reactDOM은 라이브러리를 WEB으로 출력해줌

// ReactDOM(WEB)
// ReactNative(MOBILE)


