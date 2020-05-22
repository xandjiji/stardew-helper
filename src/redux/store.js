import { createStore, combineReducers } from "redux";

import themeReducer from "./reducers/themeReducer"
import modeReducer from "./reducers/modeReducer"
import itemReducer from "./reducers/itemReducer"

export default createStore(combineReducers({ modeReducer, itemReducer, themeReducer }));