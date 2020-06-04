import { createStore, combineReducers } from "redux";

import themeReducer from "./reducers/themeReducer"
import modeReducer from "./reducers/modeReducer"
import itemReducer from "./reducers/itemReducer"
import itemModalReducer from "./reducers/itemModalReducer"

export default createStore(combineReducers({ modeReducer, itemReducer, themeReducer, itemModalReducer }));