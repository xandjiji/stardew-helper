const fs = require('fs')
const rp = require('request-promise');
const cheerio = require('cheerio');
const path = require('path');

newlist = []

fs.readFile('../src/jsons/items.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }

    var itemsData = JSON.parse(jsonString)

    /* console.log(data); */
    
    fs.readFile('../src/jsons/tables.json', 'utf8', (err, jsonString2) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
    
        var tablesData = JSON.parse(jsonString2)
    

        for (const list of Object.keys(tablesData)) {

            let currentList = tablesData[list];
            
            let newList = cherryPickTable(currentList, itemsData);

            /* saveData(list, newList); */
        }
    
        
        
        
    
    });

    
    
    

});

function saveData(name, data) {
    fs.writeFile(`../src/jsons/tables/${name}.json`, JSON.stringify(data), err => {
        if (err) {
            /* console.log('Error writing file', err) */
        } else {
            /* console.log('Successfully wrote file') */
        }
    })
}

function cherryPickTable(pickedArray, fromArray) {
    
    let newArray = [];

    for(let i = 0; i < pickedArray.length; i++) {
        let pickedIndex = pickedArray[i];
        
        
        newArray.push(getByIndex(pickedIndex, fromArray));
    }
    

    return newArray;
}

function getByIndex(index, fromArray) {
    
    for(let i = 0; i < fromArray.length; i++) {
        if(fromArray[i].id == index) {
            
            return fromArray[i];
        }
    }
}