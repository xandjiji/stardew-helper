import { createStore, combineReducers } from "redux";

import themeReducer from "./reducers/themeReducer"
import modeReducer from "./reducers/modeReducer"
import itemReducer from "./reducers/itemReducer"
import itemModalReducer from "./reducers/itemModalReducer"
import locationReducer from "./reducers/locationReducer"
import dateReducer from "./reducers/dateReducer"

export default createStore(combineReducers({ modeReducer, itemReducer, themeReducer, itemModalReducer, locationReducer, dateReducer }));