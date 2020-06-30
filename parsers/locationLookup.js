const fs = require('fs')

fs.readFile('../src/jsons/schedules.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }

    var schedulesData = JSON.parse(jsonString)


    fs.readFile('../src/jsons/schedule_dict.json', 'utf8', (err, jsonString2) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }

        var dictData = JSON.parse(jsonString2);

        for (let npc in schedulesData) {

            let schedulesList = schedulesData[npc].schedules;

            for (let scheduleItem of schedulesList) {




                for (let i = 0; i < scheduleItem.schedule.length; i++) {
                    let location = scheduleItem.schedule[i].location;

                    checkLocation(dictData, npc, location);




                }
            }

        }






        /* saveData('newDict', roomsData); */
    });





});

function saveData(name, data) {
    fs.writeFile(`../src/jsons/${name}.json`, JSON.stringify(data), err => {
        if (err) {
            /* console.log('Error writing file', err) */
        } else {
            /* console.log('Successfully wrote file') */
        }
    })
}

function checkLocation(dict, npc, location) {

    if (dict[npc][location] === undefined) {
        return console.log(`[${npc}] ${location}`);

    } else {
        return
    }
}

function cherryPickTable(pickedArray, fromArray) {

    let newArray = [];

    for (let i = 0; i < pickedArray.length; i++) {
        let pickedIndex = pickedArray[i];


        newArray.push(getByIndex(pickedIndex, fromArray));
    }


    return newArray;
}

function getByIndex(index, fromArray) {

    for (let i = 0; i < fromArray.length; i++) {
        if (fromArray[i].id == index) {

            return fromArray[i];
        }
    }
}

function getIDByName(name, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].name == name) {
            return array[i].id;
        }
    }

    return '@@@';
}