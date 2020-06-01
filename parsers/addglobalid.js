const fs = require('fs')
const rp = require('request-promise');
const cheerio = require('cheerio');
const path = require('path');

newlist = []

fs.readFile('../src/items.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }

    var itemsData = JSON.parse(jsonString)


    fs.readFile('../src/seasons.json', 'utf8', (err, jsonString2) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }

        var roomsData = JSON.parse(jsonString2)


        for (let season of roomsData) {



            if (season.items.misc !== undefined) {

                for (let item of season.items.misc) {
                    let currentName = item.name;
                    let foundID = getIDByName(currentName, itemsData);

                    item.globalID = foundID;
                }
            }



        }



        saveData('newSeasons', roomsData);



    });





});

function saveData(name, data) {
    fs.writeFile(`../jsons/${name}.json`, JSON.stringify(data), err => {
        if (err) {
            /* console.log('Error writing file', err) */
        } else {
            /* console.log('Successfully wrote file') */
        }
    })
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