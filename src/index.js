import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Main from './Main';

import {createStore, combineReducers} from "redux";
import {Provider} from "react-redux";

const initialState = {
    sortBy: 'rooms'
}

const wrapperReducer = (state = initialState, action) => {
    switch (action.type) {
        /* case "SET_NAME":
            state = {
                ...state,
                name: action.payload
            };
            break;
        case "SET_AGE":
            state = {
                ...state,
                age: action.payload
            };
            break; */
    }
    return state;
};

var initialItemState = {};

for(let i = 0; i <= 133; i++) {
    /* initialItemState[i] = true; */
}

const itemReducer = (state = initialItemState, action) => {
    switch (action.type) {
        case "TOGGLE_ITEM":

            if(state[action.payload]) {
                delete state[action.payload];
            } else {
                state[action.payload] = true;
            }
            
            break;
    }
    console.log(state);
    
    return state;    
};

const store = createStore(combineReducers({wrapperReducer, itemReducer}));

store.subscribe(() => {
    /* console.log(store.getState()); */
    
})

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Main/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
