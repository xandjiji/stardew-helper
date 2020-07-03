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
        themeReducer: 0,
        itemReducer: {},
        modeReducer: {
            mode: 'bundle',
            bundleMode: 'bundle'
        },
        itemModalReducer: {
            active: false,
            itemId: 993
        },
        locationReducer: {
            currentMarriage: undefined,
            rain: false,
            community_restored: false,
            beach_bridge: false,
            bus_restored: false,
            abigail_6: false,
            alex_6: false,
            haley_6: false,
            leah_6: false,
            penny_6: false,
            sam_6: false,
            sebastian_6: false
        },
        dateReducer: {
            season: 'Spring',
            day: 1
        }
    }

    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {

            return defaultState;
        }

        return JSON.parse(serializedState);
        /* return defaultState; */
    } catch (err) {
        return defaultState;
    }
}

export default { saveData, loadData }