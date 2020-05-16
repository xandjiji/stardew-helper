import localStore from "../localStore";

const initialState = localStore.loadData();

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

export default wrapperReducer;