import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import Main from './Main';

import { Provider } from "react-redux";
import throttle from "lodash.throttle";

import store from "./redux/store";
import localStore from "./redux/localStore";

import { setTheme } from './utils';

import themes from './jsons/themes.json';

setTheme(themes, store.getState().themeReducer)

store.subscribe(throttle(() => {
    localStore.saveData(store.getState());
}, 1000));

ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <Main />
        </Provider>
    </StrictMode>,
    document.getElementById('root')
);