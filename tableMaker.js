const fs = require('fs')
const rp = require('request-promise');
const cheerio = require('cheerio');
const path = require('path');

newlist = []

fs.readFile('./jsons/_ANIMALPRODUCTS.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }

    var data = JSON.parse(jsonString)

    /* REMOVE */
    /* let pickList = [333,326,317,328,305,299,336,312,315,309,311,327,298,335,306,316,340,341,342,346];
    data = cherryPickTable(pickList, data); */
    /* REMOVE */

    data = data.sort(byName);

    let tableArray = [];
    for(let i = 0; i < data.length; i++) {
        tableArray.push(data[i].id);
    }
    console.log(JSON.stringify(tableArray));
    

});



function byName(a, b) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

function byID(a, b) {
    if (a.id < b.id) {
        return -1;
    }
    if (a.id > b.id) {
        return 1;
    }
    return 0;
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