import localStore from "../localStore";

const initialState = localStore.loadData();

const modeReducer = (state = initialState.modeReducer, action) => {
    switch (action.type) {
        case "SET_MODE":
            state = { mode: action.payload }

            break;

        default:
            break;
    }
    return state;
};

export default modeReducer;