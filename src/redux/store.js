import { createStore, combineReducers } from "redux";

import themeReducer from "./reducers/themeReducer"
import wrapperReducer from "./reducers/wrapperReducer"
import itemReducer from "./reducers/itemReducer"

export default createStore(combineReducers({ wrapperReducer, itemReducer, themeReducer }));