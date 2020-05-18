import localStore from "../localStore";

const initialState = localStore.loadData();

const themeReducer = (state = initialState.themeReducer, action) => {
    switch (action.type) {
        case "SELECT_THEME":
                state = action.payload;

            break;

    }

    return state;
};

export default themeReducer;