import localStore from "../localStore";

const initialState = localStore.loadData();

const itemModalReducer = (state = initialState.itemModalReducer, action) => {
    switch (action.type) {
        case "CLOSE_MODAL":
            state = {
                ...state,
                active: false
            }

            break;

        case "OPEN_MODAL":
            state = {
                active: true,
                itemId: action.payload
            }

            break;

        default:
            break;

    }

    return state;
};

export default itemModalReducer;