import localStore from "../localStore";
import ReactGA from 'react-ga';

const initialState = localStore.loadData();

const modeReducer = (state = initialState.modeReducer, action) => {
    switch (action.type) {
        case "SET_MODE":
            state = {
                ...state,
                mode: action.payload
            }

            ReactGA.event({
                category: 'Mode Select',
                action: `${action.payload}`
            });

            break;

        case "SET_BUNDLE_MODE":
            state = {
                ...state,
                bundleMode: action.payload
            }

            ReactGA.event({
                category: 'Bundle Mode',
                action: `${action.payload}`
            });

            break;

        default:
            break;
    }
    return state;
};

export default modeReducer;