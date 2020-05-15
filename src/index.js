import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Main from './Main';

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import throttle from 'lodash.throttle';

const initialState = loadData();

const wrapperReducer = (state = initialState.wrapperReducer, action) => {
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

const itemReducer = (state = initialState.itemReducer, action) => {
    switch (action.type) {
        case "TOGGLE_ITEM":
            if (state[action.payload]) {
                delete state[action.payload];
                state = {
                    ...state
                }
            } else {
                state[action.payload] = true;
                state = {
                    ...state
                }
            }

            break;

        case "TOGGLE_ALL":
            if (!action.payload.allCompleted) {

                action.payload.idArray.forEach(element => {
                    state[element] = true;
                    state = {
                        ...state
                    }
                });

            } else {
                action.payload.idArray.forEach(element => {
                    delete state[element];
                    state = {
                        ...state
                    }
                });
            }

            break;
    }

    return state;
};

function saveData(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
}

function loadData() {
    let defaultState = {
        itemReducer: {},
        wrapperReducer : {
            sortBy: "rooms"
        }
    }
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return defaultState;
        }
        
        return JSON.parse(serializedState);
    } catch (err) {
        return defaultState;
    }
}

const store = createStore(combineReducers({ wrapperReducer, itemReducer }));

store.subscribe(throttle(() => {
    saveData(store.getState());
}, 1000));

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('root')
);
