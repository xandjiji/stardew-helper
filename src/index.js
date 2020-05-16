import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Main from './Main';

import { Provider } from "react-redux";
import throttle from "lodash.throttle";

import store from "./redux/store";
import localStore from "./redux/localStore";

store.subscribe(throttle(() => {
    localStore.saveData(store.getState());
}, 1000));

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('root')
);
