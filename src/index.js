import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './GlobalStyle';
import GlobalFonts from './fonts/fonts.js';
// Redux setting
import { Provider } from 'react-redux';
import store from './redux/configStore';

// Router setting
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store = {store}>
        <HashRouter>
            <GlobalStyle/>
            <GlobalFonts/>
            <App />
        </HashRouter>
    </Provider>
)