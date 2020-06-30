import localStore from "../localStore";

const initialState = localStore.loadData();

const locationReducer = (state = initialState.locationReducer, action) => {
    switch (action.type) {
        case "TOGGLE_KEY":
            state = {
                ...state,
                [action.key]: action.value
            }
            break;

        default:
            break;

    }

    return state;
};

export default locationReducer;