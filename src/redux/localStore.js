function saveData(state) {
    try {        
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
}

function loadData() {
    let defaultState = {
        itemReducer: {},
        wrapperReducer: {
            sortBy: "rooms"
        }
    }
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return defaultState;
        }

        return JSON.parse(serializedState);
    } catch (err) {
        return defaultState;
    }
}

export default { saveData, loadData }