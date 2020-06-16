import localStore from "../localStore";

const initialState = localStore.loadData();

const modeReducer = (state = initialState.modeReducer, action) => {
    switch (action.type) {
        case "SET_MODE":
            state = {
                ...state,
                mode: action.payload
            }

            break;

        case "SET_BUNDLE_MODE":
            state = {
                ...state,
                bundleMode: action.payload
            }

            break;

        default:
            break;
    }
    return state;
};

export default modeReducer;