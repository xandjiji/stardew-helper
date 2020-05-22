import localStore from "../localStore";

const initialState = localStore.loadData();

const itemReducer = (state = initialState.itemReducer, action) => {
    switch (action.type) {
        case "TOGGLE_ITEM":
            if (state[action.payload]) {
                delete state[action.payload];
                state = {
                    ...state
                }
            } else {
                state[action.payload] = true;
                state = {
                    ...state
                }
            }

            break;

        case "TOGGLE_ALL":
            if (!action.payload.allCompleted) {

                action.payload.idArray.forEach(element => {
                    state[element] = true;
                    state = {
                        ...state
                    }
                });

            } else {
                action.payload.idArray.forEach(element => {
                    delete state[element];
                    state = {
                        ...state
                    }
                });
            }

            break;

        case "RESET_ALL":

            state = {};

            break;

        case "UPDATE_ALL_ITEMS":

            state = action.payload;

            break;

        default:
            break;

    }

    return state;
};

export default itemReducer;