import localStore from "../localStore";

const initialState = localStore.loadData();

const dateReducer = (state = initialState.dateReducer, action) => {
    switch (action.type) {
        case "SET_CALENDAR":
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

export default dateReducer;